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
  return check(fieldName, errorMessage).trim().notEmpty().isString();
};

const requiredStrTxt = "is required and should be a string";

exports.contactValidation = {
  rules: () => [
    requiredStringRule("firstName", `firstName ${requiredStrTxt}.`),
    requiredStringRule("lastName", `lastName ${requiredStrTxt}.`),
    check("email", "Please include a valid email").trim().isEmail().normalizeEmail(),
    requiredStringRule("favoriteColor", `favoriteColor ${requiredStrTxt}.`),
    requiredStringRule("birthday", `birthday ${requiredStrTxt}.`)
  ],
  validate: commonValidation
};

exports.foodValidation = {
  rules: () => [
    requiredStringRule("name", `name ${requiredStrTxt}.`),
    requiredStringRule("price", `price ${requiredStrTxt}.`),
    requiredStringRule("quantity", `quantity ${requiredStrTxt}.`),
    requiredStringRule("weight", `weight ${requiredStrTxt}.`),
    requiredStringRule("manager", `manager ${requiredStrTxt}.`)
  ],
  validate: commonValidation
};
