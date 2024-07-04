const { check, validationResult } = require("express-validator");

const commonMiddleware = (req, res, next) => {
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
    requiredStringRule("displayName"),
    requiredStringRule("firstName"),
    requiredStringRule("lastName"),
    requiredStringRule("nickname"),
    check("email", "Please include a valid email").trim().isEmail().normalizeEmail(),
    requiredStringRule("favoriteColor"),
    requiredStringRule("birthday")
  ],
  validate: commonMiddleware
};

exports.commonValidation = {
  rules: () => [
    requiredStringRule("name"),
    requiredStringRule("price"),
    requiredStringRule("quantity"),
    requiredStringRule("weight"),
    requiredStringRule("manager")
  ],
  validate: commonMiddleware
};
