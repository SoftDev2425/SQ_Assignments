import { Request, Response } from "express";
import { prisma } from "../server";

const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // don't select password
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.status(200).json(user);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const createUser = async (req: Request, res: Response) => {
  const { name, password } = req.body;

  if (!name || !password) {
    res.status(400).json({ error: "Name and password are required" });
  }

  try {
    const user = await prisma.user.create({
      data: {
        name,
        password,
      },
    });
    res.status(201).json(user);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default {
  getUserById,
  createUser,
  getAllUsers,
};
