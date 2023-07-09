const express = require("express");
const router = express.Router();
const { authenticationByUser } = require("../middleware/authenticate");
const { authorizationByUser } = require("../middleware/authorization");
const { Thread } = require("../models/threads");

router.get("/", authenticationByUser, (req, res) => {
  Thread.find({ user: req.user._id })
    .populate("user")
    .then((thread) => {
      if (thread.length != 0) {
        res.send(thread);
      } else {
        res.send({ user: "please create thread" });
      }
    })
    .catch((err) => {
      res.send(err);
    });
});
router.post("/", authenticationByUser, (req, res) => {
  const thread = new Thread(req.body, req.user._id);
  thread.user = req.user._id;
  thread
    .save()
    .then((thread) => {
      res.send(thread);
    })
    .catch((err) => {
      res.send(err);
    });
});
router.delete("/:id", authenticationByUser, (req, res) => {
  const id = req.params.id;
  Thread.findOneAndDelete({ _id: id }, req.user._id)
    .then((thread) => {
      res.send(thread);
    })
    .catch((err) => {
      res.send(err);
    });
});
module.exports = {
  threadController: router,
};
