import supertest from 'supertest';
import { app } from '../setup/setup';
import { createTestTask, createTestUser } from '../../utils/helperMethods';
import { ITask } from '../../types/task.type';

describe('Task', () => {
  test('should get a task by id', async () => {
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

  test('should create a task', async () => {
    // Arrange
    const testUser = await createTestUser();

    const task = {
      title: 'Test Task',
      description: 'Test Task Description',
      deadline: new Date(),
      completed: false,
      usersId: testUser.id,
    };

    // Act
    const response = await supertest(app).post('/api/tasks').send(task);

    const normalizedResponseBody = {
      title: response.body.title,
      description: response.body.description,
      deadline: new Date(response.body.deadline),
      completed: response.body.completed,
      usersId: response.body.userId,
    };

    // Assert
    expect(response.status).toBe(201);
    expect(normalizedResponseBody).toEqual(task);
  });

  test('should update a task', async () => {
    // Arrange
    const testUser = await createTestUser();
    const testTask = await createTestTask(testUser.id);

    const updatedTask = {
      title: 'Updated Task',
      description: 'Updated Task Description From Test',
      deadline: new Date(),
      completed: true,
    };

    // Act
    const response = await supertest(app)
      .put(`/api/tasks/${testTask.id}`)
      .send(updatedTask);

    const normalizedResponseBody = {
      title: response.body.title,
      description: response.body.description,
      deadline: new Date(response.body.deadline),
      completed: response.body.completed,
    };

    // Assert
    expect(response.status).toBe(200);
    expect(normalizedResponseBody).toEqual(updatedTask);
  });

  test('should delete a task', async () => {
    // Arrange
    const testUser = await createTestUser();
    const testTask = await createTestTask(testUser.id);

    // Act
    const response = await supertest(app).delete(`/api/tasks/${testTask.id}`);

    // Assert
    expect(response.status).toBe(204);
  });

  test('should throw error when task does not exist', async () => {
    // Act
    const response = await supertest(app).get('/api/tasks/1');

    console.log(response.body);

    // Assert
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: `Error getting task with id 1` });
  });

  test('should throw an error when trying to delete a task that does not exist', async () => {
    // Act
    const response = await supertest(app).delete('/api/tasks/1');

    // Assert
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: `Task not found` });
  });

  test('should return all tasks', async () => {
    // Arrange
    const testUser = await createTestUser();
    const testTask = await createTestTask(testUser.id);

    // Act
    const response = await supertest(app).get('/api/tasks');

    const normalizedResponseBody = response.body.map((task: ITask) => ({
      ...task,
      createdAt: new Date(task.createdAt),
      updatedAt: new Date(task.updatedAt),
      deadline: new Date(task.deadline),
    }));

    // Assert
    expect(response.status).toBe(200);
    expect(normalizedResponseBody).toEqual([testTask]);
  });

  test('should throw error if title is missing', async () => {
    // Arrange
    const testUser = await createTestUser();

    const task = {
      description: 'Test Task Description',
      deadline: new Date(),
      completed: false,
      usersId: testUser.id,
    };

    // Act
    const response = await supertest(app).post('/api/tasks').send(task);

    // Assert
    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      error: 'Please provide a title for the task',
    });
  });

  test('should handle update task status', async () => {
    // Arrange
    const testUser = await createTestUser();
    const testTask = await createTestTask(testUser.id);

    // Act
    const response = await supertest(app)
      .put(`/api/tasks/${testTask.id}/status`)
      .send({ completed: true });

    // Assert
    expect(response.status).toBe(200);
    expect(response.body.completed).toBe(true);
  });
});
