const { check, validationResult } = require("express-validator");

const commonValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.path]: err.msg }));

  return res.status(422).json(extractedErrors);
};

exports.contactValidation = {
  rules: () => [
    check("firstName", "firstName is required").not().isEmpty(),
    check("lastName", "lastName is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail().normalizeEmail(),
    check("favoriteColor", "favoriteColor is required").not().isEmpty(),
    check("birthday", "birthday is required").not().isEmpty()
  ],
  validate: commonValidation
};

exports.foodValidation = {
  rules: () => [
    check("name", "name is required").not().isEmpty(),
    check("price", "price is required").not().isEmpty(),
    check("quantity", "quantity is required").not().isEmpty(),
    check("weight", "weight is required").not().isEmpty(),
    check("manager", "manager is required").not().isEmpty()
  ],
  validate: commonValidation
};
