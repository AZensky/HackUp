const { validationResult } = require("express-validator");

// middleware for formatting errors from express-validator middleware
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  // if there are any validation errors, create an error with all the validation error messages and invoke the next error-handling middleware
  if (!validationErrors.isEmpty()) {
    const errors = validationErrors.array().map((error) => `${error.msg}`);

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
