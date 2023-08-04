const db = require("../models");
const StepForm = db.stepForm;

exports.createForm = (req, res) => {
  const stepForm = new StepForm({
    name: req.body.name,
    portal_id: req.portal_id,
    formData: req.body.formData,
    themeSetting: req.body.formData,
  });

  stepForm.save((err) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
  });
  res.status(200).send({ message: "Form Create Successfully!" });
};

exports.upadteForm = (req, res) => {
  const stepForm = new StepForm({
    name: req.body.name,
    portal_id: req.portal_id,
    formData: req.body.formData,
    themeSetting: req.body.formData,
  });

  StepForm.findOne({
    _id: req.body._id,
  })
  .exec((err, user) => {});

  stepForm.save((err) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
  });
  res.status(200).send({ message: "Form Create Successfully!" });
};

exports.getForms = (req, res) => {
  StepForm.find({ portal_id: req.portal_id })
    .select("name")
    .exec(function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        res.status(200).send({ message: "Forms Fetched", data: docs });
      }
    });
};
