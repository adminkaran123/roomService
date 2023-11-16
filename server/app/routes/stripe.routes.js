const { authJwt } = require("../middlewares");
const controller = require("../controllers/stripe.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.post("/api/buy", [authJwt.verifyToken], controller.createSession);
  app.post("/api/onboard", [authJwt.verifyToken], controller.onBoardUser);
  app.get(
    "/api/stripe-prooducts",
    [authJwt.verifyToken],
    controller.getUserProducts
  );
  app.get(
    "/api/stripe-subscription",
    [authJwt.verifyToken],
    controller.getUserSubscription
  );
  app.post(
    "/api/onboard-save",
    [authJwt.verifyToken],
    controller.addOnBoardUsertoDB
  );

  app.post(
    "/api/stripe-delete",
    [authJwt.verifyToken],
    controller.deleteAllAccount
  );
};
