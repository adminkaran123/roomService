const _ = require("lodash");
const db = require("../models");
const User = db.user;
const Role = db.role;
const Submission = db.submission;
const hubspot = require("@hubspot/api-client");
const fs = require("fs");
const path = require("path");
var request = require("request");
var unirest = require("unirest");
const axios = require("axios");
const Image = db.image;
const { ObjectId } = require("mongodb");
const Stripe = require("./stripe.controller");

const {
  isTokenExpired,
  refreshToken,
  createJWTToken,
} = require("../helpers/functions");

var jwt = require("jsonwebtoken");

const CLIENT_ID = process.env.HUBSPOT_CLIENT_ID;
const CLIENT_SECRET = process.env.HUBSPOT_CLIENT_SECRET;
const SCOPES =
  "&scope=files%20crm.objects.contacts.read%20crm.objects.contacts.write%20crm.schemas.contacts.read";

const REDIRECT_URI = process.env.APP_URL + `/app`;
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

const getTokenInfo = async (token) => {
  try {
    const response = await axios(
      "https://api.hubapi.com/oauth/v1/access-tokens/" + token
    );
    return response.data;
  } catch (err) {}
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

    const tokenInfo = await getTokenInfo(getTokensResponse.accessToken);

    hubspotClient.setAccessToken(tokenStore.accessToken);
    User.findOne({
      portal_id: tokenInfo.hub_id,
    }).exec(async (err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!user) {
        //write add user code here
        const newUser = new User({
          portal_id: tokenInfo.hub_id,
          refreshToken: getTokensResponse.refreshToken,
          updates_at: Date.now(),
          email: tokenInfo.user,
          username: tokenInfo.hub_domain,
        });

        //add user as stripe customer
        const customer = await Stripe.addNewCustomer();
        newUser.stripe_id = customer.id;
        newUser.save((err, user) => {
          if (err) {
            res.status(500).send({ message: err });
          }
          const token = createJWTToken(req, user);

          res.status(200).send({
            id: user._id,
            email: user.email,
            username: user.username,
            token: token,
            portal_id: user.portal_id,
            stripe_id: user.stripe_id,
          });
        });
      } else {
        //update user
        user.refreshToken = getTokensResponse.refreshToken;
        user.updated_at = Date.now();
        user.save((err, user) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          const token = createJWTToken(req, user);
          res.status(200).send({
            id: user._id,
            email: user.email,
            username: user.username,
            token: token,
            portal_id: user.portal_id,
            stripe_id: user.stripe_id,
          });
        });
      }
    });
  } catch (err) {}

  //res.redirect("/");
};

