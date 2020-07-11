CREATE TABLE "tasks" 
("id" SERIAL PRIMARY KEY, "title" VARCHAR(80), 
"completed" BOOLEAN DEFAULT false, "description" VARCHAR(240));

INSERT INTO "tasks" ("title", "description")
VALUES ('Learn to Code', 'Sit in front of the computer and google for hours and hours and hours.'), 
('Learn how to poach an egg', 'Poached eggs are the best eggs'), 
('Play fetch with your cat', 'Yes, my cat and I play fetch sometimes.');