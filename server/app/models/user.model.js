const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    email: String,
    password: String,
    refresh_token: String,
    hs_access_token: String,
    portalid: String,
    updated_at: String,
    expires_in: String,
    active_portal_id: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
  })
);

module.exports = User;
