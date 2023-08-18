const nodemailer = require("nodemailer");
const path = require("path");
const hbs = require("nodemailer-express-handlebars");

// initialize nodemailer
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.APP_PASS,
  },
});

// point to the template folder
const handlebarOptions = {
  viewEngine: {
    partialsDir: path.join(__dirname, "../views"),
    defaultLayout: false,
  },
  viewPath: path.join(__dirname, "../views"),
};
// use a template file with nodemailer
transporter.use("compile", hbs(handlebarOptions));

module.exports = {
  transporter,
};
