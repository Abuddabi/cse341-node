const router = require("express").Router();
const foodController = require("../controllers/food");
const { isAuthenticated } = require("../utils/auth");
const { commonValidation } = require("../utils/validation");
const { rules: validationRules, validate } = commonValidation;

router.get("/", foodController.getAll);

router.get("/:id", foodController.getSingle);

router.post("/", isAuthenticated, validationRules(), validate, foodController.createFood);

router.put("/:id", isAuthenticated, validationRules(), validate, foodController.updateFood);

router.delete("/:id", isAuthenticated, foodController.deleteFood);

module.exports = router;
