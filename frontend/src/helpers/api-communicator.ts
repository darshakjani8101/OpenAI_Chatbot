import axios from "axios";

export const loginUser = async (email: string, password: string) => {
  const res = await axios.post("/user/login", { email, password });

  if (res.status !== 200) {
    throw new Error("Unable to login!");
  }

  const data = await res.data;
  return data;
};

export const checkAuthStatus = async () => {
  const res = await axios.get("/user/auth-status");

  if (res.status !== 200) {
    throw new Error("Unable to authenticate!");
  }

  const data = await res.data;
  return data;
};

export const logoutUser = async () => {
  const res = await axios.get("/user/logout");

  if (res.status !== 200) {
    throw new Error("Unable to logout!");
  }

  const data = await res.data;
  return data;
};

export const sendChatRequest = async (message: string) => {
  const res = await axios.post("/chat/new", { message });

  if (res.status !== 200) {
    throw new Error("Unable to get openai response!");
  }

  const data = await res.data;
  return data;
};

export const getUserChats = async () => {
  const res = await axios.get("/chat/all-chats");

  if (res.status !== 200) {
    throw new Error("Unable to get user chats!");
  }

  const data = await res.data;
  return data;
};

export const deleteUserChats = async () => {
  const res = await axios.delete("/chat/delete-chats");

  if (res.status !== 200) {
    throw new Error("Unable to delete user chats!");
  }

  const data = await res.data;
  return data;
};
