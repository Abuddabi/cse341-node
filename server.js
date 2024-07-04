const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("./src/config/db");
const session = require("express-session");
const auth = require("./src/utils/auth");
const { passport } = auth;

const port = process.env.PORT || 8080;
const app = express();

app
  .use(bodyParser.json())
  .use(
    session({
      secret: "secret",
      resave: false,
      saveUninitialized: true
    })
  )
  // .use(passport.initialize)
  .use(passport.session())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Z-Key"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
  })
  .use("/", require("./src/routes"));

auth.initialize();

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});
