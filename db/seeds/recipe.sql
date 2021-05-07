INSERT INTO food_type (name) VALUES ('Spice');
INSERT INTO food_type (name) VALUES ('Dairy');
INSERT INTO food_type (name) VALUES ('Vegetable');
INSERT INTO food_type (name) VALUES ('Meat');
INSERT INTO food_type (name) VALUES ('Grain');
INSERT INTO food_type (name) VALUES ('Fruit');
INSERT INTO food_type (name) VALUES ('Liquid');

INSERT INTO ingredient (name, type_id) VALUES('Quinoa', 5);
INSERT INTO ingredient (name, type_id) VALUES('Red Onion', 3);
INSERT INTO ingredient (name, type_id) VALUES('Red Bell Pepper', 3);
INSERT INTO ingredient (name, type_id) VALUES('Brocolli Florets', 3);
INSERT INTO ingredient (name, type_id) VALUES('Carrots', 3);
INSERT INTO ingredient (name, type_id) VALUES('Garlic', 1);
INSERT INTO ingredient (name, type_id) VALUES('Ginger', 1);
INSERT INTO ingredient (name, type_id) VALUES('Eggs', 2);
INSERT INTO ingredient (name, type_id) VALUES('Frozen Peas', 3);
INSERT INTO ingredient (name, type_id) VALUES('Soy Sauce', 7);
INSERT INTO ingredient (name, type_id) VALUES('Seasame Oil', 7);
INSERT INTO ingredient (name, type_id) VALUES('Green Onions', 3);
INSERT INTO ingredient (name, type_id) VALUES('Seasame Seeds', 1);
INSERT INTO ingredient (name, type_id) VALUES('Salt', 1);
INSERT INTO ingredient (name, type_id) VALUES('Olive Oil', 7);
INSERT INTO ingredient (name, type_id) VALUES('Boneless Skinless Chicken Thighs', 4);
INSERT INTO ingredient (name, type_id) VALUES('Sweet Chili Sauce', 7);
INSERT INTO ingredient (name, type_id) VALUES('Chinese 5-Spice', 1);
INSERT INTO ingredient (name, type_id) VALUES('Onion', 3);
INSERT INTO ingredient (name, type_id) VALUES('Ground Turkey', 4);
INSERT INTO ingredient (name, type_id) VALUES('Taco Seasoning', 1);
INSERT INTO ingredient (name, type_id) VALUES('Water', 7);
INSERT INTO ingredient (name, type_id) VALUES('Refried Beans', 3);

INSERT INTO recipe (name) VALUES ('Quinoa Fried Rice with Sticky Spiced Chicken');

INSERT INTO direction (directions, recipe_id) VALUES ('Season chicken with 5 spice and salt', 1);
INSERT INTO direction (directions, recipe_id) VALUES ('Cook in oil 5-7 minutes each side', 1);
INSERT INTO direction (directions, recipe_id) VALUES ('Brush sweet chili sauce and sesame seeds onto chicken when cooked', 1);
INSERT INTO direction (directions, recipe_id) VALUES ('Cook Quinoa', 1);
INSERT INTO direction (directions, recipe_id) VALUES ('Using the same pan as the chicken add onions, pepper, brocolli and carrots', 1);
INSERT INTO direction (directions, recipe_id) VALUES ('Add 1/2 tsp salt and some pepper. Cook for 7 minutes stirring a few times', 1);
INSERT INTO direction (directions, recipe_id) VALUES ('Add garlic, ginger and cook for 2 minutes', 1);
INSERT INTO direction (directions, recipe_id) VALUES ('Lightly beat eggs and add to pan stirring until a very soft scramble', 1);
INSERT INTO direction (directions, recipe_id) VALUES ('Add peas soy sauce, seasame oil, green onion and salt', 1);

INSERT INTO ingredient_list (recipe_id, ingredient_id, measurement) VALUES(1, 1, '1 1/4 Cups');
INSERT INTO ingredient_list (recipe_id, ingredient_id, measurement) VALUES(1, 2, '1/2');
INSERT INTO ingredient_list (recipe_id, ingredient_id, measurement) VALUES(1, 3, '1');
INSERT INTO ingredient_list (recipe_id, ingredient_id, measurement) VALUES(1, 4, '2 Cups');
INSERT INTO ingredient_list (recipe_id, ingredient_id, measurement) VALUES(1, 5, '2');
INSERT INTO ingredient_list (recipe_id, ingredient_id, measurement) VALUES(1, 6, '4 Cloves');
INSERT INTO ingredient_list (recipe_id, ingredient_id, measurement) VALUES(1, 7, '2 tsp');
INSERT INTO ingredient_list (recipe_id, ingredient_id, measurement) VALUES(1, 8, '4');
INSERT INTO ingredient_list (recipe_id, ingredient_id, measurement) VALUES(1, 9, '1 Cup');
INSERT INTO ingredient_list (recipe_id, ingredient_id, measurement) VALUES(1, 10, '1.5 tbs');
INSERT INTO ingredient_list (recipe_id, ingredient_id, measurement) VALUES(1, 11, '1 tsp');
INSERT INTO ingredient_list (recipe_id, ingredient_id, measurement) VALUES(1, 12, '1/4 Cup');
INSERT INTO ingredient_list (recipe_id, ingredient_id, measurement) VALUES(1, 13, '1 tbs');
INSERT INTO ingredient_list (recipe_id, ingredient_id, measurement) VALUES(1, 14, '1 tsp');
INSERT INTO ingredient_list (recipe_id, ingredient_id, measurement) VALUES(1, 15, '1 tbs');
INSERT INTO ingredient_list (recipe_id, ingredient_id, measurement) VALUES(1, 16, '10');
INSERT INTO ingredient_list (recipe_id, ingredient_id, measurement) VALUES(1, 17, '2-3 tbs');
INSERT INTO ingredient_list (recipe_id, ingredient_id, measurement) VALUES(1, 18, '2-3 tbs');

INSERT INTO recipe (name) VALUES ('Burritos');

INSERT INTO direction (directions, recipe_id) VALUES ('Cook Onion and Garlic on medium heat until transparent', 2);
INSERT INTO direction (directions, recipe_id) VALUES ('Add meat, cook until browned', 2);
INSERT INTO direction (directions, recipe_id) VALUES ('Add taco seasoning and water, simmer until thickened', 2);
INSERT INTO direction (directions, recipe_id) VALUES ('Add refried beans, simmer for 1-2 mins', 2);

INSERT INTO ingredient_list (recipe_id, ingredient_id, measurement) VALUES (2, 19, '1 small');
INSERT INTO ingredient_list (recipe_id, ingredient_id, measurement) VALUES (2, 6, '3 Cloves');
INSERT INTO ingredient_list (recipe_id, ingredient_id, measurement) VALUES (2, 20, '1 lb');
INSERT INTO ingredient_list (recipe_id, ingredient_id, measurement) VALUES (2, 21, '1 pkg');
INSERT INTO ingredient_list (recipe_id, ingredient_id, measurement) VALUES (2, 22, '2/3 Cup');
INSERT INTO ingredient_list (recipe_id, ingredient_id, measurement) VALUES (2, 23, '1 Can');