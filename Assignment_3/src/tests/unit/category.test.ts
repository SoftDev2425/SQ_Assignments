import prisma from '../../../prisma/client'
import {
  createCategory,
  getCategories,
  deleteCategory,
} from '../../service/category.service'
// import createServer from "../utils/server";

// const app = createServer();

const mockUser = { id: '1', name: 'John Doe' }
const mockCategories = [
  { id: '1', name: 'School', userId: mockUser.id },
  { id: '2', name: 'Work', userId: mockUser.id },
  { id: '3', name: 'Home', userId: mockUser.id },
]

// Mock Prisma Client
beforeEach(() => {
  jest.clearAllMocks() // Clear previous mock data

  // Mock methods with predefined responses
  prisma.users.findUnique = jest.fn().mockResolvedValue(mockUser)
  prisma.tasksLists.findMany = jest.fn().mockResolvedValue(mockCategories)
  prisma.tasksLists.create = jest.fn().mockResolvedValue(mockCategories[0])
  prisma.tasksLists.delete = jest.fn().mockImplementation(data => {
    return mockCategories.find(category => category.id === data.where.id)
  })
})

describe('Create category', () => {
  it('should create a category', async () => {
    const result = await createCategory('School', mockUser.id)

    // Check if createTaskList returns the expected task list
    expect(result).toHaveProperty('userId', mockUser.id)
    expect(result).toHaveProperty('name', 'School')
  })
})

describe('Get all categories for user', () => {
  it("should return the user's categories", async () => {
    const result = await getCategories(mockUser.id)

    expect(result).toEqual(mockCategories)
  })
})

describe('Delete category', () => {
  it('should delete a categoryt', async () => {
    prisma.tasksLists.findMany = jest
      .fn()
      .mockResolvedValue([mockCategories[2]])

    // Ensure the category exists before deletion
    const categoryBeforeDelete = await getCategories(mockUser.id)
    expect(categoryBeforeDelete).toEqual([mockCategories[2]])

    // Delete the category
    await deleteCategory(mockCategories[2].id)

    prisma.tasksLists.findMany = jest
      .fn()
      .mockResolvedValue(
        mockCategories.filter(c => c.id !== mockCategories[2].id),
      )

    // Check that the category no longer exists after deletion
    const categoriesAfterDelete = await getCategories(mockUser.id)
    expect(categoriesAfterDelete).not.toContainEqual(mockCategories[2])
  })
})
