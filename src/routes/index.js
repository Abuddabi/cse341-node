const router = require("express").Router();

router.use("/api-docs", require("./swagger"));
router.use("/food", require("./food"));
router.use("/contacts", require("./contacts"));

router.get("*", (req, res) => {
  res.status(404).send("404 Not found.");
});

module.exports = router;
