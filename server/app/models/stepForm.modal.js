const mongoose = require("mongoose");

const StepForm = mongoose.model(
  "StepForm",
  new mongoose.Schema({
    name: String,
    formData: String,
    themeSetting: String,
    endScreen: String,
    status: String,
    updated_at: String,
    logicData: String,
    calulation: String,
    submitCount: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  })
);

module.exports = StepForm;
