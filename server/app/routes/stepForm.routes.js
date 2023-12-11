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

  app.patch(
    "/api/step-form/update",
    [authJwt.verifyToken],
    controller.upadteForm
  );
  app.get("/api/step-form/forms", [authJwt.verifyToken], controller.getForms);
  app.get(
    "/api/step-form/submissions",
    [authJwt.verifyToken],
    controller.getSubmissons
  );
  app.get("/api/step-form/:id", controller.getFormById);
  app.delete("/api/step-form/:id", controller.deleteFormById);
  app.delete("/api/submisson/:id", controller.deleteSubmissonById);
};
