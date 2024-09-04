import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import UserRouter from "./routes/user.route";
import TaskRouter from "./routes/task.route";

export const prisma = new PrismaClient();

const app = express();
const port = 8080;

async function main() {
  app.use(express.json());

  // Register API routes
  app.use("/api/user", UserRouter);
  app.use("/api/task", TaskRouter);

  // Catch unregistered routes
  app.all("*", (req: Request, res: Response) => {
    res.status(404).json({ error: `Route ${req.originalUrl} not found` });
  });

  app.listen(port, () => {
    console.log(`Server is listening on port http://localhost:${port}`);
  });
}

main()
  .then(async () => {
    await prisma.$connect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
