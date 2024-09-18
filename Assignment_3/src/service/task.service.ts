import prisma from "../../prisma/client";
import { NotFoundError } from "../utils/NotFoundErrorClass";

export const createTask = async (data: {
  title: string;
  description: string;
  deadline: Date;
  completed: boolean;
  usersId: string;
  tasksListsId?: string;
}) => {
  try {
    const user = await prisma.users.findUnique({
      where: { id: data.usersId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    if (!data.title || data.title.length === 0) {
      throw new Error("Please provide a title for the task");
    }

    if (data.deadline < new Date()) {
      throw new Error("Please provide a future deadline for the task");
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
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getTaskById = async (id: string) => {
  try {
    const task = await prisma.tasks.findUnique({
      where: { id },
    });

    if (!task) {
      throw new NotFoundError("Error getting task with id " + id);
    }

    return task;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllTasks = async () => {
  try {
    return await prisma.tasks.findMany();
  } catch (error) {
    console.error(error);
    throw new Error("Error getting all tasks");
  }
};

export const updateTask = async (
  id: string,
  data: { title: string; description: string; deadline: Date; completed: boolean; tasksListId?: string }
) => {
  try {
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
  } catch (error) {
    console.error(error);
    throw new Error("Error updating task with id " + id);
  }
};

export const deleteTask = async (id: string) => {
  try {
    const task = await prisma.tasks.findFirst({
      where: { id },
    });

    if (!task) {
      throw new NotFoundError("Task not found");
    }

    await prisma.tasks.delete({
      where: { id },
    });

    return task;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateTaskStatus = async (id: string, completed: boolean) => {
  try {
    const task = await prisma.tasks.update({
      where: { id },
      data: {
        completed,
      },
    });

    if (!task) {
      throw new Error("Task not found");
    }

    return task;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
