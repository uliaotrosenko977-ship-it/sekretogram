const http = require("http");
const fs = require("fs");
const path = require("path");
const WebSocket = require("ws");

const messages = require("./messages");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  // Отдаём frontend
  if (req.method === "GET" && req.url === "/") {
    const html = fs.readFileSync(
      path.join(__dirname, "../frontend/index.html")
    );
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(html);
    return;
  }

  res.writeHead(404);
  res.end("Not found");
});

const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  ws.on("message", (data) => {
    const payload = JSON.parse(data.toString());

    if (payload.type === "message") {
      const saved = messages.saveMessage(payload);

      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(saved));
        }
      });
    }
  });
});

server.listen(PORT, () => {
  console.log("SekretoGram running on port", PORT);
});
