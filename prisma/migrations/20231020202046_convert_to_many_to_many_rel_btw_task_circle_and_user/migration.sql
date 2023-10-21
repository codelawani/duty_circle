/*
  Warnings:

  - The values [TASK_ASSIGNED] on the enum `NotificationType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `status` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `circleId` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `privacy` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Task` table. All the data in the column will be lost.
  - Made the column `message` on table `Nudge` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "InviteStatus" AS ENUM ('PENDING', 'ACCEPTED', 'DECLINED');

-- AlterEnum
BEGIN;
CREATE TYPE "NotificationType_new" AS ENUM ('TASK_DEADLINE', 'NEW_NUDGE', 'CIRCLE_INVITE', 'FRIEND_REQUEST');
ALTER TABLE "Notification" ALTER COLUMN "type" TYPE "NotificationType_new" USING ("type"::text::"NotificationType_new");
ALTER TYPE "NotificationType" RENAME TO "NotificationType_old";
ALTER TYPE "NotificationType_new" RENAME TO "NotificationType";
DROP TYPE "NotificationType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_circleId_fkey";

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "status",
ADD COLUMN     "seen" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Nudge" ALTER COLUMN "message" SET NOT NULL,
ALTER COLUMN "message" SET DEFAULT 'You can do it ✔';

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "circleId",
DROP COLUMN "privacy",
DROP COLUMN "status",
ADD COLUMN     "completed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "nudgeCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "public" BOOLEAN NOT NULL DEFAULT false;

-- DropEnum
DROP TYPE "NotificationStatus";

-- DropEnum
DROP TYPE "TaskPrivacy";

-- DropEnum
DROP TYPE "TaskStatus";

-- CreateTable
CREATE TABLE "CircleInvite" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "senderId" TEXT NOT NULL,
    "recipientId" TEXT NOT NULL,
    "circleId" TEXT NOT NULL,
    "status" "InviteStatus" NOT NULL,

    CONSTRAINT "CircleInvite_pkey" PRIMARY KEY ("id")
);

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
ALTER TABLE "CircleInvite" ADD CONSTRAINT "CircleInvite_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CircleInvite" ADD CONSTRAINT "CircleInvite_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CircleInvite" ADD CONSTRAINT "CircleInvite_circleId_fkey" FOREIGN KEY ("circleId") REFERENCES "Circle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TaskToUserCircle" ADD CONSTRAINT "_TaskToUserCircle_A_fkey" FOREIGN KEY ("A") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TaskToUserCircle" ADD CONSTRAINT "_TaskToUserCircle_B_fkey" FOREIGN KEY ("B") REFERENCES "UserCircle"("id") ON DELETE CASCADE ON UPDATE CASCADE;
