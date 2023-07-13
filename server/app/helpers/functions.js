const crypto = require("crypto");
require("dotenv").config();
// Encryption function
function encryptData(data) {
  const cipher = crypto.createCipher("aes-256-cbc", process.env.ENCRIPTION_KEY);
  let encrypted = cipher.update(data, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

// Decryption function
function decryptData(encryptedData) {
  const decipher = crypto.createDecipher(
    "aes-256-cbc",
    process.env.ENCRIPTION_KEY
  );
  let decrypted = decipher.update(encryptedData, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

module.exports = {
  encryptData,
  decryptData,
};
