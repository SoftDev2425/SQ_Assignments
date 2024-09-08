import supertest from "supertest";
import prisma from "../../../prisma/client";
import { app } from "../setup/setup";

describe("User", () => {
  test("should get a user by id", async () => {
    // Arrange
    let user = {
      id: "1",
      name: "John Doe",
      password: "pass",
      createdAt: "2021-09-01T00:00:00.000Z",
      updatedAt: "2021-09-01T00:00:00.000Z",
    };
    await prisma.users.create({ data: user });

    let { password, ...userWithoutPass } = user;

    // Act
    const response = await supertest(app).get(`/api/user/${user.id}`);

    // Assert
    expect(response.status).toBe(200);
    expect(response.body).toEqual(userWithoutPass);
  });
});
