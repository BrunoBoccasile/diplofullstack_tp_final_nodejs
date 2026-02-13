import express from 'express'
import * as chatController from '../controllers/chat.controller.js'


const chatRouter = express.Router()

chatRouter.post('/', chatController.createChat)
chatRouter.get('/', chatController.findAllChats)
chatRouter.get('/:id', chatController.findChat)


export default chatRouter