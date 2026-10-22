import "dotenv/config";

import dns from "node:dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);

// reads .env into process.env

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import taskRouter from "./routes/taskRoutes";

const app = express();
const PORT = process.env.PORT || 6741;

// CORS : only the Client url address my call this APi
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173/" }));

app.use(express.json());

app.use("/api/tasks", taskRouter);

const startServer = async () => {
  await mongoose.connect(process.env.MONGO_URL as string);
  console.log("Database connected successfully");

  app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`);
  });
};

startServer();

// Every endpoint must start with/api/tasks is handled by task router
// .use is an inbuilt middleware that can be used to convert check nd validate requests

// converts every requests to json (javaScript format)


// cors = cross origin resource sharing
