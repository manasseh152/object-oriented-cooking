-- Custom SQL migration file, put your code below! --

-- Seed the database with realistic data

-- Seed the measurement units
INSERT INTO measurement_units (id, name, abbreviation, description, type, system, conversion_factor, base_unit_id, is_base_unit, is_active) VALUES
(1, 'Gram', 'g', 'The base unit of mass in the metric system', 'weight', 'metric', 1, NULL, TRUE, TRUE),
(2, 'Kilogram', 'kg', 'A multiple of the gram', 'weight', 'metric', 1000, 1, FALSE, TRUE),
(3, 'Pound', 'lb', 'The base unit of mass in the imperial system', 'weight', 'imperial', 453.592, NULL, TRUE, TRUE),
(4, 'Ounce', 'oz', 'A multiple of the pound', 'weight', 'imperial', 28.3495, 3, FALSE, TRUE),
(5, 'Milliliter', 'ml', 'The base unit of volume in the metric system', 'volume', 'metric', 1, NULL, TRUE, TRUE),
(6, 'Liter', 'l', 'A multiple of the milliliter', 'volume', 'metric', 1000, 4, FALSE, TRUE),
(7, 'Fluid Ounce', 'fl oz', 'A unit of volume in the imperial system', 'volume', 'imperial', 29.5735, NULL, TRUE, TRUE),
(8, 'Gallon', 'gal', 'A multiple of the fluid ounce', 'volume', 'imperial', 3785.41, 5, FALSE, TRUE),
(9, 'Teaspoon', 'tsp', 'A unit of volume in the imperial system', 'volume', 'imperial', 4.92892, NULL, TRUE, TRUE),
(10, 'Tablespoon', 'tbsp', 'A multiple of the teaspoon', 'volume', 'imperial', 14.7868, 6, FALSE, TRUE),
(11, 'Cup', 'cup', 'A unit of volume in the imperial system', 'volume', 'imperial', 236.588, NULL, TRUE, TRUE),
(12, 'Pint', 'pt', 'A multiple of the cup', 'volume', 'imperial', 473.176, 7, FALSE, TRUE),
(13, 'Quart', 'qt', 'A multiple of the pint', 'volume', 'imperial', 946.353, 8, FALSE, TRUE);

-- Seed the ingredients
INSERT INTO ingredients (id, name, description) VALUES
(1, 'All Purpose Flour', 'A versatile wheat flour suitable for most baking needs'),
(2, 'Granulated Sugar', 'Regular white sugar used for baking and cooking'),
(3, 'Salt', 'Basic table salt for seasoning'),
(4, 'Butter', 'Dairy product made from churned cream'),
(5, 'Milk', 'Dairy product used in cooking and baking'),
(6, 'Instant Yeast', 'Dried yeast that can be added directly to dry ingredients'),
(7, 'Egg', 'Chicken egg used in baking and cooking'),
(8, 'Brown Sugar', 'Sugar with molasses added for flavor and color'),
(9, 'Caster Sugar', 'Finely ground white sugar that dissolves quickly'),
(10, 'Cinnamon Powder', 'Ground cinnamon spice'),
(11, 'Chicken Thighs', 'Boneless and skinless chicken thigh meat'),
(12, 'Corn Starch', 'Fine powder used for thickening and coating'),
(13, 'Baking Powder', 'Leavening agent used in baking'),
(14, 'Baking Soda', 'Leavening agent used in baking'),
(15, 'Vegetable Oil', 'Neutral cooking oil'),
(16, 'Hot Water', 'Boiling water used in cooking'),
(17, 'Ketchup', 'Tomato-based condiment'),
(18, 'Pineapple Juice', 'Juice extracted from pineapples'),
(19, 'Rice Wine Vinegar', 'Vinegar made from fermented rice'),
(20, 'Pineapple', 'Tropical fruit'),
(21, 'Red Onion', 'Purple-skinned onion variety'),
(22, 'Red Bell Pepper', 'Sweet red pepper'),
(23, 'Green Bell Pepper', 'Sweet green pepper'),
(24, 'Garlic', 'Aromatic bulb used in cooking'),
(25, 'Fried Garlic', 'Crispy fried garlic pieces'),
(26, 'Buttermilk', 'Fermented dairy product'),
(27, 'Garlic Powder', 'Dried ground garlic'),
(28, 'Serrano Powder', 'Dried ground serrano peppers'),
(29, 'Smoked Paprika', 'Dried and smoked ground paprika'),
(30, 'Black Pepper', 'Dried and ground peppercorns'),
(31, 'Cayenne Pepper', 'Dried and ground cayenne peppers'),
(32, 'Oyster Mushroom Powder', 'Dried and ground oyster mushrooms'),
(33, 'Mayonnaise', 'Egg-based condiment'),
(34, 'Black Garlic', 'Fermented garlic with a sweet, umami flavor'),
(35, 'Hot Sauce', 'Spicy condiment made from chili peppers'),
(36, 'Lemon Juice', 'Juice extracted from lemons');

