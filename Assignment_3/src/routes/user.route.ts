import express from 'express'
import userController from '../controllers/user.controller'

const router = express.Router()

router.get('/:id', userController.getUserByIdEP)
router.get('/', userController.getAllUsersEP)
router.post('/', userController.createUserEP)

export default router
