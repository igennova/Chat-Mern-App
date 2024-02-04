const express = require("express");
const cors = require("cors");
const authJS = require("./routes/userRoutes");
const msgRoutes=require("./routes/messageroutes")
const mongoose = require("mongoose");
const app = express();
const socket=require("socket.io")
require("dotenv").config();

app.use(cors());
app.use(express.json());

const httpport = Number(process.env.PORT) || 5000;

mongoose                         
  .connect("mongodb://localhost:27017", {
  })
  .then(() => {
    console.log("DB CONNECTED");
    // Now that the database is connected, start the server
   
  })
  .catch((err) => {
    console.log("DB ERROR", err.message);
  });
  const server = app.listen(httpport, () => {
    console.log(`server started ${httpport}`);
  });

app.use("/api/auth", authJS);
app.use("/api/message", msgRoutes);
app.get("/", (req, res) => {
  res.send("Hello, this is the root endpoint!");
});

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.message);
    }
  });
});