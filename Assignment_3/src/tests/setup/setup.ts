import prisma from '../../../prisma/client';
import createServer from '../../utils/server';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export let app: any;

global.beforeAll(async () => {
  app = await createServer();
});

global.beforeEach(async () => {
  // clear database from all tables
  await prisma.$transaction([
    prisma.tasks.deleteMany(),
    prisma.users.deleteMany(),
    prisma.tasksLists.deleteMany(),
  ]);
});

global.afterAll(async () => {});
