import ServerError from "../helper/serverError.js"
import * as chatRepository from "../repository/chat.repository.js"
import { handleError } from "../helper/errorHandler.js"
import { findUserById } from '../repository/user.repository.js'
import mongoose from "mongoose"
export async function createChat(req, res) {
    try {
        const { user_id_1, user_id_2 } = req.body || {}

        if (!user_id_1 || !user_id_2) {
            throw new ServerError("Ambos usuarios son requeridos", 400)
        }

        if (!mongoose.Types.ObjectId.isValid(user_id_1) ||
            !mongoose.Types.ObjectId.isValid(user_id_2)) {
            throw new ServerError("Uno o ambos ids no tienen un formato válido", 400)
        }

        const [user1, user2] = await Promise.all([
            findUserById(user_id_1),
            findUserById(user_id_2)
        ])

        if (!user1 || !user2) {
            throw new ServerError("Uno o ambos ids no existen", 400)
        }
        if (user_id_1 === user_id_2) {
            throw new ServerError("No puedes crear un chat contigo mismo", 400)
        }

        const chatFound = await chatRepository.findChatByUsers(user_id_1, user_id_2)

        if (chatFound) {
            throw new ServerError('El chat entre esos dos usuarios ya existe', 400)
        }

        const newChat = await chatRepository.createChat({
            user_id_1,
            user_id_2
        })

        res.status(201).json({
            ok: true,
            message: 'Chat creado exitosamente',
            data: newChat
        })

    } catch (error) {
        handleError(error, res)
    }
}


export async function findAllChats(req, res) {
    try {
        const chats = await chatRepository.findAllChats()

        res.status(200).json({
            ok: true,
            data: chats
        })

    } catch (error) {
        handleError(error, res)
    }
}


export async function findChat(req, res) {
    try {
        const chat = await chatRepository.findChatById(req.params.id)

        if (!chat) {
            throw new ServerError('El chat no existe', 404)
        }

        res.status(200).json({
            ok: true,
            data: chat
        })

    } catch (error) {
        handleError(error, res)
    }
}
