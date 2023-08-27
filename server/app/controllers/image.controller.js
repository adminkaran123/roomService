const multer = require("multer");
const path = require("path");
const db = require("../models");
const Image = db.image;

//Setting storage engine
const storageEngine = multer.diskStorage({
  destination: "./images",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}--${file.originalname.replaceAll(/\s/g, "")}`);
  },
});

const checkFileType = function (file, cb) {
  //Allowed file extensions
  const fileTypes = /jpeg|jpg|png|gif|svg/;

  //check extension names
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());

  const mimeType = fileTypes.test(file.mimetype);

  if (mimeType && extName) {
    return cb(null, true);
  } else {
    cb("Error: You can Only Upload Images!!");
  }
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
  Image.find({ portal_id: req.portal_id })
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
