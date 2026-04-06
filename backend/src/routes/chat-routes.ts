import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import {
  deleteChats,
  generateChatCompletion,
  sendChatsToUser,
} from "../controllers/chat-controllers.js";
import User from "../models/User.js";

const chatRoutes = Router();

// ✅ SEND MESSAGE (UPDATED - removed validator to allow image)
chatRoutes.post(
  "/new",
  verifyToken,
  generateChatCompletion
);

// ✅ GET ALL CHATS
chatRoutes.get("/all-chats", verifyToken, sendChatsToUser);

// ✅ DELETE ALL CHATS
chatRoutes.delete("/delete", verifyToken, deleteChats);


// 🔹 GET ALL CHAT SESSIONS
chatRoutes.get("/sessions", verifyToken, async (req, res) => {
  try {
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

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error fetching sessions" });
  }
});


// 🔹 GET SINGLE CHAT
chatRoutes.get("/session/:id", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const chat = user.chats.find((c) => c.chatId === req.params.id);

    return res.json({ chat });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error fetching chat" });
  }
});


// 🔹 DELETE SINGLE CHAT
chatRoutes.delete("/session/:id", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // remove chat
    // @ts-ignore
    user.chats = user.chats.filter((c) => c.chatId !== req.params.id);

    await user.save();

    return res.json({ message: "Deleted" });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error deleting chat" });
  }
});

export default chatRoutes;