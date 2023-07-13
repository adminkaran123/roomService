const mongoose = require("mongoose");

const Portal = mongoose.model(
  "Portal",
  new mongoose.Schema({
    name: String,
    hs_access_token: String,
    portalid: String,
    updated_at: String,
    expires_in: String,
  })
);

module.exports = Portal;
