const router = require("express").Router();
const foodController = require("../controllers/food");

router.get("/", foodController.getAll);

router.get("/:id", foodController.getSingle);

router.post("/", foodController.createFood);

router.put("/:id", foodController.updateFood);

router.delete("/:id", foodController.deleteFood);

module.exports = router;
