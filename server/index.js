import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import projectRoutes from "./routes/projects.js";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "https://user-project-task-management.onrender.com",
      "http://localhost:5173",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "x-auth-token"],
    exposedHeaders: ["Set-Cookie"],
  })
);

app.options("*", cors());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);

app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    errors: err.errors,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
