import express from "express";
import taskController from "../controllers/task.controller";

const router = express.Router();

router.get("/:id", taskController.getTaskByIdEP);
router.post("/", taskController.createTaskEP);
router.get("/", taskController.getAllTasksEP);
router.put("/:id", taskController.updateTaskEP);
router.delete("/:id", taskController.deleteTaskEP);

export default router;
