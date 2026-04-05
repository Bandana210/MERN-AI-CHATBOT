/*import mongoose from "mongoose";
import { randomUUID } from 'crypto';

const chatSchema = new mongoose.Schema({
    id :{
        type: String,
        default: randomUUID(),
    },
    role :{
        type:String,
        required: true,
    },
    content:{
        type:String,
        required: true,
    }
});

const userSchema = new mongoose.Schema({
    // id automatically from mongodb 
    name: {
        type: String ,
        required: true ,
    },

    email : {
        type: String,
        required: true ,
        unique: true ,
    },

    password: {
        type: String,
        required: true ,

    },

    chats : [chatSchema],
});

export default mongoose.model("USer ", userSchema);

*/

import mongoose from "mongoose";
import { randomUUID } from "crypto";

// message schema
const messageSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

// chat session schema
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

  chats: [chatSessionSchema], // 🔥 changed
});

export default mongoose.model("User", userSchema);