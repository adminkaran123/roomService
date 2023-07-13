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
  "scope=crm.objects.contacts.read%20crm.objects.contacts.write%20crm.schemas.custom.read%20crm.schemas.contacts.read";

const REDIRECT_URI = `http://localhost:5173/set-password`;
const GRANT_TYPES = {
  AUTHORIZATION_CODE: "authorization_code",
  REFRESH_TOKEN: "refresh_token",
};

const hubspotClient = new hubspot.Client();

const getFullName = (contactProperties) => {
  const firstName = _.get(contactProperties, "firstname") || "";
  const lastName = _.get(contactProperties, "lastname") || "";
  return `${firstName} ${lastName}`;
};

const prepareContactsContent = (contacts) => {
  return _.map(contacts, (contact) => {
    const companyName = _.get(contact, "properties.company") || "";
    const name = getFullName(contact.properties);
    return { id: contact.id, name, companyName };
  });
};

const isTokenExpired = (updatedAt, expiresIn) => {
  return Date.now() >= Number(updatedAt) + Number(expiresIn) * 1000;
};

const getHubspotUserInfo = async (accessToken) => {
  try {
    const { data } = await axios.get(
      "https://api.hubapi.com/oauth/v1/access-tokens/" + accessToken
    );

    return data;
  } catch (err) {}
};

const refreshToken = async (user) => {
  return new Promise((resolve, reject) => {
    if (isTokenExpired(user.updated_at, user.expires_in)) {
      hubspotClient.oauth.tokensApi
        .create(
          "refresh_token",
          undefined,
          undefined,
          CLIENT_ID,
          CLIENT_SECRET,
          user.refresh_token
        )
        .then((results) => {
          resolve(results); // Resolve the Promise with the result
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
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
  try {
    //res.status(200).send({ message: "working" });

    User.findById(req.userId).exec(async (err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        let token = await refreshToken(user);
        console.log("tokenmoken", token);
        res.status(200).send({
          token: isTokenExpired(user.updated_at, user.expires_in),
          up: user.updated_at,
          ex: user.expires_in,
          rf: token,
        });

        // let hsAccessToken = user.hs_access_token;
        // if (isTokenExpired(user.updated_at, user.expires_in)) {
        //   console.log("comes here");
        //   hsAccessToken = await refreshToken(user.refresh_token);
        // }
        // hubspotClient.setAccessToken(hsAccessToken);

        // const objectType = "0-1";
        // const contactsResponse =
        //   await hubspotClient.crm.schemas.coreApi.getById(objectType);

        // res.status(200).send({
        //   contacts: contactsResponse.properties,
        // });
        //res.status(200).send({ result: hsAccessToken });
      } else {
        res.status(200).send({ result: "user not found" });
      }
    });
  } catch (err) {
    res.status(500).send({ message: err });
  }
};
