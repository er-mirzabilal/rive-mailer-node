const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
require("./models");
const cors = require("cors");
const port = process.env.PORT || 5000;
const indexRouter = require("./routes/index.js");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

// error handler
app.use(function (err, req, res, next) {
  const statusCode = err.status || 500;
  const errorResponse = {
    code: statusCode,
    message: err.message || "Internal Server Error",
    ...(req.app.get("env") === "development" && { stack: err.stack }),
  };
  res.status(statusCode).json(errorResponse);
});

app.listen(port, () => {
  console.log(`App is listening on PORT ${port}`);
});
