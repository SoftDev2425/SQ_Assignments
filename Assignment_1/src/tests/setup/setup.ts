import prisma from "../../../prisma/client";
import createServer from "../../utils/server";

export let app: any;

global.beforeAll(async () => {
  app = await createServer();
});

global.beforeEach(async () => {
  // clear database from all tables
  await prisma.$transaction([prisma.tasks.deleteMany(), prisma.users.deleteMany(), prisma.tasksLists.deleteMany()]);
});

global.afterAll(async () => {});
