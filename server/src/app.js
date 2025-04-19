const path = require("node:path");
const fastify = require("fastify")({ logger: true });
const fastifyStatic = require("@fastify/static");
const mongoose = require("mongoose");
require("dotenv").config();
const { MONGODB_URI, PUBLIC_DIR } = require("./constants");
const { userRoutes, authRoutes, rootRoutes, systemRoutes } = require("./routes");
const { jwtPlugin, hasRolePlugin } = require("./plugins");
const { contentType } = require("./hooks");

mongoose.connect(`${MONGODB_URI}`)
  .then(() => fastify.log.info("Connected DB"))
  .catch((error) => fastify.log.error("Error connecting to DB", error));

//? 1. plugins (from the Fastify ecosystem)
fastify.register(fastifyStatic, { root: PUBLIC_DIR });

//? 2. your plugins (your custom plugins)
fastify.register(jwtPlugin);
fastify.register(hasRolePlugin);

fastify.register(rootRoutes, { prefix: "/" });
fastify.register(authRoutes, { prefix: "/api/v1" });
fastify.register(systemRoutes, { prefix: "/api/v1" });
fastify.register(userRoutes, { prefix: "/api/v1/users" });

//? 3. decorators

//? 4. hooks
fastify.addHook("onSend", contentType);

//? 5. your services

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

