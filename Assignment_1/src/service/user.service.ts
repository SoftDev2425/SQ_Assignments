import prisma from "../../prisma/client";

export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findFirst({
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
      throw new Error("Failed to fetch user");
    }

    return user;
  } catch (error) {
    console.error("Error fetching user by ID", error);
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    return await prisma.user.findMany();
  } catch (error) {
    console.error("Error fetching all users", error);
    throw new Error("Failed to fetch users");
  }
};

export const createUser = async (name: string, password: string) => {
  try {
    return await prisma.user.create({
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
    console.error("Error creating user", error);
    throw new Error("Failed to create user");
  }
};