/*import { Request, Response, NextFunction } from "express";
import User from "../models/User.js";
import { configureOpenAI } from "../config/openai-config.js";
import { ChatCompletionRequestMessage, OpenAIApi } from "openai";

export const generateChatCompletion = async (req : Request,
    res : Response,
    next : NextFunction
) => {  
        const{message}= req.body;

        try{
            const user = await User.findById(res.locals.jwtData.id);
        if(!user){
        return res.status(404).json({message: "User not registered OR Token Malfunctioned"})
        };

        //grab chats of userone to openai API
        // get latest reponse 
        // send all chats with new 
        const chats = user.chats.map(({role,content}) => ({role,content})) as ChatCompletionRequestMessage[];
        chats.push({role: "user", content: message});
        user.chats.push({role: "user", content: message});
        await user.save();
        return res.status(200).json({message: "OK" , chats});


        const config = configureOpenAI();
        const openai = new OpenAIApi(config);
        const chatResponse = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: chats,
        });
        user.chats.push(chatResponse.data.choices[0].message);
        await user.save();
        return res.status(200).json({chats: user.chats});
        

        }
        catch(error){
            return res.status(500).json({message: "Something went wrong"})
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

    // grab chats of user
    const chats = user.chats.map(({ role, content }) => ({
      role,
      content,
    })) as ChatCompletionRequestMessage[];

    chats.push({ role: "user", content: message });
    user.chats.push({ role: "user", content: message });

    // send chats to openAI API 
    const config = configureOpenAI();
    const openai = new OpenAIApi(config);

    const chatResponse = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
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
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const sendChatsToUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // user token check
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered OR Token Malfunctioned ");
        }
        console.log(user._id.toString() , res.locals.jwtData.id);
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permission didn't match");
        }
        return res.status(200).json({ message: "OK", chats : user.chats });
    }
    catch (error) {
        console.log(error);
        const message = error instanceof Error ? error.message : " Unknown error ";
        return res.status(200).json({ message: "ERROR", cause: message });

    }
};


export const deleteChats = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // user token check
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered OR Token Malfunctioned ");
        }
        console.log(user._id.toString() , res.locals.jwtData.id);
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permission didn't match");
        }
        // @ts-ignore
        user.chats = [];
        await user.save();

        return res.status(200).json({ message: "OK" });
    }
    catch (error) {
        console.log(error);
        const message = error instanceof Error ? error.message : " Unknown error ";
        return res.status(200).json({ message: "ERROR", cause: message });

    }
};

