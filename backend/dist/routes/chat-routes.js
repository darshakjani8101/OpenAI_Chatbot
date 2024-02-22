import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { chatCompletionValidator, validate } from "../utils/validators.js";
import { generateChatCompletion } from "../controllers/chat-controllers.js";
const chatRoutes = Router();
chatRoutes.post("/new", validate(chatCompletionValidator), verifyToken, generateChatCompletion); //domain/api/v1/chat/new
export default chatRoutes;
//# sourceMappingURL=chat-routes.js.map