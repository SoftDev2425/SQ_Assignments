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
    const response = await supertest(app).get(`/api/users/${user.id}`);

    // Assert
    expect(response.status).toBe(200);
    expect(response.body).toEqual(userWithoutPass);
  });

  test("should create a user", async () => {
    // Arrange
    let user = {
      name: "John Doe",
      password: "pass",
    };

    // Act
    const response = await supertest(app).post("/api/users").send(user);

    // Assert
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      id: expect.any(String),
      name: user.name,
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });

  test("should get all users", async () => {
    // Arrange
    let users = [
      {
        id: "1",
        name: "John Doe",
        password: "pass",
      },
      {
        id: "2",
        name: "Jane Doe",
        password: "pass",
      },
    ];

    await prisma.users.createMany({
      data: users,
    });

    // Act
    const response = await supertest(app).get("/api/users");

    // Assert
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining(
        users.map((user) => {
          let { password, ...userWithoutPass } = user;
          return {
            ...userWithoutPass,
            id: expect.any(String),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
          };
        })
      )
    );
    expect(response.body).toHaveLength(users.length);
  });
});
