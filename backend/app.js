const express = require("express");
// handling async route handlers
require("express-async-errors");
//logs info about server req/res
const morgan = require("morgan");
//cors import package
const cors = require("cors");
//protects against CSRF
const csurf = require("csurf");
//security middleware
const helmet = require("helmet");
//parses cookies from requests
const cookieParser = require("cookie-parser");

const { ValidationError } = require("sequelize");
const { environment } = require("./config");

// import environment from ./config/index, if environment is production, set variable to true, else false
const isProduction = environment === "production";

const app = express();

//connect to morgan middleware for logging info about req and res
app.use(morgan("dev"));

//parse cookies and json
app.use(cookieParser());
app.use(express.json());

// Security Middleware
if (!isProduction) {
  // enable cors only in development, don't need it in production, as React and Express will come from some origin
  app.use(cors());
}

// helmet helps set a variety of headers to better secure your app
app.use(
  helmet.crossOriginResourcePolicy({
    //this allows images with urls to render in deployment
    policy: "cross-origin",
  })
);

// Set the _csrf token and create req.csrfToken method, configure it to use cookies
//adds a _csrf cookie that is HTTP-only, can't be read by JS
//adds a req.csrfToken method, to use for XSRF-TOKEN, to validate HTTP requests with verbs besides GET
app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true,
    },
  })
);

const routes = require("./routes");

app.use(routes);

// Catch unhandled requests and forward to error handler
app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = ["The requested resource couldn't be found."];
  err.status = 404;
  next(err);
});

// Process sequelize errors
app.use((err, _req, _res, next) => {
  // check if error is a Sequelize Validation error:
  if (err instanceof ValidationError) {
    err.errors = err.errors.map((e) => e.message);
    err.title = "Validation error";
  }
  next(err);
});

// Error formatter before returning a JSON response
app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  console.error(err);
  res.json({
    // title: err.title || "Server Error",
    message: err.message,
    statusCode: err.status,
    errors: err.errors,
    stack: isProduction ? null : err.stack,
  });
});

module.exports = app;
