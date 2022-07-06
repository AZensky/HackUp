const { validationResult } = require("express-validator");

// middleware for formatting errors from express-validator middleware
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  // if there are any validation errors, create an error with all the validation error messages and invoke the next error-handling middleware
  if (!validationErrors.isEmpty()) {
    const errors = {};
    validationErrors.errors.forEach((error) => {
      if (error.param) {
        let key = error.param;
        errors[key] = error.msg;
      }
    });

    const err = Error("Bad request.");
    err.errors = errors;
    err.status = 400;
    // err.title = "Bad request.";

    if (
      errors.name ||
      errors.about ||
      errors.type ||
      errors.private ||
      errors.city ||
      errors.state ||
      errors.firstName ||
      errors.lastName
    ) {
      err.message = "Validation Error";
    }

    if (errors.email === "User with that email already exists") {
      err.message = "User already exists";
      err.status = 403;
    }

    if (
      errors.email === "Email is required" ||
      errors.password === "Password is required"
    ) {
      err.message = "Validation Error";
    }

    next(err);
  }

  //if there are no validation errors, invoke the next middleware
  next();
};

module.exports = {
  handleValidationErrors,
};
