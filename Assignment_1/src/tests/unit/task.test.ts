import prisma from "../../../prisma/client";
import { createTask, getTaskById } from "../../service/task.service";

describe("Task service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should return a task when the id exists", async () => {
    // Arrange
    const mockTask = {
      id: "1",
      title: "Test task",
      description: "Test description",
      deadline: new Date("2021-09-01T00:00:00.000Z"),
      completed: false,
      usersId: "1",
      tasksListsId: "1",
    };

    prisma.tasks.findUnique = jest.fn().mockResolvedValue(mockTask);

    // Act
    const result = await getTaskById("1");

    // Assert
    expect(prisma.tasks.findUnique).toHaveBeenCalledTimes(1);
    expect(prisma.tasks.findUnique).toHaveBeenCalledWith({
      where: { id: "1" },
    });
    expect(result).toEqual(mockTask);
  });

  test("should throw an error when the id does not exist", async () => {
    // Arrange
    prisma.tasks.findUnique = jest.fn().mockResolvedValue(null);

    // Act
    let error;
    try {
      await getTaskById("1");
    } catch (e) {
      error = e;
    }

    // Assert
    expect(prisma.tasks.findUnique).toHaveBeenCalledTimes(1);
    expect(prisma.tasks.findUnique).toHaveBeenCalledWith({
      where: { id: "1" },
    });
    expect(error).toEqual(new Error("Error getting task with id 1"));
  });

  test("should call prisma.task.create with correct arguments", async () => {
    // Arrange
    const mockTaskData = {
      title: "Test task",
      description: "Test description",
      deadline: new Date("2021-09-01T00:00:00.000Z"),
      completed: false,
      usersId: "1",
      tasksListsId: "1",
    };

    prisma.tasks.create = jest.fn().mockResolvedValue(mockTaskData);

    // Act
    const result = await createTask(mockTaskData);

    // Assert
    expect(prisma.tasks.create).toHaveBeenCalledTimes(1);
    expect(prisma.tasks.create).toHaveBeenCalledWith({
      data: {
        title: "Test task",
        description: "Test description",
        deadline: new Date("2021-09-01T00:00:00.000Z"),
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
