import supertest from "supertest";
import prisma from "../../../prisma/client";
import { app } from "../setup/setup";
import { createTestTask, createTestUser } from "../../utils/helperMethods";

describe("Task", () => {
  test("should get a task by id", async () => {
    // Arrange
    const testUser = await createTestUser();
    const testTask = await createTestTask(testUser.id);

    // Act
    const response = await supertest(app).get(`/api/tasks/${testTask.id}`);

    const normalizedResponseBody = {
      ...response.body,
      createdAt: new Date(response.body.createdAt),
      updatedAt: new Date(response.body.updatedAt),
      deadline: new Date(response.body.deadline),
    };

    // Assert
    expect(response.status).toBe(200);
    expect(normalizedResponseBody).toEqual(testTask);
  });
});
