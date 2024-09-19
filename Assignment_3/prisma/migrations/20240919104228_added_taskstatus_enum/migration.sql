-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('NOT_STARTED', 'IN_PROGRESS', 'COMPLETED');

-- AlterTable
ALTER TABLE "Tasks" ADD COLUMN     "status" "TaskStatus" NOT NULL DEFAULT 'NOT_STARTED';
