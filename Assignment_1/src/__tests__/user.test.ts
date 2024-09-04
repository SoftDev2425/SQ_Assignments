import supertest from "supertest";
import { app } from "../server";

describe("User", () => {
  test("should get all users", async () => {
    /*What are you testing?
    Testing getting all users
    What should it do?
    What is the actual output?
    What is the expected output?
    How can the test be reproduced?
    
    */
    // Arrange
    // Act
    // Assert

    await supertest(app).get("/api/user").expect(200);
  });

  // test("should get user by id", async () => {
  //   // test implementation
  // });

  // test("should create a user", async () => {
  //   // test implementation
  // });
});
