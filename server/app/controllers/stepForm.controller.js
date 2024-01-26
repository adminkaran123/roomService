const db = require("../models");
const StepForm = db.stepForm;
const Submission = db.submission;
const { ObjectId } = require("mongodb");

exports.createForm = (req, res) => {
  const stepForm = new StepForm({
    name: req.body.name,
    user: req.userId,
    formData: req.body.formData,
    themeSetting: req.body.themeSetting,
    endScreen: req.body.endScreen,
    status: req.body.status,
    logicData: req.body.logicData,
    calulation: req.body.calulation,
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
        logicData: req.body.logicData,
        calulation: req.body.calulation,
        updated_at: Date.now(),
      },
    },
    function (err, doc) {
      console.log("err", err, doc);
      res.status(200).send({ message: "Form updated Successfully!" });
    }
  );
};

// exports.getForms = (req, res) => {
//   StepForm.find({ user_id: req.userId })
//     .select("name")
//     .select("updated_at")
//     .sort({ update_at: 1 })
//     .exec(function (err, docs) {
//       if (err) {
//         console.log(err);
//       } else {
//         res
//           .status(200)
//           .send({ message: "Forms Fetched", data: docs.reverse() });
//       }
//     });
// };

exports.getForms = async (req, res) => {
  try {
    const forms = await StepForm.aggregate([
      {
        $match: { user: ObjectId(req.userId) },
      },
      {
        $lookup: {
          from: "submissions", // Use the actual name of your Submission collection
          localField: "_id",
          foreignField: "form",
          as: "submissions",
        },
      },
      {
        $project: {
          name: 1,
          updated_at: 1,
          submissionCount: { $size: "$submissions" },
        },
      },
      {
        $sort: { updated_at: 1 },
      },
    ]);

    res.status(200).json({ message: "Forms Fetched", data: forms.reverse() });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getFormById = (req, res) => {
  StepForm.findOne({
    _id: ObjectId(req.params.id),
  })
    .populate({
      path: "user",
      select: "plan",
    })
    .exec(function (err, form) {
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

exports.getSubmissons = (req, res) => {
  Submission.find({ user_id: req.userId })
    .populate({
      path: "form",
      select: "name  _id",
    })
    .sort({ update_at: 1 })
    .exec(function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        res
          .status(200)
          .send({ message: "Submissons Fetched", data: docs.reverse() });
      }
    });
};

exports.deleteSubmissonById = (req, res) => {
  Submission.deleteOne({
    _id: ObjectId(req.params.id),
  }).exec(function (err) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send({ message: "Submisson Deleted" });
    }
  });
};
