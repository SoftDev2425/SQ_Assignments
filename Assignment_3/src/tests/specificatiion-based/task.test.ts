import { title } from 'process';
import { createTask } from '../../service/task.service';
import { createTestUser } from '../../utils/helperMethods';
import prisma from '../../../prisma/client';

describe('Specification-based testing for Task Service', () => {
  test('should not create a task without a title', async () => {
    const user = await createTestUser();

    // Arrange
    const taskData = {
      title: '',
      description: 'Test description',
      deadline: new Date('2021-09-01T00:00:00.000Z'),
      completed: false,
      usersId: user.id,
    };

    // Act and Assert
    await expect(createTask(taskData)).rejects.toThrow(
      'Please provide a title for the task',
    );
  });

  test('should not create a task with a past deadline', async () => {
    const user = await createTestUser();

    // Arrange
    const taskData = {
      title: 'Test task',
      description: 'Test description',
      deadline: new Date('2020-09-01T00:00:00.000Z'),
      completed: false,
      usersId: user.id,
    };

    // Act and Assert - ofc the message is not the best, but it's just an example
    await expect(createTask(taskData)).rejects.toThrow(
      'Please provide a future deadline for the task',
    );
  });
});
describe('Task Title Boundary Tests', () => {
  test('should create task with exactly 1 character in the title', async () => {
    const user = await createTestUser();

    const mockTaskData = {
      title: 'a',
      description: 'Test description',
      deadline: new Date('2029-09-01T00:00:00.000Z'),
      completed: false,
      usersId: user.id,
    };

    prisma.users.findUnique = jest.fn().mockResolvedValue({ id: '1' });
    prisma.tasks.create = jest.fn().mockResolvedValue(mockTaskData);

    const result = await createTask(mockTaskData);

    expect(result.title).toBe('a');
  });
  test('should create task with exactly 24 characters in the title', async () => {
    const user = await createTestUser();

    const mockTaskData = {
      title: 'a'.repeat(24),
      description: 'Test description',
      deadline: new Date('2029-09-01T00:00:00.000Z'),
      completed: false,
      usersId: user.id,
    };

    prisma.users.findUnique = jest.fn().mockResolvedValue({ id: '1' });
    prisma.tasks.create = jest.fn().mockResolvedValue(mockTaskData);

    const result = await createTask(mockTaskData);

    expect(result.title).toBe('a'.repeat(24));
  });
  test('should not create task with more than 24 characters in the title', async () => {
    const user = await createTestUser();

    const mockTaskData = {
      title: 'a'.repeat(25),
      description: 'Test description',
      deadline: new Date('2029-09-01T00:00:00.000Z'),
      completed: false,
      usersId: user.id,
    };

    let error;
    try {
      await createTask(mockTaskData);
    } catch (e) {
      error = e;
    }

    expect(error).toEqual(
      new Error('Please provide a titel with less than 24 characters'),
    );
  });
});