-- Seed the tags
INSERT INTO tags (id, name, color, parent_id) VALUES
(1, 'Breakfast', '#FFD700', NULL),
(2, 'Lunch', '#FFA500', NULL),
(3, 'Dinner', '#FF4500', NULL),
(4, 'Snack', '#FF0000', NULL),
(5, 'Dessert', '#800080', NULL),
(6, 'Drink', '#0000FF', NULL),
(7, 'Baking', '#8B4513', NULL),
(8, 'Sweet', '#FF69B4', NULL),
(9, 'Bread', '#D2691E', 7),
(10, 'Pastry', '#DEB887', 7),
(11, 'Breakfast Pastry', '#DAA520', 10),
(12, 'Yeast', '#CD853F', 9),
(13, 'Cinnamon', '#8B0000', NULL),
(14, 'Dough Types', '#A0522D', 7),
(15, 'Yeast Dough', '#CD853F', 14),
(16, 'Sweet Dough', '#DAA520', 15),
(17, 'Filling Types', '#8B0000', 8),
(18, 'Cinnamon Filling', '#8B0000', 17),
(19, 'Fruit Filling', '#FF4500', 17),
(20, 'Cream Filling', '#FFE4E1', 17);

-- Add the Cinnamon Roll Recipe
INSERT INTO recipes (id, title, description, instructions, prep_time, cook_time, servings, difficulty, tag_id) VALUES
(1, 'A Delightful Cinnamon Roll Recipe', 'This recipe will guide you through creating soft, sweet cinnamon rolls, perfect for a comforting treat.', 'A detailed recipe for making delicious cinnamon rolls from scratch.', 30, 20, 12, 'medium', 11); -- 11 is the ID for Breakfast Pastry tag

-- Add the recipe ingredients
INSERT INTO recipe_ingredients (recipe_id, ingredient_id, unit_id, quantity, notes) VALUES
-- Sweet Dough Ingredients
(1, 1, 1, 580, 'All-purpose flour'), -- Flour in grams
(1, 2, 1, 110, 'Granulated sugar'), -- Sugar in grams
(1, 3, 1, 6, 'Salt'), -- Salt in grams
(1, 4, 1, 85, 'Unsalted butter, cold and cut into small cubes'), -- Butter in grams
(1, 5, 5, 235, 'Whole milk recommended'), -- Milk in milliliters
(1, 6, 1, 7, 'Instant yeast'), -- Yeast in grams
(1, 7, 1, 3, 'Large eggs, lightly beaten'), -- Eggs in count
-- Cinnamon-Sugar Filling Ingredients
(1, 8, 1, 225, 'Light or dark brown sugar'), -- Brown sugar in grams
(1, 9, 1, 20, 'Caster sugar (superfine sugar)'), -- Caster sugar in grams
(1, 10, 1, 20, 'Ground cinnamon'), -- Cinnamon in grams
(1, 4, 1, 85, 'Unsalted butter, softened to room temperature'); -- Butter in grams

-- Add the recipe steps
INSERT INTO steps (recipe_id, "order", instruction, duration) VALUES
(1, 1, 'In a large mixing bowl, thoroughly combine the all-purpose flour, granulated sugar, and salt.', 5),
(1, 2, 'Add the cold, cubed butter to the flour mixture. Using a pastry blender, your fingertips, or two forks, cut in the butter until the mixture resembles coarse breadcrumbs.', 10),
(1, 3, 'In a separate small bowl or measuring jug, gently warm the milk to approximately 38°C (100°F) – it should feel lukewarm. Add the instant yeast to the warm milk and stir until it is completely dissolved.', 5),
(1, 4, 'Create a well in the center of the dry ingredients. Pour in the milk-yeast mixture and the lightly beaten eggs. Gradually draw the dry ingredients into the wet, mixing until a cohesive, somewhat shaggy dough begins to form.', 10),
(1, 5, 'Continue to mix the dough (with a stand mixer fitted with a dough hook, or by hand) for an additional 3 minutes. Transfer the dough to a lightly floured surface. Knead for approximately 8-10 minutes, until it becomes smooth, elastic, and less tacky.', 15),
(1, 6, 'Place the dough ball into a large, lightly greased bowl, turning it once to ensure all surfaces are coated with a thin layer of oil. Cover the bowl with plastic wrap or a clean, damp kitchen towel. Allow the dough to rest in a warm, draft-free environment for approximately 90 minutes, or until it has doubled in volume.', 90),
(1, 7, 'Once risen, gently deflate the dough by pressing it down. Turn it out onto a lightly floured work surface. Using a rolling pin, roll the dough into a large rectangle, aiming for a uniform thickness of approximately 0.5 to 1 centimeter.', 10),
(1, 8, 'In a medium bowl, combine the brown sugar, caster sugar, and ground cinnamon. Mix these ingredients thoroughly until evenly distributed.', 5),
(1, 9, 'Spread the softened butter evenly over the entire surface of the rolled-out dough, leaving a narrow border (about 1-2 cm) along one of the longer edges; this will help seal the rolls later. Sprinkle the prepared cinnamon-sugar mixture uniformly over the buttered surface.', 10),
(1, 10, 'Using a sharp knife or a pizza cutter, cut the dough rectangle, perpendicular to one of its longer sides, into strips approximately 5 centimeters wide. Carefully take each strip and roll it up from one short end to the other to form a spiral. Arrange these individual cinnamon rolls on a baking tray lined with parchment paper, typically with a cut edge facing upwards to display the swirl.', 15),
(1, 11, 'Cover the baking tray loosely with plastic wrap or a kitchen towel. Allow the rolls to rest in a warm place for about 1 hour, or until they have visibly increased in size and appear puffy. Towards the end of this second rising period, preheat your oven to 190°C (375°F).', 60),
(1, 12, 'Place the baking tray in the preheated oven. Bake for 15-20 minutes, or until the cinnamon rolls are a rich golden brown on top and are fully cooked through. An internal temperature of around 90-93°C (195-200°F) typically indicates they are done. Allow the rolls to cool on the tray for a few minutes before transferring them to a wire rack. Serve warm for the best experience.', 20);
