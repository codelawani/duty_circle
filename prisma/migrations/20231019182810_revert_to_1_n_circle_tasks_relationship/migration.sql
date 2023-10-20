/*
  Warnings:

  - The values [CIRCLE] on the enum `TaskPrivacy` will be removed. If these variants are still used in the database, this will fail.

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
