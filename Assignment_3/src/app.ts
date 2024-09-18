import createServer from './utils/server'
import prisma from '../prisma/client'

export const app = createServer()

const port = 8080

async function main() {
  app.listen(port, () => {
    console.log(`Server is listening on port http://localhost:${port}`)
  })
}

main()
  .then(async () => {
    await prisma.$connect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
