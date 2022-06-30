const { validationResult } = require("express-validator");

// middleware for formatting errors from express-validator middleware
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  // if there are any validation errors, create an error with all the validation error messages and invoke the next error-handling middleware
  if (!validationErrors.isEmpty()) {
    const errors = validationErrors.array().map((error) => `${error.msg}`);

    console.log(errors);

    if (errors.includes("User already exists")) {
      const err = Error("User already exists");
      err.errors = {
        email: "User with that email already exists",
      };
      err.status = 403;
      err.title = "Bad request";
      next(err);
    } else if (
      errors.includes("Email is required") &&
      errors.includes("Password is required")
    ) {
      const err = Error("Validation Error");
      err.errors = {
        email: "Email is required",
        password: "Password is required",
      };
      err.status = 400;
      err.title = "Bad request";
      next(err);
    } else if (errors.includes("Email is required")) {
      const err = Error("Validation Error");
      err.errors = {
        email: "Email is required",
      };
      err.status = 400;
      err.title = "Bad request";
      next(err);
    } else if (errors.includes("Password is required")) {
      const err = Error("Validation Error");
      err.errors = {
        password: "Password is required",
      };
      err.status = 400;
      err.title = "Bad request";
      next(err);
    }

    const err = Error("Bad request.");
    err.errors = errors;
    err.status = 400;
    err.title = "Bad request.";
    next(err);
  }

  //if there are no validation errors, invoke the next middleware
  next();
};

module.exports = {
  handleValidationErrors,
};
