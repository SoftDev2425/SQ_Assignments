import supertest from "supertest";
import { getUserById } from "../../service/user.service";
import { app } from "../setup/setup";
import prisma from "../../../prisma/client";
// import createServer from "../utils/server";

describe("Get user by id", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should return a user when the id exists", async () => {
    // Arrange
    const mockUser = { id: "1", name: "John Doe", createdAt: new Date(), updatedAt: new Date() };
    prisma.users.findFirst = jest.fn().mockResolvedValue(mockUser);

    // Act
    const result = await getUserById("1");

    // Assert
    expect(prisma.users.findFirst).toHaveBeenCalledTimes(1);
    expect(prisma.users.findFirst).toHaveBeenCalledWith({
      where: { id: "1" },
      select: { id: true, name: true, createdAt: true, updatedAt: true },
    });
    expect(result).toEqual(mockUser);
  });

  test("should throw an error when the id does not exist", async () => {
    // Arrange
    prisma.users.findFirst = jest.fn().mockResolvedValue(null);

    // Act
    let error;
    try {
      await getUserById("1");
    } catch (e) {
      error = e;
    }

    // Assert
    expect(prisma.users.findFirst).toHaveBeenCalledTimes(1);
    expect(prisma.users.findFirst).toHaveBeenCalledWith({
      where: { id: "1" },
      select: { id: true, name: true, createdAt: true, updatedAt: true },
    });
    expect(error).toEqual(new Error("Failed to fetch user"));
  });
});

