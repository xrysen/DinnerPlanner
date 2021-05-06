const express = require("express");
const app = express();
require("dotenv").config();
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

app.get("/reset", (req, res) => {
  db.resetDB();
  res.send("Database reset");
});

app.post("/recipes", (req, res) => {
  db.addNewRecipe(req.body.name, req.body.directions);
  db.getLastRecipeId().then((res) => {
    if (res.rows[0].id) {
      for (const item of req.body.ingredients) {
        db.updateIngredientList(
          res.rows[0].id,
          item.ingredient,
          item.measurement
        );
      }
    }
  });
});

app.listen(PORT, () => {
  console.log("Server started listening on port " + PORT);
});
