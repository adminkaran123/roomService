const CryptoJS = require("crypto-js");
require("dotenv").config();
const hubspot = require("@hubspot/api-client");
const CLIENT_ID = process.env.HUBSPOT_CLIENT_ID;
const CLIENT_SECRET = process.env.HUBSPOT_CLIENT_SECRET;
const JWT_SECRET = process.env.JWT_SECRET;
var jwt = require("jsonwebtoken");
// Encryption function

const algorithm = "aes-256-ctr";
const ENCRYPTION_KEY = process.env.ENCRIPTION_KEY;

function encryptData(text) {
  return CryptoJS.AES.encrypt(text, ENCRYPTION_KEY);
}

function decryptData(text) {
  return CryptoJS.AES.decrypt(text, ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8);
}
const isTokenExpired = (updatedAt) => {
  return Date.now() >= Number(updatedAt) + Number(1800) * 1000;
};
const refreshToken = async (portal, token) => {
  const hubspotClient = new hubspot.Client();

  return new Promise((resolve, reject) => {
    let refreshToken = decryptData(portal.refresh_token, token);
    if (isTokenExpired(portal.updated_at)) {
      hubspotClient.oauth.tokensApi
        .create(
          "refresh_token",
          undefined,
          undefined,
          CLIENT_ID,
          CLIENT_SECRET,
          refreshToken
        )
        .then((results) => {
          resolve(results.accessToken); // Resolve the Promise with the result
          resolve({
            isUpdated: true,
            accessToken: token,
          });
        })
        .catch((err) => {
          reject(err);
        });
    } else {
      resolve({
        isUpdated: false,
        accessToken: token,
      });
    }
  });
};

function createJWTToken(req, user, hs_access_token) {
  const token = jwt.sign(
    {
      id: user?._id || req?.userId,
      portal_id: user?.active_portal_id || req?.portal_id,
      hs_access_token:
        req.body.hs_access_token || hs_access_token || req?.hs_access_token,
    },
    JWT_SECRET,
    {
      algorithm: "HS256",
      allowInsecureKeySizes: true,
      expiresIn: 86400, // 24 hours
    }
  );
  return token;
}

module.exports = {
  encryptData,
  decryptData,
  refreshToken,
  isTokenExpired,
  createJWTToken,
};
