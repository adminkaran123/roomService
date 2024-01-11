const mongoose = require("mongoose");

const Image = mongoose.model(
  "Tour",
  new mongoose.Schema({
    tour_data: String,
    user_id: String,
  })
);

module.exports = Image;
