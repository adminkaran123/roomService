const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;
mongoose.set("strictQuery", false);

db.user = require("./user.model");
db.role = require("./role.model");
db.image = require("./image.model");
db.stepForm = require("./stepForm.modal");
db.submission = require("./submission.model");

db.ROLES = ["user", "admin"];

module.exports = db;
