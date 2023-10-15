/*
  Warnings:

  - Added the required column `adminId` to the `Circle` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Circle" ADD COLUMN     "adminId" TEXT NOT NULL;
