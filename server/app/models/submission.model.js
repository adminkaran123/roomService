const mongoose = require("mongoose");

const Submission = mongoose.model(
  "Submission",
  new mongoose.Schema({
    updated_at: String,
    contact_id: String,
    user_id: String,
    form: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StepForm",
    },
  })
);

module.exports = Submission;
