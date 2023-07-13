const crypto = require("crypto");
require("dotenv").config();
// Encryption function

const algorithm = "aes-256-ctr";
const ENCRYPTION_KEY = process.env.ENCRIPTION_KEY;

function encryptData(text) {
  return text;
}

function decryptData(text) {
  return text;
}

module.exports = {
  encryptData,
  decryptData,
};
