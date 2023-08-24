const db = require("../models");
const { createJWTToken, refreshToken } = require("../helpers/functions");
const { transporter } = require("../helpers/email");
const crypto = require("crypto");

const Stripe = require("./stripe.controller");
const User = db.user;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  const newUser = new User({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    username: req.body.username,
    isVerifed: 0,
  });

  //add user as stripe customer
  const customer = await Stripe.addNewCustomer(req.body.email);
  newUser.stripe_id = customer.id;
  const emailOtp = Math.floor(1000 + Math.random() * 9000);
  newUser.otp = emailOtp;
  //add user if not exists
  newUser.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    var mailOptions = {
      from: '"FormMaker" <' + process.env.EMAIL + ">", // sender address
      to: user.email, // list of receivers
      subject: "Welcome!",
      template: "welcome.email",
      context: {
        name: user.username,
        otp: emailOtp,
      },
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        res.status(500).send({ message: error });
      }
    });

    res.status(200).send({
      message: "Please verfiy your email address!",
    });
  });
};

exports.verifyOtp = async (req, res) => {
  User.findOne({
    email: req.body.email,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    if (user.otp === req.body.otp) {
      user.isVerifed = 1;
      user.save((err) => {
        if (err) {
          res.status(500).send({ message: err });
        }
        const token = createJWTToken(req, user);

        res.status(200).send({
          id: user._id,
          email: user.email,
          token: token,
        });
      });
    } else {
      res.status(401).send({ message: "Invalid Otp" });
    }
  });
};

exports.resendOtp = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).exec();

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    const emailOtp = Math.floor(1000 + Math.random() * 9000);
    user.otp = emailOtp;

    await user.save();

    const mailOptions = {
      from: '"FormMaker" <' + process.env.EMAIL + ">",
      to: user.email,
      subject: "Verify Otp!",
      template: "verify_email",
      context: {
        name: user.username,
        otp: emailOtp,
      },
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return res.status(500).send({ message: error });
        console.log("error", info);
      }
      res.status(200).send({
        message: "Otp sent to your email address!",
      });
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.signin = async (req, res) => {
  User.findOne({
    email: req.body.email,
  }).exec(async (err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid Password!" });
    }

    if (!user.isVerifed) {
      return res
        .status(200)
        .send({ message: "email is not verified", isVerifed: false });
    }

    let tokenResponse;

    if (user.refreshToken) {
      tokenResponse = await refreshToken(user.refreshToken);
    }

    const token = createJWTToken(req, user, tokenResponse?.accessToken);

    res.status(200).send({
      id: user._id,
      email: user.email,
      token: token,
      portal_id: user.portal_id,
      hs_access_token: tokenResponse?.accessToken,
      isVerifed: true,
    });
  });
};

exports.forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a reset token
    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetToken = resetToken;
    user.resetTokenExpiration = Date.now() + 3600000; // Token expires in 1 hour

    await user.save();

    //reset_link
    const reset_link = process.env.APP_URL + "/app/reset?token=" + resetToken;

    const mailOptions = {
      from: '"FormMaker" <' + process.env.EMAIL + ">",
      to: user.email,
      subject: "Reset your password!",
      template: "reset",
      context: {
        name: user.username,
        reset_link: reset_link,
      },
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return res.status(500).send({ message: error });
      }
      res.status(200).json({ message: "Password reset email sent" });
    });
  } catch (err) {
    console.error("Error sending reset email:", err);
    res.status(500).json({ message: "An error occurred" });
  }
};

exports.resetPassowrd = async (req, res) => {
  try {
    const { token, password } = req.body;

    // Find the user with the provided token and within the expiration time
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Update the password and reset token fields
    user.password = bcrypt.hashSync(password, 8);
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;

    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Error updating password:", err);
    res.status(500).json({ message: "An error occurred" });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { old_password, password } = req.body;

    // Find the user with the provided token and within the expiration time
    const user = await User.findOne({
      email: req.emai,
    });

    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

    var passwordIsValid = bcrypt.compareSync(old_password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid Password!" });
    }

    // Update the password and reset token fields
    user.password = bcrypt.hashSync(password, 8);

    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Error updating password:", err);
    res.status(500).json({ message: "An error occurred" });
  }
};
