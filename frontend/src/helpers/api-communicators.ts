import axios from "axios";

// ✅ IMPORTANT: GLOBAL CONFIG
axios.defaults.baseURL = "/api/v1";
axios.defaults.withCredentials = true;


// ================= AUTH =================

export const loginUser = async (email: string, password: string) => {
    const res = await axios.post("/user/login", { email, password });

    if (res.status !== 200) {
        throw new Error("Unable to login.");
    }

    return res.data;
};

export const signupUser = async (name: string, email: string, password: string) => {
    const res = await axios.post("/user/signup", { name, email, password });

    if (res.status !== 201) {
        throw new Error("Unable to signup.");
    }

    return res.data;
};

export const checkAuthStatus = async () => {
    const res = await axios.get("/user/auth-status");

    if (res.status !== 200) {
        throw new Error("Unable to authenticate");
    }

    return res.data;
};

export const logoutUser = async () => {
    const res = await axios.get("/user/logout");

    if (res.status !== 200) {
        throw new Error("Unable to logout.");
    }

    return res.data;
};


// ================= CHAT =================

// ✅ UPDATED (image support)
export const sendChatRequest = async (
    message: string,
    chatId?: string,
    image?: string
) => {
    const res = await axios.post("/chat/new", {
        message,
        chatId,
        image, // ✅ sending image
    });

    if (res.status !== 200) {
        throw new Error("Unable to send chat");
    }

    return res.data;
};

export const getUserChats = async () => {
    const res = await axios.get("/chat/all-chats");

    if (res.status !== 200) {
        throw new Error("Unable to fetch chats");
    }

    return res.data;
};

export const deleteUserChats = async () => {
    const res = await axios.delete("/chat/delete");

    if (res.status !== 200) {
        throw new Error("Unable to delete chat");
    }

    return res.data;
};


// ================= CHAT SESSIONS =================

export const getChatSessions = async () => {
    const res = await axios.get("/chat/sessions");

    if (res.status !== 200) {
        throw new Error("Unable to fetch chat sessions");
    }

    return res.data;
};

export const getChatById = async (chatId: string) => {
    const res = await axios.get(`/chat/session/${chatId}`);

    if (res.status !== 200) {
        throw new Error("Unable to fetch chat");
    }

    return res.data;
};

export const deleteSingleChat = async (chatId: string) => {
    const res = await axios.delete(`/chat/session/${chatId}`);

    if (res.status !== 200) {
        throw new Error("Unable to delete chat");
    }

    return res.data;
};