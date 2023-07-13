const mongoose = require("mongoose");

const Portal = mongoose.model(
  "Portal",
  new mongoose.Schema({
    name: String,
    portal_id: String,
    refresh_token: String,
    updated_at: String,
    useremail: String,
  })
);

module.exports = Portal;
