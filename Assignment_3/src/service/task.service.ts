import prisma from '../../prisma/client';
import { NotFoundError } from '../utils/NotFoundErrorClass';

export const createTask = async (data: {
  title: string;
  description: string;
  deadline: Date;
  completed: boolean;
  usersId: string;
  tasksListsId?: string;
}) => {
  const user = await prisma.users.findUnique({
    where: { id: data.usersId },
  });

  if (!user) {
    throw new NotFoundError('User not found');
  }

  if (!data.title || data.title.length === 0) {
    throw new Error('Please provide a title for the task');
  }

  if (data.title.length > 24) {
    throw new Error('Please provide a titel with less than 24 characters');
  }

  if (data.deadline < new Date()) {
    throw new Error('Please provide a future deadline for the task');
  }

  const newTask = await prisma.tasks.create({
    data: {
      title: data.title,
      description: data.description,
      deadline: data.deadline,
      completed: data.completed,
      user: {
        connect: {
          id: data.usersId,
        },
      },
      ...(data.tasksListsId && {
        tasksLists: {
          connect: {
            id: data.tasksListsId,
          },
        },
      }), // Conditionally include tasksList if tasksListId exists
    },
  });

  return newTask;
};

export const getTaskById = async (id: string) => {
  const task = await prisma.tasks.findUnique({
    where: { id },
  });

  if (!task) {
    throw new NotFoundError('Error getting task with id ' + id);
  }

  return task;
};

export const getAllTasks = async () => {
  try {
    return await prisma.tasks.findMany();
  } catch (error) {
    throw new Error(`Error getting all tasks ${error}`);
  }
};

export const updateTask = async (
  id: string,
  data: {
    title: string;
    description: string;
    deadline: Date;
    completed: boolean;
    tasksListId?: string;
  },
) => {
  return await prisma.tasks.update({
    where: { id },
    data: {
      title: data.title,
      description: data.description,
      deadline: data.deadline,
      completed: data.completed,
      ...(data.tasksListId && {
        tasksLists: {
          connect: {
            id: data.tasksListId,
          },
        },
      }), // Conditionally include tasksList if tasksListId exists
    },
  });
};

export const deleteTask = async (id: string) => {
  const task = await prisma.tasks.findFirst({
    where: { id },
  });

  if (!task) {
    throw new NotFoundError('Task not found');
  }

  await prisma.tasks.delete({
    where: { id },
  });

  return task;
};

export const updateTaskStatus = async (id: string, completed: boolean) => {
  const task = await prisma.tasks.update({
    where: { id },
    data: {
      completed,
    },
  });

  if (!task) {
    throw new NotFoundError('Task not found');
  }

  return task;
};
