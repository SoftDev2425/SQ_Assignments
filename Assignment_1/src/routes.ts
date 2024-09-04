import { Express, Request, Response } from "express";
import UserRouter from "./routes/user.route";
import TaskRouter from "./routes/task.route";

function routes(app: Express) {
  app.get("/", (req: Request, res: Response) => res.send("Hello from Assignment 1 in Software Quality!"));
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  // Register API routes
  app.use("/api/user", UserRouter);
  app.use("/api/task", TaskRouter);

  // Catch unregistered routes
  app.all("*", (req: Request, res: Response) => {
    res.status(404).json({ error: `Route ${req.originalUrl} not found` });
  });
}

export default routes;
