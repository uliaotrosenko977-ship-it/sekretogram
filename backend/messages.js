const { encrypt } = require("./crypto");

const messages = [];

function saveMessage(payload) {
  const message = {
    id: Date.now().toString(),
    chatId: payload.chatId,
    from: payload.from,
    text: encrypt(payload.text)
  };
  messages.push(message);
  return message;
}

module.exports = { saveMessage, messages };
