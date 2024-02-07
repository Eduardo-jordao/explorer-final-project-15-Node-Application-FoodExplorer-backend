const { Router } = require("express");

const usersRouter = require("./users.routes");
const foodsRouter = require("./foods.routes");
const ingredientsRouter = require("./ingredients.routes");

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/foods", foodsRouter);
routes.use("/ingredients", ingredientsRouter);

module.exports = routes;