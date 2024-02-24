import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { chatCompletionValidator, validate } from "../utils/validators.js";
import {
  deleteUserChats,
  generateChatCompletion,
  sendChatsToUser,
} from "../controllers/chat-controllers.js";

const chatRoutes = Router();

chatRoutes.post(
  "/new",
  validate(chatCompletionValidator),
  verifyToken,
  generateChatCompletion
); //domain/api/v1/chat/new

chatRoutes.get("/all-chats", verifyToken, sendChatsToUser); //domain/api/v1/chat/all-chats

chatRoutes.delete("/delete-chats", verifyToken, deleteUserChats); //domain/api/v1/chat/delete-chats

export default chatRoutes;
