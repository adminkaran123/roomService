const { authJwt } = require("../middlewares");
const controller = require("../controllers/stepForm.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.post(
    "/api/step-form/create",
    [authJwt.verifyToken],
    controller.createForm
  );
  app.get("/api/step-form/forms", [authJwt.verifyToken], controller.getForms);
};
