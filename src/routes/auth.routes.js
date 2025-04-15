const { login } = require("../controllers/auth.controller");

const routes = (fastify, options) => {
  fastify.post("/login", login);
};

module.exports = { routes };
