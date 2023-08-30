const mongoose = require("mongoose");

const StepForm = mongoose.model(
  "StepForm",
  new mongoose.Schema({
    name: String,
    user_id: String,
    formData: String,
    themeSetting: String,
    endScreen: String,
    status: String,
    updated_at: String,
    logicData: String,
  })
);

module.exports = StepForm;
