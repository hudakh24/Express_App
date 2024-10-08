var express = require("express");
//var path = require('path'); package import
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var userRouter = require("./routes/userRouter");
var authRouter = require("./routes/authRouter");

var app = express();

// view engine setup

app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/userRouter", userRouter);
app.use("/authRouter", authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
