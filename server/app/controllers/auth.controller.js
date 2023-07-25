const db = require("../models");
const { createJWTToken, refreshToken } = require("../helpers/functions");
const User = db.user;
const Role = db.role;
const Portal = db.portal;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.checkUserAndAddPortal = (req, res) => {
  const newPortal = new Portal({
    name: req.body.portal_name,
    refresh_token: req.body.refresh_token,
    updated_at: req.body.updated_at,
    portal_id: req.body.portal_id,
    useremail: req.body.email,
  });

  User.findOne({
    email: req.body.email,
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (user) {
        //check for if portal exist now
        Portal.findOne({
          useremail: req.body.email,
          portal_id: req.body.portal_id,
        }).exec((err, portal) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          if (portal) {
            //update refresh token in case if it exist
            portal.refresh_token = req.body.refresh_token;
            portal.save((err) => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }
            });
          } else {
            //add stuff
            newPortal.save((err) => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }
            });
          }
        });
        user.active_portal_id = req.body.portal_id;

        user.save((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          const token = createJWTToken(req, user);

          var authorities = [];

          for (let i = 0; i < user.roles.length; i++) {
            authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
          }
          res.status(200).send({
            id: user._id,
            email: user.email,
            roles: authorities,
            token: token,
            isExist: true,
            portal_id: req.body.portal_id,
            hs_access_token: req.body.hs_access_token,
          });
        });
      } else {
        res
          .status(200)
          .send({ message: "User Not Exist successfully!", isExist: false });
      }
    });
};

exports.signup = (req, res) => {
  const newUser = new User({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    active_portal_id: req.body.portal_id,
  });

  const newPortal = new Portal({
    name: req.body.portal_name,
    refresh_token: req.body.refresh_token,
    updated_at: req.body.updated_at,
    portal_id: req.body.portal_id,
    useremail: req.body.email,
  });

  //add user if not exists
  newUser.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles },
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map((role) => role._id);
          user.save((err) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.redirect("/create-password");
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          const token = createJWTToken(req, user);

          var authorities = ["ROLE_USER"];
          res.status(200).send({
            id: user._id,
            email: user.email,
            roles: authorities,
            token: token,
            portal_id: user.active_portal_id,
            hs_access_token: req.body.hs_access_token,
          });
        });
      });
    }
  });

  newPortal.save((err) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
  });
};

exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username,
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({ message: "Invalid Password!" });
      }

      Portal.findOne({
        useremail: user.email,
        portal_id: user.active_portal_id,
      }).exec(async (err, portal) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        if (portal) {
          //update refresh token in case if it exist
          tokenResponse = await refreshToken(portal);
          portal.updated_at = Date.now();

          portal.save((err) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            const token = createJWTToken(req, user, tokenResponse.accessToken);

            var authorities = [];

            for (let i = 0; i < user.roles.length; i++) {
              authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
            }

            req.session.token = token;

            res.status(200).send({
              id: user._id,
              email: user.email,
              roles: authorities,
              token: token,
              portal_id: user.active_portal_id,
              hs_access_token: tokenResponse.accessToken,
            });
          });
        }
      });
    });
};
