//db configuration
const mongoose = require("mongoose");
const path = "mongodb://localhost:27017/threads";
const connection_uri =
  process.env.MONGODB_URI ||
  "mongodb+srv://sHyaM:9849084994@thread.vnpqyz9.mongodb.net/?retryWrites=true&w=majority";

mongoose.Promise = global.Promise;
mongoose
  .connect(connection_uri, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("db connected successfully");
  })
  .catch((err) => {
    console.log("Error connecting to DB", err);
  });
module.exports = {
  mongoose,
};
