import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import classifyRoutes from "./routes/classify.js";

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://mailmind-ai-gen.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/api", classifyRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
