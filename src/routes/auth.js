const router = require("express").Router();
const passport = require("passport");

const apiDocsUrl = "/api-docs";
const googleCallbackUrl = "/google/callback";
const googleAuthenticate = passport.authenticate("google", {
  failureRedirect: apiDocsUrl,
  session: false
});

const googleCallback = (req, res) => {
  req.session.user = req.user;
  res.redirect(apiDocsUrl);
};

router.get("/", passport.authenticate("google", { scope: ["profile"] }));
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect(apiDocsUrl);
  });
});

module.exports = { router, googleCallbackUrl, googleAuthenticate, googleCallback };
