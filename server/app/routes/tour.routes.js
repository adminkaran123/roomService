const { authJwt } = require("../middlewares");
const controller = require("../controllers/tour.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });
  app.post(
    "/api/create-upadte-tour",
    [authJwt.verifyToken],
    controller.createAndUpdateTour
  );
  app.get("/api/get-user-tour", [authJwt.verifyToken], controller.getUserTour);
};
