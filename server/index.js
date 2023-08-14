const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const path = require("path");
const authRoute = require("./app/routes/auth.routes");
require("dotenv").config();
const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "bezkoder-session",
    keys: [process.env.COOKIE_SECRET], // should use as secret environment variable
    httpOnly: true,
  })
);

const db = require("./app/models");
const Role = db.role;

db.mongoose
  .connect(process.env.MONGO_DB)
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.use(express.static(path.join(__dirname, "../dist")));

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/hubspot.routes")(app);
require("./app/routes/image.routes")(app);
require("./app/routes/stepForm.routes")(app);

app.use("/images", express.static(__dirname + "/Images"));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname + "../dist/index.html"));
});

// set port, listen for requests
const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}
