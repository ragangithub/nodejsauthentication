const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

//Connect Db
mongoose
  .connect(process.env.DB_CONNECT)
  .then(() => {
    console.log("connected");
  })
  .catch((error) => {
    console.log(error.message);
  });

//Import Routes
const authRoute = require("./routes/auth");

//Route Middlewares
app.use("/api/user", authRoute);

app.listen(3000);
