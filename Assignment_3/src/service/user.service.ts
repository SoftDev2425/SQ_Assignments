import prisma from '../../prisma/client';
import { NotFoundError } from '../utils/NotFoundErrorClass';

export const getUserById = async (id: string) => {
  try {
    const user = await prisma.users.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return user;
  } catch (error) {
    throw new Error(`Error fetching user by ID: ${error}`);
  }
};

export const getAllUsers = async () => {
  try {
    return await prisma.users.findMany({
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  } catch (error) {
    throw new Error(`Error fetching all users: ${error}`);
  }
};

export const createUser = async (name: string, password: string) => {
  try {
    return await prisma.users.create({
      data: {
        name,
        password,
      },
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  } catch (error) {
    throw new Error(`Error creating user: ${error}`);
  }
};
