const { authJwt } = require("../middlewares");
const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
    ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);
  app.post("/api/auth/verify-otp", controller.verifyOtp);
  app.post("/api/auth/resend-otp", controller.resendOtp);
  app.post("/api/auth/forgot-password", controller.forgetPassword);
  app.post("/api/auth/reset-password", controller.resetPassowrd);
  app.get("/api/auth/get-profile", [authJwt.verifyToken], controller.getUser);
  app.get("/api/users", [authJwt.verifyToken], controller.getUsers);
  app.post(
    "/api/auth/change-password",
    [authJwt.verifyToken],
    controller.changePassword
  );

  //app.post("/api/auth/checkuser", controller.checkUserAndAddPortal);
  //app.post("/api/auth/email", controller.forgetPassword);
};
