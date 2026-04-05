/*import { Request, Response, NextFunction } from "express";
import User from "../models/User.js";
import { configureOpenAI } from "../config/openai-config.js";
import { ChatCompletionRequestMessage, OpenAIApi } from "openai";

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message } = req.body;

  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user)
      return res
        .status(404)
        .json({ message: "User not registered OR Token Malfunctioned" });

    // grab chats of user
    const chats = user.chats.map(({ role, content }) => ({
      role,
      content,
    })) as ChatCompletionRequestMessage[];

    chats.push({ role: "user", content: message });
    user.chats.push({ role: "user", content: message });

    // OpenAI call
    const config = configureOpenAI();
    const openai = new OpenAIApi(config);

    const chatResponse = await openai.createChatCompletion({
      model: "gpt-4o-mini", //  updated model
      messages: chats,
    });

    const reply = chatResponse.data.choices[0].message;

    if (!reply) {
      return res.status(500).json({ message: "No response from AI" });
    }

    user.chats.push(reply);
    await user.save();

    return res.status(200).json({ chats: user.chats });
  } catch (error) {
    console.log(error); // debug log
    return res.status(200).json({ message: "Something went wrong" });
  }
};

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
    return res.status(200).json({ message: "ERROR" }); // fixed status
  }
};

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
    return res.status(200).json({ message: "ERROR" }); // fixed status
  }
};
*/

import { Request, Response, NextFunction } from "express";
import User from "../models/User.js";
import { configureOpenAI } from "../config/openai-config.js";
import { ChatCompletionRequestMessage, OpenAIApi } from "openai";

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message } = req.body;

  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user)
      return res
        .status(404)
        .json({ message: "User not registered OR Token Malfunctioned" });

    // existing chats
    const chats = user.chats.map(({ role, content }) => ({
      role,
      content,
    })) as ChatCompletionRequestMessage[];

    // push user message
    chats.push({ role: "user", content: message });
    user.chats.push({ role: "user", content: message });

    // OpenAI setup
    const config = configureOpenAI();
    const openai = new OpenAIApi(config);

    let reply;

    try {
      const chatResponse = await openai.createChatCompletion({
        model: "gpt-4o-mini",
        messages: chats,
      });

      reply = chatResponse.data.choices[0].message;
    } catch (error) {
      console.log("OpenAI Error:", error);

      //  fallback reply (IMPORTANT)
      reply = {
        role: "assistant",
        content: "AI is currently unavailable (quota exceeded). Try again later.",
      };
    }

    // safety check
    if (!reply) {
      reply = {
        role: "assistant",
        content: "No response generated.",
      };
    }

    // save reply
    user.chats.push(reply);
    await user.save();

    return res.status(200).json({ chats: user.chats });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" }); // ✅ fixed
  }
};

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
    return res.status(500).json({ message: "ERROR" }); //  fixed
  }
};

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
    return res.status(500).json({ message: "ERROR" }); // fixed
  }
};