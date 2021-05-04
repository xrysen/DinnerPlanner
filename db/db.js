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

module.exports = {
  getAllTypes,
  addNewIngredient,
  getAllIngredients
}