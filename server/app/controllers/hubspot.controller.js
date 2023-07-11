const _ = require("lodash");
const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
const hubspot = require("@hubspot/api-client");
const axios = require("axios");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const OBJECTS_LIMIT = 30;
const CLIENT_ID = process.env.HUBSPOT_CLIENT_ID;
const CLIENT_SECRET = process.env.HUBSPOT_CLIENT_SECRET;
const SCOPES =
  "crm.objects.contacts.read%20crm.objects.contacts.write%20crm.schemas.contacts.read";

const REDIRECT_URI = `http://localhost:5173/set-password`;
const GRANT_TYPES = {
  AUTHORIZATION_CODE: "authorization_code",
  REFRESH_TOKEN: "refresh_token",
};
let tokenStore = {};

const isAuthorized = () => {
  return !_.isEmpty(tokenStore.refreshToken);
};

const isTokenExpired = () => {
  return Date.now() >= tokenStore.updatedAt + tokenStore.expiresIn * 1000;
};

const getHubspotUserInfo = async (accessToken) => {
  try {
    const { data } = await axios.get(
      "https://api.hubapi.com/oauth/v1/access-tokens/" + accessToken
    );
    console.log("getHubspotUserInfo", data);
    return data;
  } catch (err) {}
};

const createHsUser = async (userInfo) => {
  try {
    const { data } = await axios.post("/api/auth/signup", userInfo);
  } catch (err) {}
};
const logResponse = (message, data) => {
  console.log(message, JSON.stringify(data, null, 1));
};

const handleError = (e, res) => {
  if (_.isEqual(e.message, "HTTP request failed")) {
    const errorMessage = JSON.stringify(e, null, 2);
    console.error(errorMessage);
    return res.redirect(`/error?msg=${errorMessage}`);
  }

  console.error(e);
  res.redirect(
    `/error?msg=${JSON.stringify(e, Object.getOwnPropertyNames(e), 2)}`
  );
};

const refreshToken = async () => {
  const result = await hubspotClient.oauth.tokensApi.createToken(
    GRANT_TYPES.REFRESH_TOKEN,
    undefined,
    undefined,
    CLIENT_ID,
    CLIENT_SECRET,
    tokenStore.refreshToken
  );
  tokenStore = result;
  tokenStore.updatedAt = Date.now();
  console.log("Updated tokens", tokenStore);

  hubspotClient.setAccessToken(tokenStore.accessToken);
};

exports.hubspotOauth = (req, res) => {
  const hubspotClient = new hubspot.Client();
  // Use the client to get authorization Url
  // https://www.npmjs.com/package/@hubspot/api-client#obtain-your-authorization-url
  console.log("Creating authorization Url");
  const authorizationUrl = hubspotClient.oauth.getAuthorizationUrl(
    CLIENT_ID,
    REDIRECT_URI,
    SCOPES
  );

  const authURl = `https://app.hubspot.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=crm.objects.contacts.read%20crm.objects.contacts.write%20crm.schemas.contacts.read`;

  console.log("Authorization Url", authURl);

  res.redirect(authURl);
};

exports.hubspotOauthCallback = async (req, res) => {
  const code = _.get(req, "query.code");
  const hubspotClient = new hubspot.Client();

  // Create OAuth 2.0 Access Token and Refresh Tokens
  // POST /oauth/v1/token
  // https://developers.hubspot.com/docs/api/working-with-oauth

  const getTokensResponse = await hubspotClient.oauth.tokensApi.create(
    GRANT_TYPES.AUTHORIZATION_CODE,
    code,
    REDIRECT_URI,
    CLIENT_ID,
    CLIENT_SECRET
  );
  logResponse("Retrieving access token result:", getTokensResponse);

  tokenStore = getTokensResponse;
  tokenStore.updatedAt = Date.now();

  // Set token for the
  // https://www.npmjs.com/package/@hubspot/api-client
  const userInfo = await getHubspotUserInfo(tokenStore.accessToken);
  hubspotClient.setAccessToken(tokenStore.accessToken);

  res.send({
    refresh_token: getTokensResponse.refreshToken,
    hs_access_token: getTokensResponse.accessToken,
    email: userInfo.user,
    portalid: userInfo.hub_id,
    updated_at: Date.now(),
  });
  //res.redirect("/");
};

// https://api.hubapi.com/oauth/v1/access-tokens/CL_l5daTMRIIAAEAQAAAASAYtKPiCiDspN8BKJu4cjIUkpLvZp9GLOzI0Q_gXbA5OBDYeTs6MAAAAEEAAAAAAAAAAAAAAAAAgAAAAAAAAAAAACAAAAAAAOARAAAAAABAAAAAAAAQAkIUcJUDbS3GZmREcsJlPfBIMwaCLiZKA25hMVIAWgA
