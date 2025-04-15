const { fastify } = require("./app");

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
