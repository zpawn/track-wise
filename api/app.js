const fastify = require("fastify")({ logger: true });
const mongoose = require("mongoose");
require("dotenv").config();
const { MONGODB_URI } = require("./constants");
const { userRoutes, authRoutes } = require("./routes");
const { jwtPlugin, hasRolePlugin } = require("./plugins");

mongoose
  .connect(`${MONGODB_URI}/?authSource=admin`, {
    dbName: process.env.DB_NAME,
  })
  .then(() => fastify.log.info("Connected DB"))
  .catch((error) => fastify.log.error("Error connecting to DB", error));

fastify.register(jwtPlugin);
fastify.register(hasRolePlugin);

fastify.register(authRoutes, { prefix: "/api/v1" });
fastify.register(userRoutes, { prefix: "/api/v1/users" });

fastify.get('/', async (req, res) => {
  return res.status(200).type("text/html").send("<h1>Hello, Fastify!</h1>");
})

async function handler(req, reply) {
  await fastify.ready()
  fastify.server.emit('request', req, reply)
};

module.exports = handler;
module.exports.fastify = fastify;
