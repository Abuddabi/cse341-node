const router = require("express").Router();
const controller = require("../controllers/jewels");
const { isAuthenticated } = require("../utils/auth");
const { commonValidation } = require("../utils/validation");
const { rules: validationRules, validate } = commonValidation;

router.get("/", controller.getAll);

router.get("/:id", controller.getSingle);

router.post("/", isAuthenticated, validationRules(), validate, controller.create);

router.put("/:id", isAuthenticated, validationRules(), validate, controller.update);

router.delete("/:id", isAuthenticated, controller.delete);

module.exports = router;
