const express = require("express");
const app = express();
require('dotenv').config();
const cors = require("cors");
const db = require("../db/db");
const PORT = 8080 || process.env.PORT;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/test", (req, res) => {
  db.addNewIngredient("Tomato", 3, res);
});

app.get("/ingredients", db.getAllIngredients);

app.post("/recipes", (req, res) => {
  console.log(req.body.ingredients);
});

app.listen(PORT, () => {
  console.log("Server started listening on port " + PORT);
});