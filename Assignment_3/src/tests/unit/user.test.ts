import {
  createUser,
  getAllUsers,
  getUserById,
} from '../../service/user.service'
import prisma from '../../../prisma/client'
import { NotFoundError } from '../../utils/NotFoundErrorClass'

describe('Get user by id', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should return a user when the id exists', async () => {
    // Arrange
    const mockUser = {
      id: '1',
      name: 'John Doe',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    prisma.users.findFirst = jest.fn().mockResolvedValue(mockUser)

    // Act
    const result = await getUserById('1')

    // Assert
    expect(prisma.users.findFirst).toHaveBeenCalledTimes(1)
    expect(prisma.users.findFirst).toHaveBeenCalledWith({
      where: { id: '1' },
      select: { id: true, name: true, createdAt: true, updatedAt: true },
    })
    expect(result).toEqual(mockUser)
  })

  test('should throw an error when the id does not exist', async () => {
    // Arrange
    prisma.users.findFirst = jest.fn().mockResolvedValue(null)

    // Act
    let error
    try {
      await getUserById('1')
    } catch (e) {
      error = e
    }

    // Assert
    expect(prisma.users.findFirst).toHaveBeenCalledTimes(1)
    expect(prisma.users.findFirst).toHaveBeenCalledWith({
      where: { id: '1' },
      select: { id: true, name: true, createdAt: true, updatedAt: true },
    })
    expect(error).toEqual(new NotFoundError('Error fetching user by ID: 1'))
  })
})

describe('Get all users', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should return all users', async () => {
    // Arrange
    const mockUsers = [
      {
        id: '1',
        name: 'John Doe',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        name: 'Jane Doe',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]
    prisma.users.findMany = jest.fn().mockResolvedValue(mockUsers)

    // Act
    const result = await getAllUsers()

    // Assert
    expect(prisma.users.findMany).toHaveBeenCalledTimes(1)
    expect(prisma.users.findMany).toHaveBeenCalledWith({
      select: { id: true, name: true, createdAt: true, updatedAt: true },
    })
    expect(result).toEqual(mockUsers)
  })
})

describe('Create user', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('should create a user', async () => {
    // Arrange
    const mockUser = { id: '1', name: 'John Doe' }
    prisma.users.create = jest.fn().mockResolvedValue(mockUser)

    // Act
    const result = await createUser('John Doe', 'password123')

    // Assert
    expect(prisma.users.create).toHaveBeenCalledTimes(1)
    expect(prisma.users.create).toHaveBeenCalledWith({
      data: { name: 'John Doe', password: 'password123' },
      select: { id: true, name: true, createdAt: true, updatedAt: true },
    })
    expect(result).toEqual(mockUser)
  })
})
