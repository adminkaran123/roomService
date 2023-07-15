const _ = require("lodash");
const db = require("../models");
const User = db.user;
const Role = db.role;
const Portal = db.portal;
const hubspot = require("@hubspot/api-client");
const axios = require("axios");
const {
  isTokenExpired,
  refreshToken,

  createJWTToken,
} = require("../helpers/functions");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const CLIENT_ID = process.env.HUBSPOT_CLIENT_ID;
const CLIENT_SECRET = process.env.HUBSPOT_CLIENT_SECRET;
const SCOPES =
  "scope=crm.objects.contacts.read%20crm.objects.contacts.write%20crm.schemas.custom.read%20crm.schemas.contacts.read";

const REDIRECT_URI = `http://localhost:5173/set-password`;
const GRANT_TYPES = {
  AUTHORIZATION_CODE: "authorization_code",
  REFRESH_TOKEN: "refresh_token",
};

const hubspotClient = new hubspot.Client();

const getHubspotUserInfo = async (accessToken) => {
  try {
    const { data } = await axios.get(
      "https://api.hubapi.com/oauth/v1/access-tokens/" + accessToken
    );

    return data;
  } catch (err) {}
};

exports.hubspotOauth = (req, res) => {
  // Use the client to get authorization Url
  // https://www.npmjs.com/package/@hubspot/api-client#obtain-your-authorization-url
  const authorizationUrl = hubspotClient.oauth.getAuthorizationUrl(
    CLIENT_ID,
    REDIRECT_URI,
    SCOPES
  );

  const authURl = `https://app.hubspot.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=crm.objects.contacts.read%20crm.objects.contacts.write%20crm.schemas.custom.read%20crm.schemas.contacts.read`;

  res.redirect(authURl);
};

exports.hubspotOauthCallback = async (req, res) => {
  const code = _.get(req, "query.code");
  const hubspotClient = new hubspot.Client();

  // Create OAuth 2.0 Access Token and Refresh Tokens
  // POST /oauth/v1/token
  // https://developers.hubspot.com/docs/api/working-with-oauth
  try {
    const getTokensResponse = await hubspotClient.oauth.tokensApi.create(
      GRANT_TYPES.AUTHORIZATION_CODE,
      code,
      REDIRECT_URI,
      CLIENT_ID,
      CLIENT_SECRET
    );
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
      portal_id: userInfo.hub_id,
      updated_at: Date.now(),
      expires_in: getTokensResponse.expiresIn,
      portal_name: userInfo.hub_domain,
    });
  } catch (err) {
    res.status(500).send({ message: err });
  }
  //res.redirect("/");
};

exports.getHsObjectProperties = async (req, res) => {
  const objectType = _.get(req, "query.object_type") || "0-1";
  try {
    //res.status(200).send({ message: "working" });

    Portal.findOne({ portal_id: req.portal_id }).exec(async (err, portal) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (portal) {
        let tokenResponse = await refreshToken(portal, req.hs_access_token);
        let jwttoken;
        if (tokenResponse.isUpdated) {
          jwttoken = createJWTToken(req, undefined, tokenResponse.token);
          portal.updated_at = Date.now();
          portal.save(async (err) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            hubspotClient.setAccessToken(tokenResponse.accessToken);

            const contactsResponse =
              await hubspotClient.crm.schemas.coreApi.getById(objectType);

            res.status(200).send({
              data: contactsResponse.properties,
              token: jwttoken,
            });
          });
        } else {
          hubspotClient.setAccessToken(tokenResponse.accessToken);

          const contactsResponse =
            await hubspotClient.crm.schemas.coreApi.getById(objectType);

          res.status(200).send({
            data: contactsResponse.properties,
            token: jwttoken,
          });
        }
      } else {
        res.status(200).send({ result: "user not found" });
      }
    });
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

exports.getPortals = async (req, res) => {
  Portal.find({ useremail: req.email }, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log("First function call : ", docs);
      res.json(docs);
    }
  });
};
