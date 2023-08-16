const mongoose = require("mongoose");

const StepForm = mongoose.model(
  "StepForm",
  new mongoose.Schema({
    name: String,
    portal_id: String,
    formData: String,
    themeSetting: String,
    endScreen: String,
    status: String,
  })
);

module.exports = StepForm;
