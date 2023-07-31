const mongoose = require("mongoose");

const Image = mongoose.model(
  "Image",
  new mongoose.Schema({
    url: String,
    portal_id: String,
  })
);

module.exports = Image;
