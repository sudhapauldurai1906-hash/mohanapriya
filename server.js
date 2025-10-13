const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// In-memory users (temporary database)
let users = [
  { username: "mohana", password: "12345" },
  { username: "john", password: "pass" },
];

// Register API
app.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (users.find((u) => u.username === username)) {
    return res.json({ success: false, message: "Username already exists" });
  }
  users.push({ username, password });
  res.json({ success: true, message: "Registration successful" });
});

// Login API
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    res.json({ success: true });
  } else {
    res.json({ success: false, message: "Invalid username or password" });
  }
});

let onlineUsers = [];

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("join", (username) => {
    socket.username = username;
    onlineUsers.push(username);
    io.emit("onlineUsers", onlineUsers);
  });

  socket.on("chat message", (data) => {
    io.emit("chat message", {
      user: socket.username,
      text: data.text,
      time: data.time,
    });
  });

  socket.on("disconnect", () => {
    if (socket.username) {
      onlineUsers = onlineUsers.filter((u) => u !== socket.username);
      io.emit("onlineUsers", onlineUsers);
    }
    console.log("User disconnected");
  });
});

server.listen(5000, () => console.log("Server running on port 5000"));
