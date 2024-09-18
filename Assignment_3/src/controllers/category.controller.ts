import { Request, Response } from 'express';

const createCategory = async (req: Request, res: Response) => {
  res.status(201).send('Category created');
};

const getCategories = async (req: Request, res: Response) => {
  res.status(200).send('Categories');
};

const getCategoryById = async (req: Request, res: Response) => {
  res.status(200).send('Category');
};

const updateCategory = async (req: Request, res: Response) => {
  res.status(200).send('Category updated');
};

const deleteCategory = async (req: Request, res: Response) => {
  res.status(200).send('Category deleted');
};

export default {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
