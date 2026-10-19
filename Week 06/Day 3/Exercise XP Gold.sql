-- DVD Rental Database: Exercise 1 - DVD Rentals

-
DROP VIEW IF EXISTS outstanding_rentals;

CREATE VIEW outstanding_rentals AS
SELECT
	r.rental_id,
	r.rental_date,
	r.customer_id,
	c.first_name,
	c.last_name,
	i.inventory_id,
	f.film_id,
	f.title
FROM rental AS r
JOIN customer AS c ON c.customer_id = r.customer_id
JOIN inventory AS i ON i.inventory_id = r.inventory_id
JOIN film AS f ON f.film_id = i.film_id
WHERE r.return_date IS NULL;

-- 1. All rentals which are out.
SELECT *
FROM outstanding_rentals
ORDER BY rental_date;

-- 2. Customers who have not returned rentals, grouped by customer.
SELECT
	customer_id,
	first_name,
	last_name,
	COUNT(*) AS outstanding_rental_count
FROM outstanding_rentals
GROUP BY customer_id, first_name, last_name
ORDER BY last_name, first_name;

-- 3. Action films featuring Joe Swank.
SELECT DISTINCT f.title
FROM film AS f
JOIN film_actor AS fa ON fa.film_id = f.film_id
JOIN actor AS a ON a.actor_id = fa.actor_id
JOIN film_category AS fc ON fc.film_id = f.film_id
JOIN category AS cat ON cat.category_id = fc.category_id
WHERE a.first_name = 'Joe'
  AND a.last_name = 'Swank'
  AND cat.name = 'Action'
ORDER BY f.title;


-- DVD Rental Database: Exercise 2 - Happy Halloween

-- 1. Store locations and the number of stores in each city and country.
DROP TABLE IF EXISTS store_locations;

CREATE TABLE store_locations AS
SELECT
	co.country,
	ci.city,
	COUNT(s.store_id)::INTEGER AS store_count
FROM store AS s
JOIN address AS ad ON ad.address_id = s.address_id
JOIN city AS ci ON ci.city_id = ad.city_id
JOIN country AS co ON co.country_id = ci.country_id
GROUP BY co.country, ci.city;

SELECT *
FROM store_locations
ORDER BY country, city;

-- 2, 3 and 7. Returned inventory viewing time by store, in minutes,
-- hours, and days. Unreturned rentals are excluded from the calculation.
DROP TABLE IF EXISTS store_viewing_time;

CREATE TABLE store_viewing_time AS
SELECT
	i.store_id,
	SUM(f.length)::INTEGER AS viewing_minutes,
	ROUND(SUM(f.length) / 60.0, 2) AS viewing_hours,
	ROUND(SUM(f.length) / 1440.0, 2) AS viewing_days
FROM inventory AS i
JOIN film AS f ON f.film_id = i.film_id
WHERE NOT EXISTS (
		SELECT 1
		FROM rental AS r
		WHERE r.inventory_id = i.inventory_id
			AND r.return_date IS NULL
)
GROUP BY i.store_id;

SELECT *
FROM store_viewing_time
ORDER BY store_id;

-- 4. All customers in cities where stores are located.
SELECT DISTINCT
	c.customer_id,
	c.first_name,
	c.last_name,
	ci.city,
	co.country
FROM customer AS c
JOIN address AS ca ON ca.address_id = c.address_id
JOIN city AS ci ON ci.city_id = ca.city_id
JOIN country AS co ON co.country_id = ci.country_id
WHERE EXISTS (
	SELECT 1
	FROM store AS s
	JOIN address AS sa ON sa.address_id = s.address_id
	WHERE sa.city_id = ca.city_id
)
ORDER BY co.country, ci.city, c.last_name, c.first_name;

-- 5. All customers in countries where stores are located.
SELECT DISTINCT
	c.customer_id,
	c.first_name,
	c.last_name,
	co.country
FROM customer AS c
JOIN address AS ad ON ad.address_id = c.address_id
JOIN city AS ci ON ci.city_id = ad.city_id
JOIN country AS co ON co.country_id = ci.country_id
WHERE co.country_id IN (
	SELECT DISTINCT sci.country_id
	FROM store AS s
	JOIN address AS sad ON sad.address_id = s.address_id
	JOIN city AS sci ON sci.city_id = sad.city_id
)
ORDER BY co.country, c.last_name, c.first_name;

-- 6 and 7. The CHECK constraint protects the textual part of the safe list.
-- Category exclusion is applied when rows are inserted because a CHECK
-- constraint cannot query film_category in PostgreSQL.
DROP TABLE IF EXISTS safe_movies;

CREATE TABLE safe_movies (
	film_id INTEGER PRIMARY KEY,
	title VARCHAR(255) NOT NULL,
	description TEXT NOT NULL,
	length INTEGER NOT NULL CHECK (length >= 0),
	CONSTRAINT safe_movie_text CHECK (
		title !~* '(beast|monster|ghost|dead|zombie|undead)'
		AND description !~* '(beast|monster|ghost|dead|zombie|undead)'
	)
);

INSERT INTO safe_movies (film_id, title, description, length)
SELECT f.film_id, f.title, f.description, f.length
FROM film AS f
WHERE NOT EXISTS (
	SELECT 1
	FROM film_category AS fc
	JOIN category AS cat ON cat.category_id = fc.category_id
	WHERE fc.film_id = f.film_id
	  AND cat.name = 'Horror'
)
AND f.title !~* '(beast|monster|ghost|dead|zombie|undead)'
AND f.description !~* '(beast|monster|ghost|dead|zombie|undead)';

SELECT
	COUNT(*) AS safe_movie_count,
	SUM(length) AS safe_viewing_minutes,
	ROUND(SUM(length) / 60.0, 2) AS safe_viewing_hours,
	ROUND(SUM(length) / 1440.0, 2) AS safe_viewing_days
FROM safe_movies;
