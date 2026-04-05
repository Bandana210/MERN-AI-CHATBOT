import { useState, useRef } from 'react';
import { useEffect, useLayoutEffect } from "react";
import { Box, Avatar, Typography, Button, IconButton } from "@mui/material";
import { red } from '@mui/material/colors';
import { useAuth } from "../context/AuthContext";
import ChatItem from '../components/chat/ChatItem';
import { IoMdSend } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import {
    deleteUserChats,
    getUserChats,
    sendChatRequest,
    getChatSessions,
    getChatById
} from "../helpers/api-communicators";
import toast from "react-hot-toast";

type Messages = {
    role: "user" | "assistant";
    content: string;
}

const Chat = () => {
    const navigate = useNavigate();
    const inputRef = useRef<HTMLInputElement | null>(null);
    const auth = useAuth();

    const [chatMessages, setChatMessages] = useState<Messages[]>([]);
    const [chatSessions, setChatSessions] = useState<{ chatId: string, title: string }[]>([]);
    const [currentChatId, setCurrentChatId] = useState<string | null>(null);

    // CREATE NEW CHAT
    const handleNewChat = () => {
        setChatMessages([]);
        setCurrentChatId(null);
    };

    // SEND MESSAGE (FIXED FULLY)
    const handleSubmit = async () => {
        const content = inputRef.current?.value as string;
        if (!content) return;

        if (inputRef.current) inputRef.current.value = "";

        const newMessage: Messages = { role: "user", content };
        setChatMessages(prev => [...prev, newMessage]);

        try {
            const chatData = await sendChatRequest(content, currentChatId || undefined);

            setChatMessages(chatData.messages || []);

            //  IMPORTANT: set chatId if new
            if (!currentChatId) {
                setCurrentChatId(chatData.chatId);
            }

            // REFRESH SIDEBAR (THIS FIXES YOUR MAIN BUG)
            const sessions = await getChatSessions();
            setChatSessions(sessions.chats || []);

        } catch (error) {
            console.log(error);
            toast.error("Bot failed to respond");
        }
    };

    // DELETE ALL
    const handleDeleteChats = async () => {
        try {
            toast.loading("Deleting Chats", { id: "deletechats" });
            await deleteUserChats();
            setChatMessages([]);
            setCurrentChatId(null);
            setChatSessions([]);
            toast.success("Deleted Chats Successfully", { id: "deletechats" });
        } catch (error) {
            console.log(error);
            toast.error("Deleting Chats Failed", { id: "deletechats" });
        }
    };

    // INITIAL LOAD
    useLayoutEffect(() => {
        if (auth?.isLoggedIn && auth.user) {
            getUserChats().then((data) => {
                if (data.chats && data.chats.length > 0) {
                    const firstChat = data.chats[0];
                    setChatMessages(firstChat.messages || []);
                    setCurrentChatId(firstChat.chatId);
                }
            });
        }
    }, [auth]);

    // LOAD SESSIONS
    useEffect(() => {
        if (auth?.isLoggedIn && auth.user) {
            getChatSessions()
                .then((data) => setChatSessions(data.chats || []))
                .catch(console.log);
        }
    }, [auth]);

    // SWITCH CHAT
    const handleSelectChat = async (chatId: string) => {
        try {
            const data = await getChatById(chatId);

            if (data.chat) {
                setChatMessages(data.chat.messages || []);
                setCurrentChatId(chatId);
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to load chat");
        }
    };

    useEffect(() => {
        if (!auth?.user) navigate("/login");
    }, [auth]);

    return (
        <Box sx={{ display: 'flex', flex: 1, width: '100%', height: "100%", mt: 3, gap: 3 }}>

            {/* SIDEBAR */}
            <Box sx={{ display: { md: 'flex', xs: "none" } }}>
                <Box sx={{
                    display: "flex",
                    width: '100%',
                    bgcolor: "rgb(17,29,39)",
                    borderRadius: 5,
                    flexDirection: 'column',
                    mx: 3,
                    p: 2
                }}>

                    <Avatar sx={{ mx: "auto", my: 2 }}>
                        {auth?.user?.name[0]}
                    </Avatar>

                    {/* LABEL */}
                    <Typography sx={{ color: "white", mb: 1 }}>
                        Chat History
                    </Typography>

                    {/* NEW CHAT BUTTON */}
                    <Button
                        onClick={handleNewChat}
                        sx={{ mb: 2, color: "white", bgcolor: "green" }}
                    >
                        + New Chat
                    </Button>

                    {/* CHAT LIST */}
                    <Box sx={{ flex: 1, overflowY: "auto" }}>
                        {chatSessions.map((chat) => (
                            <Typography
                                key={chat.chatId}
                                onClick={() => handleSelectChat(chat.chatId)}
                                sx={{
                                    color: "white",
                                    cursor: "pointer",
                                    p: 1,
                                    borderRadius: 2,
                                    backgroundColor:
                                        currentChatId === chat.chatId
                                            ? "rgba(255,255,255,0.2)"
                                            : "transparent",
                                    "&:hover": {
                                        backgroundColor: "rgba(255,255,255,0.1)"
                                    }
                                }}
                            >
                                {chat.title}
                            </Typography>
                        ))}
                    </Box>

                    <Button
                        onClick={handleDeleteChats}
                        sx={{ mt: 2, color: 'white', bgcolor: red[300] }}
                    >
                        Clear All Chats
                    </Button>

                </Box>
            </Box>

            {/* CHAT AREA */}
            <Box sx={{ display: 'flex', flex: { md: 0.8, xs: 1 }, flexDirection: 'column', px: 3 }}>

                <Typography sx={{ textAlign: 'center', fontSize: "40px", color: 'white' }}>
                    AI Chat Assistant
                </Typography>

                <Box sx={{ height: "60vh", overflowY: "auto" }}>
                    {chatMessages.map((chat, index) => (
                        <ChatItem content={chat.content} role={chat.role} key={index} />
                    ))}
                </Box>

                {/* INPUT */}
                <div style={{
                    width: "100%",
                    padding: "20px",
                    backgroundColor: "rgb(17,27,39)",
                    display: "flex"
                }}>
                    <input
                        ref={inputRef}
                        style={{
                            width: "100%",
                            background: "transparent",
                            color: "white",
                            border: "none",
                            outline: "none"
                        }}
                    />
                    <IconButton onClick={handleSubmit} sx={{ color: "white" }}>
                        <IoMdSend />
                    </IconButton>
                </div>

            </Box>
        </Box>
    );
};

export default Chat;