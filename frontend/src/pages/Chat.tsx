import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { red } from "@mui/material/colors";
import ChatItem from "../components/chat/ChatItem";
import { IoMdSend } from "react-icons/io";
import {
  deleteUserChats,
  getUserChats,
  sendChatRequest,
} from "../helpers/api-communicator";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const Chat = () => {
  const auth = useAuth();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth?.user) {
      return navigate("/login");
    }
  }, [auth]);

  useEffect(() => {
    async function getChats() {
      if (auth?.isLoggedIn && auth.user) {
        try {
          toast.loading("Loading Chats", { id: "loadchats" });
          const data = await getUserChats();
          if (data) {
            setChatMessages([...data.chats]);
          }
          toast.success("Chats Loaded Successfully", { id: "loadchats" });
        } catch (error) {
          console.log(error);
          toast.error("Chats Loading Failed", { id: "loadchats" });
        }
      }
    }

    getChats();
  }, [auth]);

  const handleSubmit = async () => {
    const content = inputRef.current?.value as string;
    if (inputRef && inputRef.current) {
      inputRef.current.value = "";
    }
    const newMessage: Message = { role: "user", content };
    setChatMessages((prev) => [...prev, newMessage]);

    //get new message
    try {
      toast.loading("Chatbot is typing", { id: "newmessage" });
      const chatData = await sendChatRequest(content);
      setChatMessages([...chatData.chats]);
      toast.success("Respone Received", { id: "newmessage" });
    } catch (error) {
      console.log(error);
      toast.error("Failed to Respond", { id: "newmessage" });
    }
  };

  const handleDeleteChats = async () => {
    try {
      toast.loading("Deleting Chats", { id: "deletechats" });
      await deleteUserChats();
      setChatMessages([]);
      toast.success("Chats Deleted Successfully", { id: "deletechats" });
    } catch (error) {
      console.log(error);
      toast.error("Chats Deleting Failed", { id: "deletechats" });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100%",
        mt: 3,
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: { md: "flex", sm: "none", xs: "none" },
          flex: 0.2,
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "80vh",
            bgcolor: "rgb(17,29,39)",
            borderRadius: 5,
            mx: 3,
          }}
        >
          <Avatar
            sx={{
              mx: "auto",
              my: 2,
              bgcolor: "white",
              color: "black",
              fontWeight: 700,
            }}
          >
            {auth?.user?.name[0]}
            {/* {auth?.user?.name.split(" ")[1][0]} */}
          </Avatar>
          <Typography sx={{ mx: "auto", fontFamily: "work sans" }}>
            You are talking to a ChatBOT!
          </Typography>
          <Typography sx={{ mx: "auto", fontFamily: "work sans", my: 4, p: 3 }}>
            You can ask some questions related to Knowledge, Business, Advices,
            Education, etc. But avoid sharing your personal information!
          </Typography>
          <Button
            sx={{
              width: "200px",
              mx: "auto",
              my: "auto",
              fontWeight: 700,
              borderRadius: 3,
              color: "white",
              bgcolor: red[300],
              ":hover": {
                bgcolor: red.A400,
              },
            }}
            onClick={handleDeleteChats}
          >
            Clear Conversation
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flex: { md: 0.8, sm: 1, xs: 1 },
          flexDirection: "column",
          px: 3,
        }}
      >
        <Typography
          sx={{
            fontSize: "30px",
            fontWeight: "600",
            color: "white",
            mb: 2,
            mx: "auto",
          }}
        >
          Model - GPT 3.5 Turbo
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: "60vh",
            borderRadius: 3,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
            overflowX: "hidden",
            overflowY: "auto",
            scrollBehavior: "smooth",
          }}
        >
          {chatMessages.map((chat, index) => (
            //@ts-ignore
            <ChatItem role={chat.role} content={chat.content} key={index} />
          ))}
        </Box>
        <div
          style={{
            width: "100%",
            //padding: "10px",
            borderRadius: 8,
            backgroundColor: "rgb(17,27,39)",
            display: "flex",
            margin: "auto",
          }}
        >
          <input
            ref={inputRef}
            type="text"
            style={{
              width: "100%",
              backgroundColor: "transparent",
              padding: "20px",
              border: "none",
              outline: "none",
              color: "white",
              fontSize: "20px",
            }}
          />
          <IconButton
            onClick={handleSubmit}
            sx={{ ml: "auto", color: "white", mx: 1 }}
          >
            <IoMdSend />
          </IconButton>
        </div>
      </Box>
    </Box>
  );
};

export default Chat;
