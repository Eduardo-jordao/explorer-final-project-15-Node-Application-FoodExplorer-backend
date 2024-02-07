const knex = require("../database/knex");

class FoodsController{
    async create(request, response){
        const { name, description, image, price, ingredients, categories } = request.body
        const { user_id } = request.params;

        
        const  [food_id]  = await knex("foods").insert({
            name,
            description,
            image,
            price,
            user_id
        });

        

        const categoriesInsert = categories.map(category => {
            return {
                food_id,
                categories: category
            }
        });

        await knex("categories").insert(categoriesInsert);

        const ingredientsInsert = ingredients.map(ingredient => {
            return {
                ingredients: ingredient,
                food_id,
                user_id
            }
        });

        await knex("ingredients").insert(ingredientsInsert);

        response.json();

    }

    async show(request, response){
        const { id } = request.params;

        const food = await knex("foods").where({ id }).first();
        const ingredients = await knex("ingredients").where({ food_id: id }).orderBy("ingredients");
        const categories = await knex("categories").where({ food_id: id }).orderBy("categories");

        return response.json({
            ...food,
            ingredients,
            categories
        });
    }

    async delete(request, response){
        const { id } = request.params;

        await knex("foods").where({ id }).delete();

        return response.json();
    }

    async index(request, response){
        const { user_id, name, ingredients } = request.query;

        let foods;

        if (ingredients) {
            const filterIngredient = ingredients.split(',').map(ingredient => ingredient.trim())
            
            foods = await knex("ingredients")
            .select([
                "foods.id",
                "foods.name",
                "foods.user_id",

            ])
            .where("foods.user_id", user_id)
            .whereLike("foods.name", `%${name}%`)
            .whereIn("ingredients", filterIngredient)
            .innerJoin("foods", "foods.id", "ingredients.food_id")
            .orderBy("foods.name")

        } else {
            foods = await knex("foods")
            .where({ user_id })
            .whereLike("name", `%${name}%`)
            .orderBy("name");
        }

        const userIngredients = await knex("ingredients").where({ user_id });
        const foodsWithIngredients = foods.map(food => {
            const foodIngredients = userIngredients.filter(ingredient => ingredient.food_id === food.id);

            return {
                ...food,
                ingredients: foodIngredients
            }
        })

        return response.json( foodsWithIngredients );
    }
}

module.exports = FoodsController;

