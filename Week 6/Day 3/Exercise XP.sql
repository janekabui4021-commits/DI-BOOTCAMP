-- 1. Get all languages
SELECT * FROM language;

-- 2. Get films joined with their languages
SELECT f.title, f.description, l.name AS language_name
FROM film f
INNER JOIN language l ON f.language_id = l.language_id;

-- 3. Get all languages, including those without films
SELECT f.title, f.description, l.name AS language_name
FROM language l
LEFT JOIN film f ON l.language_id = f.language_id;