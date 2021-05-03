DROP TABLE IF EXISTS recipe CASCADE;

CREATE TABLE recipe (
  id PRIMARY KEY SERIAL NOT NULL,
  name VARCHAR(255) NOT NULL,
  ingredient_list_id INTEGER REFERENCES ingredient_list(id) ON DELETE CASCADE  
);