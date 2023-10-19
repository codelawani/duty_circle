/*
  Warnings:

  - The values [CIRCLE] on the enum `TaskPrivacy` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `circleId` on the `Task` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TaskPrivacy_new" AS ENUM ('PRIVATE', 'PUBLIC');
ALTER TABLE "Task" ALTER COLUMN "privacy" DROP DEFAULT;
ALTER TABLE "Task" ALTER COLUMN "privacy" TYPE "TaskPrivacy_new" USING ("privacy"::text::"TaskPrivacy_new");
ALTER TYPE "TaskPrivacy" RENAME TO "TaskPrivacy_old";
ALTER TYPE "TaskPrivacy_new" RENAME TO "TaskPrivacy";
DROP TYPE "TaskPrivacy_old";
ALTER TABLE "Task" ALTER COLUMN "privacy" SET DEFAULT 'PRIVATE';
COMMIT;

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_circleId_fkey";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "circleId";

-- CreateTable
CREATE TABLE "_TaskToUserCircle" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TaskToUserCircle_AB_unique" ON "_TaskToUserCircle"("A", "B");

-- CreateIndex
CREATE INDEX "_TaskToUserCircle_B_index" ON "_TaskToUserCircle"("B");

-- AddForeignKey
ALTER TABLE "_TaskToUserCircle" ADD CONSTRAINT "_TaskToUserCircle_A_fkey" FOREIGN KEY ("A") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TaskToUserCircle" ADD CONSTRAINT "_TaskToUserCircle_B_fkey" FOREIGN KEY ("B") REFERENCES "UserCircle"("id") ON DELETE CASCADE ON UPDATE CASCADE;
