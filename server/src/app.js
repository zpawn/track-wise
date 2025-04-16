const path = require("node:path");
const fastify = require("fastify")({ logger: true });
const fastifyStatic = require("@fastify/static");
const mongoose = require("mongoose");
require("dotenv").config();
const { MONGODB_URI, ROOT_DIR } = require("./constants");
const { userRoutes, authRoutes } = require("./routes");
const { jwtPlugin, hasRolePlugin } = require("./plugins");

mongoose.connect(`${MONGODB_URI}`)
  .then(() => fastify.log.info("Connected DB"))
  .catch((error) => fastify.log.error("Error connecting to DB", error));

fastify.register(jwtPlugin);
fastify.register(hasRolePlugin);

fastify.register(fastifyStatic, {
  root: path.join(ROOT_DIR, "..", "public"),
});

fastify.register(authRoutes, { prefix: "/api/v1" });
fastify.register(userRoutes, { prefix: "/api/v1/users" });

fastify.get('/', async (req, reply) => {
  return reply.status(200).type("text/html").sendFile("index.html");
});

const start = async () => {
  try {
    const port = process.env.PORT || 5001;
    const host = process.env.HOST || "0.0.0.0";

    await fastify.listen({ port, host });
    fastify.log.info(`Server is running on post ${fastify.server.address().port}`);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();

