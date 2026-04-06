import mongoose from "mongoose";
import { randomUUID } from "crypto";

// 🔥 MESSAGE SCHEMA (UPDATED)
const messageSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: false, // ✅ allow empty when image only
  },
  image: {
    type: String,
    required: false, // ✅ NEW FIELD
  },
});

// 🔥 CHAT SESSION SCHEMA (UNCHANGED)
const chatSessionSchema = new mongoose.Schema({
  chatId: {
    type: String,
    default: () => randomUUID(),
  },
  title: {
    type: String,
    default: "New Chat",
  },
  messages: [messageSchema],
});

// 🔥 USER SCHEMA (UNCHANGED)
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  chats: [chatSessionSchema],
});

export default mongoose.model("User", userSchema);