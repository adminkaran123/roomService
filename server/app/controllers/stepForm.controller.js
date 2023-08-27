const db = require("../models");
const StepForm = db.stepForm;
const { ObjectId } = require("mongodb");

exports.createForm = (req, res) => {
  const stepForm = new StepForm({
    name: req.body.name,
    user_id: req.userId,
    formData: req.body.formData,
    themeSetting: req.body.themeSetting,
    endScreen: req.body.endScreen,
    status: req.body.status,
    updated_at: Date.now(),
  });

  stepForm.save((err) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
  });
  res.status(200).send({ message: "Form Create Successfully!" });
};

exports.upadteForm = async (req, res) => {
  console.log("req", req.portal_id);
  StepForm.updateOne(
    { _id: ObjectId(req.body._id) },
    {
      $set: {
        name: req.body.name,
        formData: req.body.formData,
        themeSetting: req.body.themeSetting,
        endScreen: req.body.endScreen,
        status: req.body.status,
        updated_at: Date.now(),
      },
    },
    function (err, doc) {
      console.log("err", err, doc);
      res.status(200).send({ message: "Form updated Successfully!" });
    }
  );
};

exports.getForms = (req, res) => {
  StepForm.find({ user_id: req.userId })
    .select("name")
    .sort({ update_at: 1 })
    .exec(function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        res
          .status(200)
          .send({ message: "Forms Fetched", data: docs.reverse() });
      }
    });
};

exports.getFormById = (req, res) => {
  StepForm.findOne({
    _id: ObjectId(req.params.id),
  }).exec(function (err, form) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send({ message: "Form Fetched", data: form });
    }
  });
};

exports.deleteFormById = (req, res) => {
  StepForm.deleteOne({
    _id: ObjectId(req.params.id),
  }).exec(function (err) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send({ message: "Form Deleted" });
    }
  });
};
