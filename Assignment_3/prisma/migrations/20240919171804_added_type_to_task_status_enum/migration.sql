/*
  Warnings:

  - You are about to drop the column `completed` on the `Tasks` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "TaskStatus" ADD VALUE 'ARCHIVED';

-- AlterTable
ALTER TABLE "Tasks" DROP COLUMN "completed";
