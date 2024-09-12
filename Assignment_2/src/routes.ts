import { Express, Request, Response } from "express";
import UserRouter from "./routes/user.route";
import TaskRouter from "./routes/task.route";
import path from "path";

function routes(app: Express) {
  const assignmentNumber = path.basename(process.cwd()).split("_")[1];

  app.get("/", (req: Request, res: Response) =>
    res.send(`Hello from Assignment ${assignmentNumber} in Software Quality!`)
  );
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  // Register API routes
  app.use("/api/users", UserRouter);
  app.use("/api/tasks", TaskRouter);

  // Catch unregistered routes
  app.all("*", (req: Request, res: Response) => {
    res.status(404).json({ error: `Route ${req.originalUrl} not found` });
  });
}

export default routes;
