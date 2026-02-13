import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        trim: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    sender_user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    chat_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
        required: true
    }
});

const Message = mongoose.model("Message", messageSchema);

export default Message;
