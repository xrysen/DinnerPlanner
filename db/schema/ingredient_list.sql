DROP TABLE IF EXISTS ingredient_list CASCADE;

CREATE TABLE ingredient_list (
  id SERIAL PRIMARY KEY NOT NULL,
  recipe_id INTEGER REFERENCES recipe(id) ON DELETE CASCADE,
  ingredient_id INTEGER REFERENCES ingredient(id) ON DELETE CASCADE,
  measurement VARCHAR(255)
);