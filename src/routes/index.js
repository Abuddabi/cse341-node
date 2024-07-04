const router = require("express").Router();
const auth = require("./auth");

router.use("/api-docs", require("./swagger"));
router.use("/auth", auth.router);
router.use("/food", require("./food"));
router.use("/contacts", require("./contacts"));

router.get(auth.googleCallbackUrl, auth.googleAuthenticate, auth.googleCallback);

router.get("*", (req, res) => {
  res.status(404).send("404 Not found.");
});

module.exports = router;
