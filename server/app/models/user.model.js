const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    email: String,
    password: String,
    portal_id: String,
    stripe_id: String,
    stripe_account_id: String,
    username: String,
    isVerifed: Boolean,
    otp: String,
    updated_at: String,
    refreshToken: String,
    updated_at: String,
    resetToken: String,
    resetTokenExpiration: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
  })
);

module.exports = User;