exports.getHsObjectProperties = async (req, res) => {
  const objectType = _.get(req, "query.object_type") || "0-1";
  const hsToken = req.headers.hs_authorization;
  try {
    //res.status(200).send({ message: "working" });
    User.findById(req.userId).exec(async (err, user) => {
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
  const uploadedFile = req.file;

  if (!uploadedFile) {
    return res.status(400).send("No file uploaded.");
  }

  const filePath = `images/${uploadedFile.filename}`;

  try {
    //res.status(200).send({ message: "working" });

    User.findById(req.userId).exec(async (err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        let tokenResponse = await refreshToken(
          user.refreshToken,
          user.updated_at
        );

        if (tokenResponse.isUpdated) {
          const file_options = {
            access: "PUBLIC_INDEXABLE",
            overwrite: false,
            duplicateValidationStrategy: "NONE",
            duplicateValidationScope: "EXACT_FOLDER",
          };
          user.updated_at = Date.now();
          user.save(async (err) => {
            if (err) {
              res.status(500).send({ message: err });

              return;
            }
            try {
              unirest
                .post("https://api.hubapi.com/files/v3/files")
                .headers({
                  Authorization: "Bearer " + tokenResponse.accessToken,
                  "Content-Type": "multipart/form-data",
                })
                .query({
                  overwrite: "true", // if you want to overwrite the file when it already exists
                  hidden: "false", // if you want the file to be visible in the File Manager
                })
                .field("folderPath", "/formmaker") // if you need to change the upload directory
                .field("options", JSON.stringify(file_options)) // if you need to change the upload directory
                .attach("file", fs.createReadStream(filePath)) // Attachment
                .end(function (response) {
                  const imageData = new Image({
                    url: response.body.url,
                    user_id: req.userId,
                  });

                  imageData.save(async (err) => {
                    if (err) {
                      res.status(500).send({ message: err });
                      return;
                    }
                    const readStream = fs.createReadStream(filePath, "utf-8");
                    let fileContent = "";

                    readStream.on("data", (chunk) => {
                      fileContent += chunk;
                    });
                    readStream.on("end", () => {
                      // Delete the file after reading its content
                      fs.unlink(filePath, (unlinkError) => {
                        if (unlinkError) {
                          console.error(
                            "Error deleting the file:",
                            unlinkError
                          );
                        } else {
                          console.log("File deleted successfully.");
                          res.send("image uploaded");
                        }
                      });
                    });

                    readStream.on("error", (err) => {
                      console.error("Error reading the file:", err);
                      res
                        .status(500)
                        .send("An error occurred while reading the file.");
                    });
                  });
                });
            } catch (e) {
              console.log(e);
              res.send(e);
            }
          });
        } else {
          //todo
        }
      } else {
        res.status(200).send({ result: "user not found" });
      }
    });
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

//Create and update Contact
exports.createContact = async (req, res) => {
  const properties = req.body.properties;
  const contact = {
    properties: properties,
  };
  const formId = req.body.form_id;
  const user_id = req.body.user_id;
  const contact_id = req.body.contact_id;

  try {
    //res.status(200).send({ message: "working" });

    User.findById(user_id).exec(async (err, user) => {
      if (err) {
        res.status(500).send({ message: err });
      }

      if (user) {
        let tokenResponse = await refreshToken(
          user.refreshToken,
          user.updated_at
        );

        if (tokenResponse.isUpdated) {
          user.updated_at = Date.now();
          user.save(async (err) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            try {
              hubspotClient.setAccessToken(tokenResponse.accessToken);

              //check if proerites object email key already exist

              //check if contact already exist witm email in HubSpot portal update then otherwiae create
              if (properties.email) {
                const config = {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${tokenResponse.accessToken}`,
                  },
                };
                try {
                  const contactResponse = await axios(
                    "https://api.hubapi.com/contacts/v1/contact/email/" +
                      properties.email +
                      "/profile?property=vid&propertyMode=value_only&formSubmissionMode=none&showListMemberships=false",
                    config
                  );

                  if (contactResponse?.data?.vid) {
                    //update Conatact if already exist
                    const updateContactResponse =
                      await hubspotClient.crm.contacts.basicApi.update(
                        contactResponse.data.vid,
                        contact
                      );

                    // Update or create an entry in the submission table
                    const submission = new Submission({
                      updated_at: Date.now(),
                      form: formId,
                      contact_id: updateContactResponse.id,
                      user_id: user_id,
                    });

                    submission.save(async (err) => {
                      if (err) {
                        res.status(500).send({ message: err });
                        return;
                      }

                      res.send({
                        message: "contact updated",
                        data: updateContactResponse.id,
                      });
                    });
                  }
                } catch (err) {
                  //check if error is 404 then create new contact
                  if (err?.response?.status === 404) {
                    //create new contact
                    if (contact_id) {
                      //update Conatact if already exist
                      const updateContactResponse =
                        await hubspotClient.crm.contacts.basicApi.update(
                          contact_id,
                          contact
                        );

                      // Update or create an entry in the submission table
                      const submission = new Submission({
                        updated_at: Date.now(),
                        form: formId,
                        contact_id: updateContactResponse.id,
                        user_id: user_id,
                      });

                      submission.save(async (err) => {
                        if (err) {
                          res.status(500).send({ message: err });
                          return;
                        }

                        res.send({
                          message: "contact updated",
                          data: updateContactResponse.id,
                        });
                      });
                    } else {
                      //create new contact
                      const createContactResponse =
                        await hubspotClient.crm.contacts.basicApi.create(
                          contact
                        );

                      // Update or create an entry in the submission table
                      const submission = new Submission({
                        updated_at: Date.now(),
                        form: formId,
                        contact_id: createContactResponse.id,
                        user_id: user_id,
                      });

                      submission.save(async (err) => {
                        if (err) {
                          res.status(500).send({ message: err });
                          return;
                        }

                        res.send({
                          message: "contact created",
                          data: createContactResponse.id,
                        });
                      });
                    }
                  }
                }
              } else if (contact_id) {
                //update Conatact if already exist
                const updateContactResponse =
                  await hubspotClient.crm.contacts.basicApi.update(
                    contact_id,
                    contact
                  );
                // Update or create an entry in the submission table
                const submission = new Submission({
                  updated_at: Date.now(),
                  form: formId,
                  contact_id: updateContactResponse.id,
                  user_id: user_id,
                });

                submission.save(async (err) => {
                  if (err) {
                    res.status(500).send({ message: err });
                    return;
                  }

                  res.send({
                    message: "contact updated",
                    data: updateContactResponse.id,
                  });
                });
              } else {
                //create new contact
                const createContactResponse =
                  await hubspotClient.crm.contacts.basicApi.create(contact);
                // Update or create an entry in the submission table
                const submission = new Submission({
                  updated_at: Date.now(),
                  form: formId,
                  contact_id: createContactResponse.id,
                  user_id: user_id,
                });

                submission.save(async (err) => {
                  if (err) {
                    res.status(500).send({ message: err });
                    return;
                  }

                  res.send({
                    message: "contact created",
                    data: createContactResponse.id,
                  });
                });
              }
            } catch (err) {
              console.log(err);
              res.status(500).send({ message: err });
            }
          });
        } else {
          //todo
        }
      } else {
        res.status(200).send({ result: "user not found" });
      }
    });
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

//upload images to hs without token
exports.uploadImagetoHsNoToken = async (req, res) => {
  const uploadedFile = req.file;

  if (!uploadedFile) {
    return res.status(400).send("No file uploaded.");
  }

  const filePath = `images/${uploadedFile.filename}`;

  try {
    //res.status(200).send({ message: "working" });

    User.findById(req.body.user_id).exec(async (err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        let tokenResponse = await refreshToken(
          user.refreshToken,
          user.updated_at
        );

        if (tokenResponse.isUpdated) {
          const file_options = {
            access: "PUBLIC_INDEXABLE",
            overwrite: false,
            duplicateValidationStrategy: "NONE",
            duplicateValidationScope: "EXACT_FOLDER",
          };
          user.updated_at = Date.now();
          user.save(async (err) => {
            if (err) {
              res.status(500).send({ message: err });

              return;
            }
            try {
              unirest
                .post("https://api.hubapi.com/files/v3/files")
                .headers({
                  Authorization: "Bearer " + tokenResponse.accessToken,
                  "Content-Type": "multipart/form-data",
                })
                .query({
                  overwrite: "true", // if you want to overwrite the file when it already exists
                  hidden: "false", // if you want the file to be visible in the File Manager
                })
                .field("folderPath", "/formmaker") // if you need to change the upload directory
                .field("options", JSON.stringify(file_options)) // if you need to change the upload directory
                .attach("file", fs.createReadStream(filePath)) // Attachment
                .end(function (response) {
                  const readStream = fs.createReadStream(filePath, "utf-8");
                  let fileContent = "";

                  readStream.on("data", (chunk) => {
                    fileContent += chunk;
                  });
                  readStream.on("end", () => {
                    // Delete the file after reading its content
                    fs.unlink(filePath, (unlinkError) => {
                      if (unlinkError) {
                        console.error("Error deleting the file:", unlinkError);
                      } else {
                        res.send({
                          message: "image uploaded",
                          url: response.body.url,
                        });
                      }
                    });
                  });

                  readStream.on("error", (err) => {
                    console.error("Error reading the file:", err);
                    res
                      .status(500)
                      .send("An error occurred while reading the file.");
                  });
                });
            } catch (e) {
              console.log(e);
              res.send(e);
            }
          });
        } else {
          //todo
        }
      } else {
        res.status(200).send({ result: "user not found" });
      }
    });
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

exports.deleteImageFromId = (req, res) => {
  Image.deleteOne({
    _id: ObjectId(req.params.id),
  }).exec(function (err) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send({ message: "Image Deleted" });
    }
  });
};
