const { authJwt } = require("../middlewares");
const controller = require("../controllers/hubspot.controller");
const ImageController = require("../controllers/image.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.get("/api/oauth", controller.hubspotOauth);
  app.get(
    "/api/oauth-callback",
    [authJwt.verifyToken],
    controller.hubspotOauthCallback
  );
  app.get(
    "/api/properties",
    [authJwt.verifyToken],
    controller.getHsObjectProperties
  );
  app.post(
    "/api/upload-image-to-hs",
    [authJwt.verifyToken],
    ImageController.upload.single("image"),
    controller.uploadImagetoHs
  );

  app.post("/api/create-contact", controller.createContact);
};
