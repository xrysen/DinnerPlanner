DROP TABLE IF EXISTS recipe CASCADE;

CREATE TABLE recipe (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL
);