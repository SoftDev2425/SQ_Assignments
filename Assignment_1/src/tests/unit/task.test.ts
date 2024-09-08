import prisma from "../../../prisma/client";
import { createTask, getAllTasks, getTaskById, updateTask } from "../../service/task.service";

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

  test("should return all tasks", async () => {
    // Arrange
    const mockTasks = [
      {
        id: "1",
        title: "Test task",
        description: "Test description",
        deadline: new Date("2021-09-01T00:00:00.000Z"),
        completed: false,
        usersId: "1",
        tasksListsId: "1",
      },
      {
        id: "2",
        title: "Test task 2",
        description: "Test description 2",
        deadline: new Date("2021-09-02T00:00:00.000Z"),
        completed: true,
        usersId: "2",
        tasksListsId: "2",
      },
    ];

    prisma.tasks.findMany = jest.fn().mockResolvedValue(mockTasks);

    // Act
    const result = await getAllTasks();

    // Assert
    expect(prisma.tasks.findMany).toHaveBeenCalledTimes(1);
    expect(prisma.tasks.findMany).toHaveBeenCalledWith();
    expect(result).toEqual(mockTasks);
  });

  test("should update a task with correct arguments", async () => {
    // Arrange
    const mockTaskData = {
      title: "Test task",
      description: "Test description",
      deadline: new Date("2021-09-01T00:00:00.000Z"),
      completed: false,
      tasksListId: "1",
    };

    prisma.tasks.update = jest.fn().mockResolvedValue(mockTaskData);

    // Act
    const result = await updateTask("1", mockTaskData);

    // Assert
    expect(prisma.tasks.update).toHaveBeenCalledTimes(1);
    expect(prisma.tasks.update).toHaveBeenCalledWith({
      where: { id: "1" },
      data: {
        title: "Test task",
        description: "Test description",
        deadline: new Date("2021-09-01T00:00:00.000Z"),
        completed: false,
        tasksListId: "1",
      },
    });
    expect(result).toEqual(mockTaskData);
  });

  test("should throw an error when updating a task fails", async () => {
    // Arrange
    const mockTaskData = {
      title: "Test task",
      description: "Test description",
      deadline: new Date("2021-09-01T00:00:00.000Z"),
      completed: false,
      tasksListId: "1",
    };

    prisma.tasks.update = jest.fn().mockRejectedValue(new Error("Error updating task with id 1"));

    // Act
    let error;
    try {
      await updateTask("1", mockTaskData);
    } catch (e) {
      error = e;
    }

    // Assert
    expect(prisma.tasks.update).toHaveBeenCalledTimes(1);
    expect(prisma.tasks.update).toHaveBeenCalledWith({
      where: { id: "1" },
      data: {
        title: "Test task",
        description: "Test description",
        deadline: new Date("2021-09-01T00:00:00.000Z"),
        completed: false,
        tasksListId: "1",
      },
    });
    expect(error).toEqual(new Error("Error updating task with id 1"));
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
