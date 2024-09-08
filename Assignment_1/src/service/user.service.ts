import { prisma } from "../app";

export const getUserById = async (id: string) => {
  try {
    // don't select password
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return user;
  } catch (error) {
    console.error("Error fetching user by ID", error);
    throw new Error("Failed to fetch user");
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
    });
  } catch (error) {
    console.error("Error creating user", error);
    throw new Error("Failed to create user");
  }
};