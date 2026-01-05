function encrypt(text) {
  return Buffer.from(text).toString("base64");
}

function decrypt(text) {
  return Buffer.from(text, "base64").toString();
}

module.exports = { encrypt, decrypt };
