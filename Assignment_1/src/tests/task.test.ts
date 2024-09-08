import supertest from "supertest";
import { app } from "./setup/setup";
import { createTask } from "../service/task.service";
import prisma from "../../prisma/client";
// import createServer from "../utils/server";

describe("Task service - createTask", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should call prisma.task.create with correct arguments", async () => {

    const mockTaskData = {
      title: "Test task",
      description: "Test description",
      deadline: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
      completed: false,
      usersId: "1",
      tasksListsId: "1",
    };

    prisma.tasks.create = jest.fn().mockResolvedValue(mockTaskData);

    const result = await createTask(mockTaskData);

    expect(prisma.tasks.create).toHaveBeenCalledWith({
      data: {
        title: "Test task",
        description: "Test description",
        deadline: mockTaskData.deadline,
        completed: false,
        user: {
          connect: {
            id: "1",
          },
        },
        tasksLists: {
          connect: {
            id: "1",
          },
        },
      },
    });

    expect(result).toEqual(mockTaskData);
  });
});
