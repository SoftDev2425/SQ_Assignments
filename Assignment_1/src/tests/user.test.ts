import supertest from "supertest";
import { app } from "../app";
import { prisma } from "../app";
import { createUser, getAllUsers, getUserById } from "../service/user.service";

//Unit test
describe("Get user by id", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should return a user when the id exists", async () => {
    const mockUser = { id: "1", name: "John Doe" };
    prisma.user.findUnique = jest.fn().mockResolvedValue(mockUser);

    const result = await getUserById("1");
    expect(result).toEqual(mockUser);
  });
});

describe("Get all users", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should return all users", async () => {
    const mockUsers = [
      { id: "1", name: "John Doe" },
      { id: "2", name: "Jane Doe" },
    ];
    prisma.user.findMany = jest.fn().mockResolvedValue(mockUsers);

    const result = await getAllUsers();
    expect(result).toEqual(mockUsers);
  });
});

describe("Create user", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should create a user", async () => {
    const mockUser = { id: "1", name: "John Doe" };
    prisma.user.create = jest.fn().mockResolvedValue(mockUser);

    const result = await createUser("John Doe", "password123");
    expect(result).toEqual(mockUser);
  });
});

//Integration test
describe("User", () => {
  test("should get all users", async () => {
    await supertest(app).get("/api/user").expect(200);
  });

  test("should get user by id", async () => {
    await supertest(app).get("/api/user/1").expect(200);
  });

  test("should create a user", async () => {
    await supertest(app)
      .post("/api/user")
      .send({ name: "John Doe", password: "password123" })
      .expect(201);
  });
});
