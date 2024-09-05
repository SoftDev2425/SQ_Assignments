import { prisma } from "../app";

export const getAllUsers = async () => {
  return await prisma.user.findMany();
};
