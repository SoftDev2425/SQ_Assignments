import { Request, Response } from "express";
import { prisma } from "../app";

const getTaskByIdEP = async (req: Request, res: Response) => {};

const createTaskEP = async (req: Request, res: Response) => {};

const getAllTasksEP = async (req: Request, res: Response) => {};

const updateTaskEP = async (req: Request, res: Response) => {};

const deleteTaskEP = async (req: Request, res: Response) => {};

export default {
  getTaskByIdEP,
  createTaskEP,
  getAllTasksEP,
  updateTaskEP,
  deleteTaskEP,
};
