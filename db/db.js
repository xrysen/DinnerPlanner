require("dotenv").config();

const { Pool } = require('pg');

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

const pool = new Pool({
  connectionString: connectionString,
});

const getAllTypes = (request, response) => {
  pool.query('SELECT * FROM food_type', (error, results) => {
    if (error) {
      throw error;
    }
    response.send(results.rows);
  })
}

const getAllIngredients = (request, response) => {
  pool.query('SELECT * FROM ingredient ORDER BY type_id;', (error, results) => {

    response.send(results.rows);
  });
}

const addNewIngredient = (name, type, res) => {
  pool.query(
    `INSERT INTO ingredient (name, type_id) 
    VALUES ($1, $2);
    `, [name, type]
  )
  res.send("Success!");
};

const addNewRecipe = (name, directions) => {
  pool.query(
    `INSERT INTO recipe (name, directions)
    VALUES ($1, $2)`, [name, directions]
  );
  console.log(`Successfully added ${name} to the database`);
}

const resetRecipes = () => {
  pool.query(
    `DROP TABLE IF EXISTS recipe CASCADE;
    CREATE TABLE recipe (
      id SERIAL PRIMARY KEY NOT NULL,
      name VARCHAR(255) NOT NULL,
      directions TEXT NOT NULL
    );
    `
  )
}

const resetIngredientList = () => {
  pool.query(
    `
    DROP TABLE IF EXISTS ingredient_list CASCADE
    CREATE TABLE ingredient_list (
      id SERIAL PRIMARY KEY NOT NULL,
      recipe_id INTEGER REFERENCES recipe(id) ON DELETE CASCADE,
      ingredient_id INTEGER REFERENCES ingredient(id) ON DELETE CASCADE,
      measurement VARCHAR(255)
    );
    `
  );
}

const resetDB = () => {
  resetRecipes();
  resetIngredientList();
}

module.exports = {
  getAllTypes,
  addNewIngredient,
  getAllIngredients,
  addNewRecipe,
  resetDB
}