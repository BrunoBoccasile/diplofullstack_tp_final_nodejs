import Chat from "../models/chat.model.js";

export function createChat(data) {
    return Chat.create(data);
}

export function findChatById(chatId) {
    return Chat.findById(chatId);
}


export function findAllChats() {
    return Chat.find();
}

export function findChatByUsers(userId1, userId2) {
    return Chat.findOne({
        $or: [
            { user_id_1: userId1, user_id_2: userId2 },
            { user_id_1: userId2, user_id_2: userId1 }
        ]
    });
}
