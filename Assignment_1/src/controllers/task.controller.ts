import { Request, Response } from "express";
import { prisma } from "../app";

const getTaskById = async (req: Request, res: Response) => {};

const createTask = async (req: Request, res: Response) => {};

const getAllTasks = async (req: Request, res: Response) => {};

const updateTask = async (req: Request, res: Response) => {};

const deleteTask = async (req: Request, res: Response) => {};

export default {
  getTaskById,
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
};
