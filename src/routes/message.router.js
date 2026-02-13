import express from 'express'
import * as messageController from '../controllers/message.controller.js'


const messageRouter = express.Router()

messageRouter.post('/', messageController.createMessage)
messageRouter.get('/', messageController.findMessagesByChat)
messageRouter.get('/:id', messageController.findMessageById)


export default messageRouter