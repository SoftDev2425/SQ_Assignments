import supertest from "supertest";
import { app } from "../app";
import { prisma } from "../app";
import { getUserById } from "../service/user.service";
// import createServer from "../utils/server";

// const app = createServer();

describe("Get user by id", () => {
  it("should return a user when the id exists", async () => {
    const mockUser = { id: "1", name: "John Doe" };
    prisma.user.findUnique = jest.fn().mockResolvedValue(mockUser);

    const result = await getUserById("1");
    expect(result).toEqual(mockUser);
  });
});

describe("User", () => {
  test("should get all users", async () => {
    // Arrange, Act, Assert
    await supertest(app).get("/api/user").expect(200);
  });

  // test("should get user by id", async () => {
  //   // test implementation
  // });

  // test("should create a user", async () => {
  //   // test implementation
  // });
});
