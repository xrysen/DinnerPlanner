require("dotenv").config();

const { response } = require("express");
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
    console.log(results.rows);
  })
}

module.exports = {
  getAllTypes
}