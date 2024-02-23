import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import appRouter from "./routes/routes-index.js";
import cookieParser from "cookie-parser";
import cors from "cors";
config();
const app = express();
//middlewares
const origin = "http://localhost:3000";
app.use(cors({ origin, credentials: true }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
//remove it in production
app.use(morgan("dev"));
app.use("/api/v1", appRouter); //domain/api/v1
export default app;
//# sourceMappingURL=app.js.map