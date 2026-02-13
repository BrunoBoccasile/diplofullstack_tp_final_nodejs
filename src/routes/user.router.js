import express from 'express'
import * as userController from '../controllers/user.controller.js'


const userRouter = express.Router()

userRouter.post('/', userController.createUser)
userRouter.get('/', userController.findAllUsers)
userRouter.get('/:id', userController.findUser)
userRouter.delete('/:id', userController.deleteUser)


export default userRouter