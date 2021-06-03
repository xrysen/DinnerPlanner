DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  email VARCHAR(255) NOT NULL,
  first_name VARCHAR(50) NOT NULL
);

DROP TABLE IF EXISTS category CASCADE;

CREATE TABLE category (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS recipe CASCADE;

CREATE TABLE recipe (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  category_id INTEGER REFERENCES category(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  has_leftovers BOOLEAN DEFAULT false
);

DROP TABLE IF EXISTS direction CASCADE;

CREATE TABLE direction (
  id SERIAL PRIMARY KEY NOT NULL,
  directions TEXT NOT NULL,
  recipe_id INTEGER REFERENCES recipe(id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS food_type CASCADE;

CREATE TABLE food_type (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS ingredient CASCADE;

CREATE TABLE ingredient (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  type_id INTEGER REFERENCES food_type(id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS ingredient_list CASCADE;

CREATE TABLE ingredient_list (
  id SERIAL PRIMARY KEY NOT NULL,
  recipe_id INTEGER REFERENCES recipe(id) ON DELETE CASCADE,
  ingredient_id INTEGER REFERENCES ingredient(id) ON DELETE CASCADE,
  measurement VARCHAR(255)
);

