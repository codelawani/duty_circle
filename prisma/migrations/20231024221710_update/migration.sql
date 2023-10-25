/*
  Warnings:

  - Added the required column `sourceId` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sourceType` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "sourceId" TEXT NOT NULL,
ADD COLUMN     "sourceType" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Notification_userId_idx" ON "Notification"("userId");
