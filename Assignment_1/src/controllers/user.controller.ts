import { Request, Response } from "express";
import { createUser, getAllUsers, getUserById } from "../service/user.service";

const getUserByIdEP = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log("Fetching user with ID:", id);

    const user = await getUserById(id);

    if (!user) {
      console.log("User not found");
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (e: any) {
    console.error("Error in getUserById endpoint", e.message);
    res.status(500).json({ error: e.message || "Internal server error" });
  }
};

const createUserEP = async (req: Request, res: Response) => {
  const { name, password } = req.body;

  if (!name || !password) {
    res.status(400).json({ error: "Name and password are required" });
  }

  try {
    const user = await createUser(name, password);

    if (!user) {
      return res.status(400).json({ error: "Failed to create user" });
    }

    res.status(201).json(user);
  } catch (e: any) {
    res.status(500).json({ error: e.message || "Internal server error" });
  }
};

const getAllUsersEP = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (e: any) {
    res.status(500).json({ error: e.message || "Internal server error" });
  }
};

export default {
  getUserByIdEP,
  createUserEP,
  getAllUsersEP,
};
