const _ = require("lodash");
const db = require("../models");
const User = db.user;
const Role = db.role;
const hubspot = require("@hubspot/api-client");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const {
  isTokenExpired,
  refreshToken,
  createJWTToken,
} = require("../helpers/functions");

var jwt = require("jsonwebtoken");

const CLIENT_ID = process.env.HUBSPOT_CLIENT_ID;
const CLIENT_SECRET = process.env.HUBSPOT_CLIENT_SECRET;
const SCOPES =
  "scope=crm.objects.contacts.read%20crm.objects.contacts.write%20crm.schemas.custom.read%20crm.schemas.contacts.read";

//const REDIRECT_URI = `https://formmaker.co.in/app/set-password`;
const REDIRECT_URI = `http://localhost:5173/app/set-password`;
const GRANT_TYPES = {
  AUTHORIZATION_CODE: "authorization_code",
  REFRESH_TOKEN: "refresh_token",
};

const hubspotClient = new hubspot.Client();

exports.hubspotOauth = (req, res) => {
  // Use the client to get authorization Url
  // https://www.npmjs.com/package/@hubspot/api-client#obtain-your-authorization-url
  const authorizationUrl = hubspotClient.oauth.getAuthorizationUrl(
    CLIENT_ID,
    REDIRECT_URI,
    SCOPES
  );

  //https://app.hubspot.com/oauth/authorize?client_id=9c3ce827-82a1-4831-81a9-cb2bd9341024&redirect_uri=https://formmaker.co.in/app/set-password&scope=forms%20files%20forms-uploaded-files%20crm.objects.contacts.read%20crm.objects.contacts.write%20crm.schemas.custom.read%20crm.schemas.contacts.read

  const authURl = `https://app.hubspot.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=forms%20files%20forms-uploaded-files%20crm.objects.contacts.read%20crm.objects.contacts.write%20crm.schemas.custom.read%20crm.schemas.contacts.read`;

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

    hubspotClient.setAccessToken(tokenStore.accessToken);

    User.findOne({
      email: req.email,
    }).exec(async (err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      user.refreshToken = getTokensResponse.refreshToken;
      user.updated_at = Date.now();
      user.save((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        res.status(200).send({
          message: "Hubspot Portal Added",
          hs_access_token: getTokensResponse.accessToken,
        });
      });
    });
  } catch (err) {
    res.status(500).send({ message: err });
  }
  //res.redirect("/");
};

exports.getHsObjectProperties = async (req, res) => {
  const objectType = _.get(req, "query.object_type") || "0-1";
  const hsToken = req.headers.hs_authorization;
  try {
    //res.status(200).send({ message: "working" });

    User.findOne({ email: req.email }).exec(async (err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        let tokenResponse = await refreshToken(
          user.refreshToken,
          user.updated_at
        );

        let jwttoken;

        if (tokenResponse.isUpdated) {
          jwttoken = createJWTToken(req, undefined);
          user.updated_at = Date.now();
          user.save(async (err) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            try {
              hubspotClient.setAccessToken(tokenResponse.accessToken);

              const contactsResponse =
                await hubspotClient.crm.schemas.coreApi.getById(objectType);

              res.status(200).send({
                data: contactsResponse.properties,
                hs_access_token: tokenResponse.accessToken,
              });
            } catch (err) {
              res.status(500).send({ message: err });
            }
          });
        } else {
          try {
            hubspotClient.setAccessToken(tokenResponse.accessToken);
            const contactsResponse =
              await hubspotClient.crm.schemas.coreApi.getById(objectType);

            res.status(200).send({
              data: contactsResponse.properties,
            });
          } catch (err) {
            res.status(500).send({ message: err });
          }
        }
      } else {
        res.status(200).send({ result: "user not found" });
      }
    });
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

//upload images to hs portal
exports.uploadImagetoHs = async (req, res) => {
  // const objectType = _.get(req, "query.object_type") || "0-1";
  // const hsToken = req.headers.hs_authorization;
  // try {
  //   //res.status(200).send({ message: "working" });
  //   U.findOne({ portal_id: req.portal_id }).exec(async (err, portal) => {
  //     if (err) {
  //       res.status(500).send({ message: err });
  //       return;
  //     }
  //     if (portal) {
  //       let tokenResponse = await refreshToken(portal, hsToken);
  //       let jwttoken;
  //       if (tokenResponse.isUpdated) {
  //         jwttoken = createJWTToken(req, undefined);
  //         portal.updated_at = Date.now();
  //         portal.save(async (err) => {
  //           if (err) {
  //             res.status(500).send({ message: err });
  //             return;
  //           }
  //           try {
  //             hubspotClient.setAccessToken(tokenResponse.accessToken);
  //             const formData = new FormData();
  //             const options = {
  //               // some options
  //             };
  //             var filename = path.join(
  //               __dirname,
  //               "../../images/1690613957158--banner_image.jpg"
  //             );
  //             formData.append("folderPath", "/");
  //             formData.append("options", JSON.stringify(options));
  //             formData.append("file", fs.createReadStream(filename));
  //             const response = await hubspotClient.apiRequest({
  //               method: "POST",
  //               path: "/filemanager/api/v3/files/upload",
  //               body: formData,
  //               defaultJson: false,
  //             });
  //             res.status(200).send({
  //               data: response,
  //               token: jwttoken,
  //             });
  //           } catch (err) {
  //             res.status(500).send({ message: err });
  //           }
  //         });
  //       } else {
  //         try {
  //           hubspotClient.setAccessToken(tokenResponse.accessToken);
  //           const contactsResponse =
  //             await hubspotClient.crm.schemas.coreApi.getById(objectType);
  //           res.status(200).send({
  //             data: contactsResponse.properties,
  //             token: jwttoken,
  //           });
  //         } catch (err) {
  //           res.status(500).send({ message: err });
  //         }
  //       }
  //     } else {
  //       res.status(200).send({ result: "user not found" });
  //     }
  //   });
  // } catch (err) {
  //   res.status(500).send({ message: err });
  // }
};

exports.testUploadFile = async (req, res) => {
  // var postUrl = "https://api.hubapi.com/filemanager/api/v3/files/upload";
  // var filename = path.join(
  //   __dirname,
  //   "/images/1690613957158--banner_image.jpg"
  // );
  // var fileOptions = {
  //   access: "PUBLIC_INDEXABLE",
  //   ttl: "P3M",
  //   overwrite: false,
  //   duplicateValidationStrategy: "NONE",
  //   duplicateValidationScope: "ENTIRE_PORTAL",
  // };
  // var formData = {
  //   file: fs.createReadStream(filename),
  //   options: JSON.stringify(fileOptions),
  //   folderPath: "docs",
  // };
  // request.post(
  //   {
  //     url: postUrl,
  //     formData: formData,
  //   },
  //   function optionalCallback(err, httpResponse, body) {
  //     return console.log(err, httpResponse.statusCode, body);
  //   }
  // );
};
