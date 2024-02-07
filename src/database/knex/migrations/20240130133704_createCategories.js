exports.up = knex => knex.schema.createTable("categories", table => {
    table.increments("id");
    table.text("categories").notNullable();
           
    table.integer("food_id").references("id").inTable("foods").onDelete("CASCADE");
    
  });
  
  
  exports.down = knex => knex.schema.dropTable("categories");
