require("dotenv").config();
const swaggerAutogen = require("swagger-autogen")();

const { PORT, DEV, RENDER_URL } = process.env;
const host = DEV ? `localhost:${PORT}` : RENDER_URL;

const doc = {
  info: {
    title: "My API",
    description: "Description"
  },
  host: host,
  schemes: DEV ? ["http"] : ["https"]
};

const outputFile = "./output.json";
const routes = ["../../routes/index.js"];

swaggerAutogen(outputFile, routes, doc);
