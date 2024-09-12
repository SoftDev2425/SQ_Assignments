import { createTask } from "../../service/task.service";

describe("Specification-based testing for Task Service", () => {
  test("should not create a task without a title", async () => {
    // Arrange
    const taskData = {
      title: "",
      description: "Test description",
      deadline: new Date("2021-09-01T00:00:00.000Z"),
      completed: false,
      usersId: "1",
    };

    // Act and Assert
    await expect(createTask(taskData)).rejects.toThrow("Please provide a title for the task");
  });

  test("should not create a task with a past deadline", async () => {
    // Arrange
    const taskData = {
      title: "Test task",
      description: "Test description",
      deadline: new Date("2020-09-01T00:00:00.000Z"),
      completed: false,
      usersId: "1",
    };

    // Act and Assert - ofc the message is not the best, but it's just an example
    await expect(createTask(taskData)).rejects.toThrow("Please provide a future deadline for the task");
  });
});
