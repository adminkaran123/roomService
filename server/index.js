const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const path = require("path");
const stripeController = require("./app/controllers/stripe.controller");
require("dotenv").config();
const app = express();
const fs = require("fs");

app.use(cors());

// parse requests of content-type - application/json
app.use((req, res, next) => {
  if (req.originalUrl === "/api/webhook") {
    console.log("WebHook received!");
    next(); // Do nothing with the body because I need it in a raw state.
  } else {
    express.json()(req, res, next); // ONLY do express.json() if the received request is NOT a WebHook from Stripe.
  }
});

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

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/hubspot.routes")(app);
require("./app/routes/image.routes")(app);
require("./app/routes/stepForm.routes")(app);
require("./app/routes/stripe.routes")(app);
require("./app/routes/tour.routes")(app);

app.use("*/images", express.static(__dirname + "/images"));

app.use(
  "/embed",
  express.static(path.join(__dirname, "../../formmakerEmbed/dist"))
);

app.use(express.static(path.join(__dirname, "../../FormMakerWebsite/website")));

app.use(express.static(path.join(__dirname, "../dist")));

app.get("/app", (req, res) => {
  res.sendFile(path.join(__dirname + "/../dist/index.html"));
});
app.get("/app/*", (req, res) => {
  res.sendFile(path.join(__dirname + "/../dist/index.html"));
});

// app.get("/:pagename", (req, res) => {
//   //get anything param
//   const pagename = req.params.pagename;

//   res.sendFile(
//     path.join(
//       __dirname + "/../../FormMakerWebsite/website/" + pagename + ".html"
//     )
//   );
// });
app.get("/:pagename", (req, res) => {
  // Get the parameter from the URL
  const pagename = req.params.pagename;

  // Construct the file path
  const filePath = path.join(
    __dirname + "/../../FormMakerWebsite/website/" + pagename + ".html"
  );

  // Check if the file exists
  if (fs.existsSync(filePath)) {
    // If the file exists, send it
    res.sendFile(filePath);
  } else {
    // If the file does not exist, send a custom 404 page
    res
      .status(404)
      .sendFile(
        path.join(__dirname + "/../../FormMakerWebsite/website/404.html")
      );
  }
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
