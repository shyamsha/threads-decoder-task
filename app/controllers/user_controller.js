const express = require("express");
const router = express.Router();
const { authenticationByUser } = require("../middleware/authenticate");
const { authorizationByUser } = require("../middleware/authorization");
const { User } = require("../models/user");

router.post("/register", (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.send(err);
    });
});
router.post("/login", (req, res) => {
  const body = req.body;
  User.findByCredentials(body.email, body.password)
    .then((user) => {
      return user.generateByToken();
      //res.send(" successfully login ");
    })
    .then((token) => {
      //res.header("x-auth", token).send();
      res.send(token);
    })
    .catch((err) => {
      res.send(err);
    });
});
router.delete("/logout", authenticationByUser, (req, res) => {
  const tokenData = req.token;

  User.findOneAndUpdate(req.user._id, {
    $pull: { tokens: { token: tokenData } },
  })
    .then((user) => {
      user.save().then((user) => {
        res.send({ statusText: "successfully logout" });
      });
    })
    .catch((err) => {
      res.send(err);
    });
});
module.exports = {
  userController: router,
};
