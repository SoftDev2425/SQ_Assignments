import prisma from "../../prisma/client";

export const createTask = async (data: {
  title: string;
  description: string;
  deadline: Date;
  completed: boolean;
  usersId: string;
  tasksListsId?: string;
}) => {
  try {
    return await prisma.tasks.create({
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
  } catch (error) {
    console.error(error);
    throw new Error("Error creating task");
  }
};

export const getTaskById = async (id: string) => {
  try {
    return await prisma.tasks.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Error getting task with id " + id);
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
        tasksListId: data.tasksListId ? data.tasksListId : "",
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Error updating task with id " + id);
  }
};

export const deleteTask = async (id: string) => {
  try {
    return await prisma.tasks.delete({
      where: { id },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Error deleting task with id " + id);
  }
};
