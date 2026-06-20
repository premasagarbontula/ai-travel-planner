import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import chalk from "chalk";

import connectDB from "./config/db";

import authRoutes from "./routes/authRoutes";
import tripRoutes from "./routes/tripRoutes";

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

//routes
app.use("/api/auth", authRoutes);
app.use("/api/trips", tripRoutes);

app.get("/", (req, res) => {
  res.send("Travel Planner API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(chalk.green.bold(`Server running on port ${PORT}`));
});
