const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();

// Render сам передаёт порт через переменную PORT
const PORT = process.env.PORT || 3000;

// Простой HTTP-ответ (Render его ждёт)
app.get("/", (req, res) => {
  res.send("SekretoGram backend is running");
});

// HTTP сервер
const server = http.createServer(app);

// WebSocket сервер
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  console.log("WebSocket client connected");

  ws.on("message", (message) => {
    console.log("Received:", message.toString());
    ws.send("Echo: " + message.toString());
  });

  ws.on("close", () => {
    console.log("WebSocket client disconnected");
  });
});

// САМОЕ ВАЖНОЕ — слушаем порт
server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
