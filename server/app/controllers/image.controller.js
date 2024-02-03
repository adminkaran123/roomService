const multer = require("multer");
const path = require("path");
const db = require("../models");
const Image = db.image;

//Setting storage engine
const storageEngine = multer.diskStorage({
  destination: "./images",
  filename: (req, file, cb) => {
    //replace all spaces with an underscore add exrntension
    const fileExtension = path.extname(file.originalname);
    cb(null, `file_${Date.now()}-${fileExtension}`);
  },
});

const checkFileType = function (file, cb) {
  // Always return true to allow all file types
  return cb(null, true);
};

//initializing multer
exports.upload = multer({
  storage: storageEngine,
  limits: { fileSize: 10000000 },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
});

exports.uploadImage = (req, res) => {
  if (req.file) {
    const imageData = new Image({
      url: req.file.path,
      portal_id: req.portal_id,
    });

    imageData.save((err) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      res.send("image uploaded");
    });
  } else {
    res.status(400).send("Please upload a valid image");
  }
};

exports.getPortalImages = (req, res) => {
  Image.find({ user_id: req.userId })
    .select("url")
    .select("updated_at")
    .exec(function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        res.status(200).send({ message: "Images Fetched", data: docs });
      }
    });
};
