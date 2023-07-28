const { authJwt } = require("../middlewares");
const controller = require("../controllers/image.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.post(
    "/api/upload-image",
    [authJwt.verifyToken],
    controller.upload.single("image"),
    controller.uploadImage
  );
};
