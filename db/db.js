require("dotenv").config();

const { Pool } = require("pg");

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

const pool = new Pool({
  connectionString: connectionString,
});

const getAllTypes = (request, response) => {
  pool.query("SELECT * FROM food_type", (error, results) => {
    if (error) {
      throw error;
    }
    response.send(results.rows);
  });
};

const getAllIngredients = (request, response) => {
  pool.query("SELECT * FROM ingredient ORDER BY type_id;", (error, results) => {
    response.send(results.rows);
  });
};

const getLastRecipeId = () => {
  return pool.query("SELECT recipe.id FROM recipe ORDER BY id DESC LIMIT 1");
};

const getRecipeById = (id) => {
  return pool.query(`SELECT recipe.id, recipe.name, ingredient_list.ingredient_id, ingredient_list.measurement, ingredient.name AS ingredient FROM recipe 
  JOIN ingredient_list ON recipe.id = recipe_id
  JOIN ingredient ON ingredient_list.ingredient_id = ingredient.id
  WHERE recipe.id = ${id}`);
};

const getRecipeDirectionsById = (id) => {
  return pool.query(`SELECT directions FROM direction WHERE recipe_id = ${id}`);
};

const addNewIngredient = (name, type, res) => {
  pool.query(
    `INSERT INTO ingredient (name, type_id) 
    VALUES ($1, $2);
    `,
    [name, type]
  );
  res.send("Success!");
};

const addNewRecipe = (name) => {
  pool.query(
    `INSERT INTO recipe (name)
    VALUES ($1)`,
    [name]
  );
  console.log(`Successfully added ${name} to the database`);
};

const updateIngredientList = (recipeID, ingredientID, measurement) => {
  pool.query(
    `
    INSERT INTO ingredient_list (recipe_id, ingredient_id, measurement)
    VALUES ($1, $2, $3)
    `,
    [recipeID, ingredientID, measurement]
  );
};

const updateDirections = (recipeID, direction) => {
  pool.query(
    `
    INSERT INTO direction (recipe_id, directions)
    VALUES ($1, $2)
    `,
    [recipeID, direction]
  );
};

const resetRecipes = () => {
  pool.query(
    `DROP TABLE IF EXISTS recipe CASCADE;
    CREATE TABLE recipe (
      id SERIAL PRIMARY KEY NOT NULL,
      name VARCHAR(255) NOT NULL
    );
    `
  );
};

const resetDirections = () => {
  pool.query(
    `DROP TABLE IF EXISTS direction CASCADE;
    CREATE TABLE direction (
      id SERIAL PRIMARY KEY NOT NULL,
      directions TEXT NOT NULL,
      recipe_id INTEGER REFERENCES recipe(id) ON DELETE CASCADE
    );`
  );
};

const resetIngredientList = () => {
  pool.query(
    `
    DROP TABLE IF EXISTS ingredient_list CASCADE;
    CREATE TABLE ingredient_list (
      id SERIAL PRIMARY KEY NOT NULL,
      recipe_id INTEGER REFERENCES recipe(id) ON DELETE CASCADE,
      ingredient_id INTEGER REFERENCES ingredient(id) ON DELETE CASCADE,
      measurement VARCHAR(255)
    );
    `
  );
};

const resetDB = () => {
  resetRecipes();
  resetDirections();
  resetIngredientList();
};

module.exports = {
  getAllTypes,
  addNewIngredient,
  getAllIngredients,
  addNewRecipe,
  resetDB,
  getLastRecipeId,
  updateIngredientList,
  getRecipeById,
  updateDirections,
  getRecipeDirectionsById,
};
