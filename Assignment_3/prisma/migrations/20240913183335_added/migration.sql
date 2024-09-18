/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Tasks` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `TasksLists` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE INDEX "Tasks_id_title_idx" ON "Tasks"("id", "title");

-- CreateIndex
CREATE UNIQUE INDEX "Tasks_title_key" ON "Tasks"("title");

-- CreateIndex
CREATE INDEX "TasksLists_id_name_idx" ON "TasksLists"("id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "TasksLists_name_key" ON "TasksLists"("name");

-- CreateIndex
CREATE INDEX "Users_id_name_idx" ON "Users"("id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Users_name_key" ON "Users"("name");
