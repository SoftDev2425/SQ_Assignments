import prisma from '../../prisma/client';

export const createCategory = async (name: string, userId: string) => {
  try {
    return await prisma.tasksLists.create({
      data: {
        name,
        userId,
      },
    });
  } catch (error) {
    throw new Error(`Failed to create category ${error}`);
  }
};

export const getCategories = async (userId: string) => {
  try {
    return await prisma.tasksLists.findMany({
      where: { userId },
    });
  } catch (error) {
    throw new Error(`Failed to fetch categories ${error}`);
  }
};

export const deleteCategory = async (id: string) => {
  try {
    return await prisma.tasksLists.delete({
      where: { id },
    });
  } catch (error) {
    throw new Error(`Failed to delete category ${error}`);
  }
};
