const mongoose = require("mongoose");

const { MONGODB_URL } = require("../config/index");

mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log("MongoDB Connected Successfully!!");
  })
  .catch(() => {
    console.log("MongoDB Connection Failed!!");
  });
