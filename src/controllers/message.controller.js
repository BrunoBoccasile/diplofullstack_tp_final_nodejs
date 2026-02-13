import ServerError from "../helper/serverError.js";
import * as messageRepository from "../repository/message.repository.js";
import { handleError } from "../helper/errorHandler.js";
import { findChatById } from "../repository/chat.repository.js";
import { findUserById } from "../repository/user.repository.js";
import mongoose from "mongoose";

export async function findMessagesByChat(req, res) {
    try {

        const { chat_id } = req.body || {};

        if (!chat_id) {
            throw new ServerError("El campo chat_id es requerido", 400);
        }

        if (!mongoose.Types.ObjectId.isValid(chat_id)) {
            throw new ServerError("El chat_id no tiene un formato válido", 400)
        }

        const chatExists = await findChatById(chat_id);

        if (!chatExists) {
            throw new ServerError("El chat ingresado no existe", 400);
        }


        const messages = await messageRepository.findMessagesByChat(chat_id);


        res.status(200).json({
            ok: true,
            data: messages
        });

    } catch (error) {
        handleError(error, res);
    }
}
export async function findMessageById(req, res) {
    try {
        const messageId = req.params.id || {};

        if (!messageId) {
            throw new ServerError("El id del mensaje es requerido", 400);
        }

        if (!mongoose.Types.ObjectId.isValid(messageId)) {
            throw new ServerError("El id del mensaje no tiene un formato válido", 400)
        }


        const messages = await messageRepository.findMessageById(messageId);

        if (!messages) {
            throw new ServerError("El mensaje ingresado no existe", 400);
        }

        res.status(200).json({
            ok: true,
            data: messages
        });

    } catch (error) {
        handleError(error, res);
    }
}

export async function createMessage(req, res) {
    try {
        const { content, sender_user_id, chat_id } = req.body || {};

        if (!content || !sender_user_id || !chat_id) {
            throw new ServerError("Todos los campos (content, sender_user_id, chat_id) son requeridos", 400);
        }

        if (!mongoose.Types.ObjectId.isValid(chat_id) ||
            !mongoose.Types.ObjectId.isValid(sender_user_id)) {
            throw new ServerError("Uno o ambos ids no tienen un formato válido", 400)
        }

        const [chatFound, senderUser] = await Promise.all([
            findChatById(chat_id),
            findUserById(sender_user_id)
        ])

        if (!chatFound) {
            throw new ServerError("El chat no existe", 404)
        }

        if (!senderUser) {
            throw new ServerError("El usuario remitente no existe", 404)
        }

        console.log(chatFound.user_id_1 + " = " + sender_user_id)
        console.log(chatFound.user_id_2 + " = " + sender_user_id)

        if (chatFound.user_id_1 != sender_user_id && chatFound.user_id_2 != sender_user_id) {
            throw new ServerError("El usuario ingresado no es parte de ese chat", 404)
        }

        const newMessage = await messageRepository.createMessage({
            content,
            sender_user_id,
            chat_id
        });

        res.status(201).json({
            ok: true,
            message: "Mensaje creado correctamente",
            data: newMessage
        });

    } catch (error) {
        handleError(error, res);
    }
}