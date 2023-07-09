const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const port = process.env.PORT || 3001;
app.use(express.static(path.join(__dirname, "client/build")));
//db config
const mongoose = require("./config/db_connect");

const { userController } = require("./app/controllers/user_controller");
const { threadController } = require("./app/controllers/thread_controller");

app.use(express.json());
app.use(cors());
//route urls
app.use("/users", userController);
app.use("/threads", threadController);

app.get("/", (req, res) => {
  res.send("Welcome to your Threads");
});
//default route
app.use(function (req, res) {
  res.status(404);
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});
//listening server
app.listen(port, () => {
  console.log("listening from", port);
});
