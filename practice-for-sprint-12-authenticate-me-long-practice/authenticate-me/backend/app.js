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

module.exports = app;
