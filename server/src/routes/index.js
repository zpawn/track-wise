const { routes: userRoutes } = require("./user.routes");
const { routes: authRoutes } = require("./auth.routes");
const { routes: rootRoutes } = require("./root.routes");
const { routes: systemRoutes } = require("./system.routes");

module.exports = {
  userRoutes,
  authRoutes,
  rootRoutes,
  systemRoutes,
};
