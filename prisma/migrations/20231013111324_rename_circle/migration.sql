/*
  Warnings:

  - You are about to drop the `AccountabilityCircle` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_circleId_fkey";

-- DropForeignKey
ALTER TABLE "UserCircle" DROP CONSTRAINT "UserCircle_circleId_fkey";

-- DropTable
DROP TABLE "AccountabilityCircle";

-- CreateTable
CREATE TABLE "Circle" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Circle_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserCircle" ADD CONSTRAINT "UserCircle_circleId_fkey" FOREIGN KEY ("circleId") REFERENCES "Circle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_circleId_fkey" FOREIGN KEY ("circleId") REFERENCES "Circle"("id") ON DELETE SET NULL ON UPDATE CASCADE;
