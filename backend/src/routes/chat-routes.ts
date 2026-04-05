/*import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { validate, chatCompletionValidator } from "../utils/validators.js";
import { deleteChats, generateChatCompletion, sendChatsToUser } from "../controllers/chat-controllers.js";

// Protected API
const chatRoutes = Router();
chatRoutes.post("/new", validate(chatCompletionValidator), verifyToken, generateChatCompletion);

chatRoutes.get("/all-chats",verifyToken, sendChatsToUser);
chatRoutes.delete("/delete",verifyToken, deleteChats);


export default chatRoutes;*/

import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { validate, chatCompletionValidator } from "../utils/validators.js";
import {
  deleteChats,
  generateChatCompletion,
  sendChatsToUser,
} from "../controllers/chat-controllers.js";
import User from "../models/User.js";

const chatRoutes = Router();

// ✅ existing routes (UNCHANGED)
chatRoutes.post(
  "/new",
  validate(chatCompletionValidator),
  verifyToken,
  generateChatCompletion
);

chatRoutes.get("/all-chats", verifyToken, sendChatsToUser);
chatRoutes.delete("/delete", verifyToken, deleteChats);

// 🔹 get all chat sessions
chatRoutes.get("/sessions", verifyToken, async (req, res) => {
  const user = await User.findById(res.locals.jwtData.id);

  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  return res.json({
    chats: user.chats.map((c) => ({
      chatId: c.chatId,
      title: c.title,
    })),
  });
});

// 🔹 get single chat
chatRoutes.get("/session/:id", verifyToken, async (req, res) => {
  const user = await User.findById(res.locals.jwtData.id);

  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  const chat = user.chats.find((c) => c.chatId === req.params.id);

  return res.json({ chat });
});

// 🔹 delete one chat
chatRoutes.delete("/session/:id", verifyToken, async (req, res) => {
  const user = await User.findById(res.locals.jwtData.id);

  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  // remove chat
  // @ts-ignore
  user.chats = user.chats.filter((c) => c.chatId !== req.params.id);

  await user.save();

  return res.json({ message: "Deleted" });
});

export default chatRoutes;