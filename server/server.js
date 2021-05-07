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

app.get("/recipes/:id", (req, res) => {
    db.getRecipeById(req.params.id)
    .then((result) => res.send(result.rows))
    .catch((err) => console.log(err));
});

app.get("/directions/:id", (req, res) => {
  db.getRecipeDirectionsById(req.params.id)
  .then((result) => res.send(result.rows))
  .catch((err) => console.log(err));
})

app.get("/recipes", (req, res) => {
  db.getAllRecipes()
  .then((result) => res.send(result.rows));
})

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
        for (const item of req.body.directions) {
          db.updateDirections(res.rows[0].id, item);
        }
      }
    }
  });
});

app.listen(PORT, () => {
  console.log("Server started listening on port " + PORT);
});
