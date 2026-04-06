import { Request, Response, NextFunction } from "express";
import User from "../models/User.js";
import { configureOpenAI } from "../config/openai-config.js";
import { ChatCompletionRequestMessage, OpenAIApi } from "openai";

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // ✅ RECEIVE IMAGE
  const { message, chatId, image } = req.body;

  try {
    const user = await User.findById(res.locals.jwtData.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 🔍 find chat
    let chat = user.chats.find((c) => c.chatId === chatId);

    // 🆕 create chat if not exists
    if (!chat) {
      const newChat = {
        chatId,
        title: message ? message.substring(0, 20) : "New Chat",
        messages: [],
      } as any;

      user.chats.push(newChat);
      chat = user.chats[user.chats.length - 1];
    }

    // 🧠 prepare messages for OpenAI (TEXT ONLY)
    const messages = chat.messages.map(({ role, content }) => ({
      role,
      content,
    })) as ChatCompletionRequestMessage[];

    // add user text (ignore image for AI)
    if (message) {
      messages.push({ role: "user", content: message });
    }

    // ✅ SAVE USER MESSAGE (WITH IMAGE)
    chat.messages.push({
      role: "user",
      content: message || "[Image uploaded]",
      image: image || undefined, // 🔥 THIS FIXES YOUR PROBLEM
    });

    // 🤖 OpenAI setup
    const config = configureOpenAI();
    const openai = new OpenAIApi(config);

    let reply;

    try {
      const chatResponse = await openai.createChatCompletion({
        model: "gpt-4o-mini",
        messages,
      });

      reply = chatResponse.data.choices[0].message;
    } catch (error) {
      console.log("OpenAI Error:", error);

      // fallback (important since you said API exhausted)
      reply = {
        role: "assistant",
        content: "AI unavailable. Try again later.",
      };
    }

    if (!reply) {
      reply = {
        role: "assistant",
        content: "No response generated.",
      };
    }

    // ✅ SAVE AI REPLY
    chat.messages.push({
      role: "assistant",
      content: reply.content,
    });

    await user.save();

    return res.status(200).json({
      chatId: chat.chatId,
      messages: chat.messages,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};


// ✅ GET ALL CHATS
export const sendChatsToUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);

    if (!user) {
      return res
        .status(401)
        .json({ message: "User not registered OR Token Malfunctioned" });
    }

    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).json({ message: "Permission didn't match" });
    }

    return res.status(200).json({ message: "OK", chats: user.chats });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "ERROR" });
  }
};


// ✅ DELETE ALL CHATS
export const deleteChats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);

    if (!user) {
      return res
        .status(401)
        .json({ message: "User not registered OR Token Malfunctioned" });
    }

    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).json({ message: "Permission didn't match" });
    }

    // clear chats
    // @ts-ignore
    user.chats = [];
    await user.save();

    return res.status(200).json({ message: "OK" });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "ERROR" });
  }
};