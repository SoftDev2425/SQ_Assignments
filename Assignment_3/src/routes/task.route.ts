import express from 'express'
import taskController from '../controllers/task.controller'

const router = express.Router()

router.get('/:id', taskController.handleGetTaskById)
router.post('/', taskController.handleCreateTask)
router.get('/', taskController.handleGetAllTasks)
router.put('/:id', taskController.handleUpdateTask)
router.delete('/:id', taskController.handleDeleteTask)
router.put('/:id/status', taskController.handleUpdateTaskStatus)

export default router
