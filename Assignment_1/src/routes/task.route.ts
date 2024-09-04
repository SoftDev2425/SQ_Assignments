import express from "express";
import taskController from "../controllers/task.controller";

const router = express.Router();

router.get("/:id", taskController.getTaskById);
router.post("/", taskController.createTask);
router.get("/", taskController.getAllTasks);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

export default router;
