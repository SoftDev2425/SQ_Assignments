import { Request, Response } from 'express';
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  updateTask,
  updateTaskStatus,
} from '../service/task.service';
import { NotFoundError } from '../utils/NotFoundErrorClass';
import { taskStatuses } from '../types/task_status.type';

const handleCreateTask = async (req: Request, res: Response) => {
  const { title, description, deadline, usersId, tasksListsId } = req.body;

  if (description.length > 1000) {
    return res
      .status(400)
      .json({ error: 'Description length must be less than 1000 characters' });
  }

  try {
    const task = await createTask({
      title,
      description,
      deadline,
      usersId,
      tasksListsId,
    });

    return res.status(201).json(task);
  } catch (e: unknown) {
    if (e instanceof Error) {
      return res.status(500).json({ error: e.message });
    }

    return res.status(500).json({ error: 'Internal server error' });
  }
};

const handleGetTaskById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const task = await getTaskById(id);

    return res.status(200).json(task);
  } catch (e) {
    if (e instanceof NotFoundError || (e as Error).name === 'NotFoundError') {
      return res.status(404).json({ error: (e as Error).message });
    }

    return res
      .status(500)
      .json({ error: (e as Error).message || 'Internal server error' });
  }
};

const handleGetAllTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await getAllTasks();

    return res.status(200).json(tasks);
  } catch (e: unknown) {
    if (e instanceof Error) {
      return res.status(500).json({ error: e.message });
    }

    return res.status(500).json({ error: 'Internal server error' });
  }
};

const handleUpdateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, deadline, status, tasksListId } = req.body;

  // check if status is valid
  if (status && !taskStatuses.includes(status)) {
    return res.status(400).json({
      error:
        'Invalid status value. Valid values are NOT_STARTED, IN_PROGRESS, COMPLETED, ARCHIVED',
    });
  }

  try {
    const task = await updateTask(id, {
      title,
      description,
      deadline,
      status,
      tasksListId,
    });

    return res.status(200).json(task);
  } catch (e: unknown) {
    if (e instanceof Error) {
      return res.status(500).json({ error: e.message });
    }

    return res.status(500).json({ error: 'Internal server error' });
  }
};

const handleDeleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await deleteTask(id);

    return res.status(204).json({ message: 'Task deleted' });
  } catch (e) {
    if (e instanceof NotFoundError || (e as Error).name === 'NotFoundError') {
      return res.status(404).json({ error: (e as Error).message });
    }

    return res
      .status(500)
      .json({ error: (e as Error).message || 'Internal server error' });
  }
};

const handleUpdateTaskStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  if (status && !taskStatuses.includes(status)) {
    return res.status(400).json({
      error:
        'Invalid status value. Valid values are NOT_STARTED, IN_PROGRESS, COMPLETED, ARCHIVED',
    });
  }

  try {
    const task = await updateTaskStatus(id, status);

    return res.status(200).json(task);
  } catch (e: unknown) {
    if (e instanceof NotFoundError || (e as Error).name === 'NotFoundError') {
      return res.status(404).json({ error: (e as Error).message });
    }

    return res.status(500).json({ error: 'Internal server error' });
  }
};

export default {
  handleGetTaskById,
  handleCreateTask,
  handleGetAllTasks,
  handleUpdateTask,
  handleDeleteTask,
  handleUpdateTaskStatus,
};
