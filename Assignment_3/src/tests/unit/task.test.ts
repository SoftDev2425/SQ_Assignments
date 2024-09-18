import prisma from '../../../prisma/client'
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  updateTask,
  updateTaskStatus,
} from '../../service/task.service'
import { NotFoundError } from '../../utils/NotFoundErrorClass'

describe('Task service', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should return a task when the id exists', async () => {
    // Arrange
    const mockTask = {
      id: '1',
      title: 'Test task',
      description: 'Test description',
      deadline: new Date('2021-09-01T00:00:00.000Z'),
      completed: false,
      usersId: '1',
      tasksListsId: '1',
    }

    prisma.tasks.findUnique = jest.fn().mockResolvedValue(mockTask)

    // Act
    const result = await getTaskById('1')

    // Assert
    expect(prisma.tasks.findUnique).toHaveBeenCalledTimes(1)
    expect(prisma.tasks.findUnique).toHaveBeenCalledWith({
      where: { id: '1' },
    })
    expect(result).toEqual(mockTask)
  })

  test('should throw an error when the id does not exist', async () => {
    // Arrange
    prisma.tasks.findUnique = jest.fn().mockResolvedValue(null)

    // Act
    let error
    try {
      await getTaskById('1')
    } catch (e) {
      error = e
    }

    // Assert
    expect(prisma.tasks.findUnique).toHaveBeenCalledTimes(1)
    expect(prisma.tasks.findUnique).toHaveBeenCalledWith({
      where: { id: '1' },
    })
    expect(error).toEqual(new Error('Error getting task with id 1'))
  })

  test('should return all tasks', async () => {
    // Arrange
    const mockTasks = [
      {
        id: '1',
        title: 'Test task',
        description: 'Test description',
        deadline: new Date('2021-09-01T00:00:00.000Z'),
        completed: false,
        usersId: '1',
        tasksListsId: '1',
      },
      {
        id: '2',
        title: 'Test task 2',
        description: 'Test description 2',
        deadline: new Date('2021-09-02T00:00:00.000Z'),
        completed: true,
        usersId: '2',
        tasksListsId: '2',
      },
    ]

    prisma.tasks.findMany = jest.fn().mockResolvedValue(mockTasks)

    // Act
    const result = await getAllTasks()

    // Assert
    expect(prisma.tasks.findMany).toHaveBeenCalledTimes(1)
    expect(prisma.tasks.findMany).toHaveBeenCalledWith()
    expect(result).toEqual(mockTasks)
  })

  test('should update a task with correct arguments', async () => {
    // Arrange
    const mockTaskData = {
      title: 'Test task',
      description: 'Test description',
      deadline: new Date('2021-09-01T00:00:00.000Z'),
      completed: false,
      tasksListId: '1',
    }

    prisma.tasks.update = jest.fn().mockResolvedValue(mockTaskData)
    // Act
    const result = await updateTask('1', mockTaskData)

    // Assert
    expect(prisma.tasks.update).toHaveBeenCalledTimes(1)
    expect(prisma.tasks.update).toHaveBeenCalledWith({
      where: { id: '1' },
      data: {
        title: 'Test task',
        description: 'Test description',
        deadline: new Date('2021-09-01T00:00:00.000Z'),
        completed: false,
        tasksLists: {
          connect: {
            id: '1',
          },
        },
      },
    })
    expect(result).toEqual(mockTaskData)
  })

  test('should throw an error when updating a task fails', async () => {
    // Arrange
    const mockTaskData = {
      title: 'Test task',
      description: 'Test description',
      deadline: new Date('2021-09-01T00:00:00.000Z'),
      completed: false,
      tasksListId: '1',
    }

    prisma.tasks.update = jest
      .fn()
      .mockRejectedValue(new Error('Error updating task with id 1'))

    // Act
    let error
    try {
      await updateTask('1', mockTaskData)
    } catch (e) {
      error = e
    }

    // Assert
    expect(prisma.tasks.update).toHaveBeenCalledTimes(1)
    expect(prisma.tasks.update).toHaveBeenCalledWith({
      where: { id: '1' },
      data: {
        title: 'Test task',
        description: 'Test description',
        deadline: new Date('2021-09-01T00:00:00.000Z'),
        completed: false,
        tasksLists: {
          connect: {
            id: '1',
          },
        },
      },
    })
    expect(error).toEqual(new Error('Error updating task with id 1'))
  })

  // TODO: FIX THIS
  test('should call prisma.task.create with correct arguments', async () => {
    // Arrange
    const mockTaskData = {
      title: 'Test task',
      description: 'Test description',
      deadline: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
      completed: false,
      usersId: '1',
      tasksListsId: '1',
    }

    prisma.users.findUnique = jest
      .fn()
      .mockResolvedValue({ id: '1', name: 'Test user' })
    prisma.tasks.create = jest.fn().mockResolvedValue(mockTaskData)

    // Act
    const result = await createTask(mockTaskData)

    // Assert
    expect(prisma.users.findUnique).toHaveBeenCalledTimes(1)
    expect(prisma.users.findUnique).toHaveBeenCalledWith({
      where: { id: '1' },
    })
    expect(prisma.tasks.create).toHaveBeenCalledTimes(1)
    expect(prisma.tasks.create).toHaveBeenCalledWith({
      data: {
        title: 'Test task',
        description: 'Test description',
        deadline: mockTaskData.deadline,
        completed: false,
        user: {
          connect: {
            id: '1',
          },
        },
        tasksLists: {
          connect: {
            id: '1',
          },
        },
      },
    })

    expect(result).toEqual(mockTaskData)
  })

  test('should update a task status to completed', async () => {
    // Arrange
    const mockTaskData = {
      id: '1',
      title: 'Test task',
      description: 'Test description',
      deadline: new Date('2021-09-01T00:00:00.000Z'),
      completed: true,
      usersId: '1',
      tasksListsId: '1',
    }

    prisma.tasks.update = jest.fn().mockResolvedValue(mockTaskData)

    // Act
    const result = await updateTaskStatus('1', true)

    // Assert
    expect(prisma.tasks.update).toHaveBeenCalledTimes(1)
    expect(prisma.tasks.update).toHaveBeenCalledWith({
      where: { id: '1' },
      data: {
        completed: true,
      },
    })
    expect(result).toEqual(mockTaskData)
  })

  test('should update a task status to not completed', async () => {
    // Arrange
    const mockTaskData = {
      id: '1',
      title: 'Test task',
      description: 'Test description',
      deadline: new Date('2021-09-01T00:00:00.000Z'),
      completed: false,
      usersId: '1',
      tasksListsId: '1',
    }

    prisma.tasks.update = jest.fn().mockResolvedValue(mockTaskData)

    // Act
    const result = await updateTaskStatus('1', false)

    // Assert
    expect(prisma.tasks.update).toHaveBeenCalledTimes(1)
    expect(prisma.tasks.update).toHaveBeenCalledWith({
      where: { id: '1' },
      data: {
        completed: false,
      },
    })
    expect(result).toEqual(mockTaskData)
  })

  test('should throw an error when trying to update a non-existent task', async () => {
    // Arrange
    prisma.tasks.update = jest
      .fn()
      .mockRejectedValue(new Error('Task not found'))

    // Act
    let error
    try {
      await updateTaskStatus('999', true)
    } catch (e) {
      error = e
    }

    // Assert
    expect(prisma.tasks.update).toHaveBeenCalledTimes(1)
    expect(prisma.tasks.update).toHaveBeenCalledWith({
      where: { id: '999' },
      data: {
        completed: true,
      },
    })
    expect(error).toEqual(new Error('Task not found'))
  })

  test('should create a task with optional tasksListsId', async () => {
    // Arrange
    const mockTaskData = {
      title: 'Test task',
      description: 'Test description',
      deadline: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
      completed: false,
      usersId: '1',
    }

    prisma.tasks.create = jest.fn().mockResolvedValue(mockTaskData)

    // Act
    const result = await createTask(mockTaskData)

    // Assert
    expect(prisma.tasks.create).toHaveBeenCalledWith({
      data: {
        title: 'Test task',
        description: 'Test description',
        deadline: mockTaskData.deadline,
        completed: false,
        user: {
          connect: {
            id: '1',
          },
        },
      },
    })
    expect(result).toEqual(mockTaskData)
  })

  test('should throw an error when creating a task with a past deadline', async () => {
    // Arrange
    const mockTaskData = {
      title: 'Test task',
      description: 'Test description',
      deadline: new Date('2020-09-01T00:00:00.000Z'),
      completed: false,
      usersId: '1',
    }

    // Act
    let error
    try {
      await createTask(mockTaskData)
    } catch (e) {
      error = e
    }

    // Assert
    expect(error).toEqual(
      new Error('Please provide a future deadline for the task'),
    )
  })

  test('should throw error when creating without a title', async () => {
    // Arrange
    const mockTaskData = {
      title: '',
      description: 'Test description',
      deadline: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
      completed: false,
      usersId: '1',
    }

    // Act
    let error
    try {
      await createTask(mockTaskData)
    } catch (e) {
      error = e
    }

    // Assert
    expect(error).toEqual(new Error('Please provide a title for the task'))
  })

  test('should throw an error if user does not exist', async () => {
    prisma.users.findUnique = jest.fn().mockResolvedValue(null)

    // Arrange
    const mockTaskData = {
      title: 'Test task',
      description: 'Test description',
      deadline: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
      completed: false,
      usersId: '999',
    }

    // Act
    let error
    try {
      await createTask(mockTaskData)
    } catch (e) {
      error = e
    }

    // Assert
    expect(error).toEqual(new Error('User not found'))
  })

  test('should delete a task if it exists', async () => {
    // Arrange
    prisma.tasks.findFirst = jest.fn().mockResolvedValue({ id: '1' })
    prisma.tasks.delete = jest.fn().mockResolvedValue({ id: '1' })

    // Act
    const result = await deleteTask('1')

    // Assert
    expect(prisma.tasks.delete).toHaveBeenCalledTimes(1)
    expect(prisma.tasks.delete).toHaveBeenCalledWith({
      where: { id: '1' },
    })
    expect(result).toEqual({ id: '1' })
  })

  test('should throw an error when deleting a task that does not exist', async () => {
    // Arrange
    prisma.tasks.findFirst = jest.fn().mockResolvedValue(null)
    prisma.tasks.delete = jest
      .fn()
      .mockRejectedValue(new Error('Task not found'))

    // Act
    let error
    try {
      await deleteTask('999')
    } catch (e) {
      error = e
    }

    // Assert
    expect(error).toEqual(new NotFoundError('Task not found'))
  })
})
