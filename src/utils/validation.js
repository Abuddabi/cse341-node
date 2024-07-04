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

const requiredStringRule = (fieldName, errorMessage) => {
  return check(fieldName, errorMessage)
    .trim()
    .notEmpty()
    .withMessage(`${fieldName} is required.`)
    .isString()
    .not()
    .isNumeric()
    .withMessage(`${fieldName} should be a string`);
};

exports.contactValidation = {
  rules: () => [
    requiredStringRule("firstName"),
    requiredStringRule("lastName"),
    check("email", "Please include a valid email").trim().isEmail().normalizeEmail(),
    requiredStringRule("favoriteColor"),
    requiredStringRule("birthday")
  ],
  validate: commonValidation
};

exports.foodValidation = {
  rules: () => [
    requiredStringRule("name"),
    requiredStringRule("price"),
    requiredStringRule("quantity"),
    requiredStringRule("weight"),
    requiredStringRule("manager")
  ],
  validate: commonValidation
};
