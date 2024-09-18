import supertest from 'supertest'
import { app } from '../setup/setup'

test('should throw an error when trying to hit an endpoint that does not exist', async () => {
  // Act
  const response = await supertest(app).get('/invalid-endpoint')

  // Assert
  expect(response.status).toBe(404)
  expect(response.body).toEqual({ error: 'Route /invalid-endpoint not found' })
})
