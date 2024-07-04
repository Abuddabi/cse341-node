require("dotenv").config();
const swaggerAutogen = require("swagger-autogen")();

const { ENV, RENDER_URL } = process.env;
const isProd = ENV === "production";
const host = isProd ? RENDER_URL : `localhost:${process.env.PORT || 8080}`;

const htmlInDescription = `
  <p>Authentication links: </p>
  <a href='/auth'>Login</a><br />
  <a href='/auth/logout'>Logout</a>
`;

const doc = {
  info: {
    title: "My API",
    description: htmlInDescription
  },
  host: host,
  schemes: isProd ? ["https"] : ["http"]
};

const outputFile = "./output.json";
const routes = ["../../routes/index.js"];

swaggerAutogen(outputFile, routes, doc);
