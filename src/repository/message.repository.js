import Message from "../models/message.model.js";

export function createMessage(data) {
    return Message.create(data);
}

export function findMessageById(messageId) {
    return Message.findById(messageId);
}


export function findAllMessages() {
    return Message.find();
}

export function findMessagesByChat(chatId) {
    return Message.find({ chat_id: chatId }).sort({ created_at: 1 });
}

