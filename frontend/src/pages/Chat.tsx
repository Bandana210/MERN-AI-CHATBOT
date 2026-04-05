import { useState, useRef } from 'react';
import { useEffect, useLayoutEffect } from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import ChatItem from '../components/chat/ChatItem';
import { IoMdSend } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import {
    deleteUserChats,
    getUserChats,
    sendChatRequest,
    getChatSessions,
    getChatById,
    deleteSingleChat
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
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    // IMAGE UPLOAD
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setSelectedImage(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleDeleteSingleChat = async (chatId: string) => {
        try {
            await deleteSingleChat(chatId);
            setChatSessions(prev => prev.filter(c => c.chatId !== chatId));

            if (currentChatId === chatId) {
                setChatMessages([]);
                setCurrentChatId(null);
            }
        } catch {
            toast.error("Failed to delete chat");
        }
    };

    const handleNewChat = () => {
        setChatMessages([]);
        setCurrentChatId(null);
    };

    const handleSubmit = async () => {
        const content = inputRef.current?.value || "";
        if (!content && !selectedImage) return;

        if (inputRef.current) inputRef.current.value = "";

        setChatMessages(prev => [...prev, {
            role: "user",
            content: content || "[Image uploaded]"
        }]);

        try {
            const chatData = await sendChatRequest(
                content,
                currentChatId || undefined,
                selectedImage
            );

            setChatMessages(chatData.messages || []);

            if (!currentChatId) {
                setCurrentChatId(chatData.chatId);
            }

            const sessions = await getChatSessions();
            setChatSessions(sessions.chats || []);

            setSelectedImage(null);

        } catch {
            toast.error("Bot failed to respond");
        }
    };

    const handleDeleteChats = async () => {
        try {
            await deleteUserChats();
            setChatMessages([]);
            setCurrentChatId(null);
            setChatSessions([]);
        } catch {
            toast.error("Delete failed");
        }
    };

    useLayoutEffect(() => {
        if (auth?.isLoggedIn && auth.user) {
            getUserChats().then((data) => {
                if (data.chats?.length > 0) {
                    const firstChat = data.chats[0];
                    setChatMessages(firstChat.messages || []);
                    setCurrentChatId(firstChat.chatId);
                }
            });
        }
    }, [auth]);

    useEffect(() => {
        if (auth?.isLoggedIn && auth.user) {
            getChatSessions()
                .then((data) => setChatSessions(data.chats || []));
        }
    }, [auth]);

    const handleSelectChat = async (chatId: string) => {
        const data = await getChatById(chatId);
        if (data.chat) {
            setChatMessages(data.chat.messages || []);
            setCurrentChatId(chatId);
        }
    };

    useEffect(() => {
        if (!auth?.user) navigate("/login");
    }, [auth]);

    return (
        <Box sx={{
            display: "flex",
            height: "100%",
            overflow: "hidden",
            position: "relative",

            // 🔥 GRADIENT BACKGROUND
            background: `
                radial-gradient(circle at 20% 20%, rgba(0,255,255,0.08), transparent 40%),
                radial-gradient(circle at 80% 80%, rgba(0,255,255,0.05), transparent 40%),
                #020617
            `
        }}>

            {/* 🔥 GRID OVERLAY */}
            <Box sx={{
                position: "absolute",
                inset: 0,
                backgroundImage: `
                    linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
                `,
                backgroundSize: "40px 40px",
                pointerEvents: "none"
            }} />

            {/* CONTENT */}
            <Box sx={{ display: "flex", width: "100%", position: "relative", zIndex: 1 }}>

                {/* SIDEBAR */}
                <Box sx={{
                    width: 260,
                    bgcolor: "rgba(26,26,46,0.8)",
                    backdropFilter: "blur(10px)",
                    p: 2,
                    display: { md: "flex", xs: "none" },
                    flexDirection: "column"
                }}>
                    <Button
                        onClick={handleNewChat}
                        sx={{
                            mb: 2,
                            bgcolor: "#2a2a3b",
                            color: "white",
                            borderRadius: 3
                        }}
                    >
                        + New Chat
                    </Button>

                    <input
                        placeholder="Search chats..."
                        style={{
                            padding: "10px",
                            borderRadius: "20px",
                            border: "none",
                            marginBottom: "10px",
                            backgroundColor: "#2a2a3b",
                            color: "white"
                        }}
                    />

                    <Typography sx={{ color: "gray", mb: 1 }}>
                        Today
                    </Typography>

                    <Box sx={{ flex: 1, overflowY: "auto" }}>
                        {chatSessions.map(chat => (
                            <Box
                                key={chat.chatId}
                                onClick={() => handleSelectChat(chat.chatId)}
                                sx={{
                                    p: 1,
                                    borderRadius: 2,
                                    mb: 1,
                                    display: "flex",
                                    justifyContent: "space-between",
                                    cursor: "pointer",
                                    bgcolor: currentChatId === chat.chatId ? "#2f2f4f" : "transparent"
                                }}
                            >
                                <Typography sx={{ color: "white", fontSize: 14 }}>
                                    {chat.title}
                                </Typography>

                                <span
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteSingleChat(chat.chatId);
                                    }}
                                    style={{ color: "red" }}
                                >
                                    ✕
                                </span>
                            </Box>
                        ))}
                    </Box>

                    <Button
                        onClick={handleDeleteChats}
                        sx={{ mt: 2, bgcolor: "#3a3a5a", color: "white" }}
                    >
                        Delete Chat History
                    </Button>
                </Box>

                {/* MAIN */}
                <Box sx={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Box sx={{
                        width: "100%",
                        maxWidth: "900px",
                        px: 2
                    }}>

                        <Typography sx={{
                            fontSize: "48px",
                            fontWeight: 600,
                            color: "white",
                            textAlign: "center",
                            mb: 1
                        }}>
                            AI Chat
                        </Typography>

                        <Typography sx={{
                            color: "#a0a0b0",
                            textAlign: "center",
                            mb: 3
                        }}>
                            AI Chat is an AI chatbot that writes text.
                        </Typography>

                        {/* INPUT */}
                        <Box sx={{
                            display: "flex",
                            alignItems: "center",
                            bgcolor: "#2a2a3b",
                            borderRadius: "40px",
                            px: 2,
                            py: 1,
                            mb: 2
                        }}>
                            <label style={{ cursor: "pointer", marginRight: 10, color: "white", fontSize: "20px" }}>
                                +
                                <input type="file" hidden onChange={handleImageUpload} />
                            </label>

                            <input
                                ref={inputRef}
                                placeholder="Message AI Chat..."
                                style={{
                                    flex: 1,
                                    background: "transparent",
                                    border: "none",
                                    outline: "none",
                                    color: "white"
                                }}
                            />

                            <IconButton onClick={handleSubmit}>
                                <IoMdSend style={{ color: "violet" }} />
                            </IconButton>
                        </Box>

                        {/* IMAGE */}
                        {selectedImage && (
                            <img src={selectedImage} width={100} />
                        )}

                        {/* CHAT */}
                        <Box sx={{
                            height: "400px",
                            overflowY: "auto"
                        }}>
                            {chatMessages.map((chat, i) => (
                                <ChatItem key={i} {...chat} />
                            ))}
                        </Box>

                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Chat;