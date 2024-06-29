const router = require("express").Router();
const foodController = require("../controllers/food");
const { foodValidation } = require("../utils/validation");
const { rules: validationRules, validate } = foodValidation;

router.get("/", foodController.getAll);

router.get("/:id", foodController.getSingle);

router.post("/", validationRules(), validate, foodController.createFood);

router.put("/:id", validationRules(), validate, foodController.updateFood);

router.delete("/:id", foodController.deleteFood);

module.exports = router;
