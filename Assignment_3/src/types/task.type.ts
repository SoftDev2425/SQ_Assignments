export type ITask = {
  id: string;
  title: string;
  description: string;
  deadline: Date;
  completed: boolean;
  tasksListId: string;
  createdAt: Date;
  updatedAt: Date;
};