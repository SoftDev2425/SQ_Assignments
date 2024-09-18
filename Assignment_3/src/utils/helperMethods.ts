import prisma from '../../prisma/client'

export const createTestUser = async () => {
  try {
    return await prisma.users.create({
      data: {
        name: 'John Doe',
        password: 'pass',
      },
    })
  } catch (error) {
    console.error(error)
    throw new Error('Error creating test user')
  }
}

export const createTestTask = async (userId: string) => {
  try {
    return await prisma.tasks.create({
      data: {
        title: 'Test task',
        description: 'Test description',
        deadline: new Date('2021-09-01T00:00:00.000Z'),
        completed: false,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    })
  } catch (error) {
    console.error(error)
    throw new Error('Error creating test task')
  }
}
