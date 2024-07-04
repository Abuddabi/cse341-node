const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const { googleCallbackUrl } = require("../routes/auth");

const initialize = () => {
  const { ENV, PORT, RENDER_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;
  const host = ENV === "production" ? `https://${RENDER_URL}` : `http://localhost:${PORT || 8080}`;

  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: `${host}${googleCallbackUrl}`,
        passReqToCallback: true
      },
      function (request, accessToken, refreshToken, profile, done) {
        // User.findOrCreate({ googleId: profile.id }, function (err, user) {
        // return done(err, user);
        return done(null, profile);
        // });
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};

const isAuthenticated = (req, res, next) => {
  if (req.session.user === undefined) {
    return res.status(401).json("You don't have access. Please visit '/auth' page.");
  }
  next();
};

module.exports = { initialize, isAuthenticated, passport };
