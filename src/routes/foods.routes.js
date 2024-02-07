const { Router } = require("express");

const FoodsController = require("../controllers/FoodsController");

const foodsRoutes = Router();

const foodsController = new FoodsController();

foodsRoutes.get("/", foodsController.index);
foodsRoutes.post("/:user_id", foodsController.create);
foodsRoutes.get("/:id", foodsController.show);
foodsRoutes.delete("/:id", foodsController.delete);

module.exports = foodsRoutes;