import { Request, Response } from "express";
import { createTask, deleteTask, getAllTasks, getTaskById, updateTask } from "../service/task.service";

const handleCreateTask = async (req: Request, res: Response) => {
  const { title, description, deadline, completed, usersId, tasksListsId } = req.body;

  try {
    const task = await createTask({
      title,
      description,
      deadline,
      completed,
      usersId,
      tasksListsId,
    });

    return res.status(201).json(task);
  } catch (e: any) {
    return res.status(500).json({ error: e.message || "Internal server error" });
  }
};

const handleGetTaskById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const task = await getTaskById(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json(task);
  } catch (e: any) {
    return res.status(500).json({ error: e.message || "Internal server error" });
  }
};

const handleGetAllTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await getAllTasks();

    return res.status(200).json(tasks);
  } catch (e: any) {
    return res.status(500).json({ error: e.message || "Internal server error" });
  }
};

const handleUpdateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, deadline, completed, tasksListId } = req.body;

  try {
    const task = await updateTask(id, {
      title,
      description,
      deadline,
      completed,
      tasksListId,
    });

    return res.status(200).json(task);
  } catch (e: any) {
    return res.status(500).json({ error: e.message || "Internal server error" });
  }
};

const handleDeleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedTask = await deleteTask(id);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({ message: "Task deleted" });
  } catch (e: any) {
    return res.status(500).json({ error: e.message || "Internal server error" });
  }
};

export default {
  handleGetTaskById,
  handleCreateTask,
  handleGetAllTasks,
  handleUpdateTask,
  handleDeleteTask,
};
