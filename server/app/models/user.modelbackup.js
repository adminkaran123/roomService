const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    email: String,
    password: String,
    portal_id: String,
    stripe_id: String,
    stripe_account_id: String,
    otp: String,
    updated_at: String,
    refreshToken: String,
    resetToken: String,
    resetTokenExpiration: String,
    plan: String,
    hasTrial: Boolean,
    endDate: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
  })
);

module.exports = User;
