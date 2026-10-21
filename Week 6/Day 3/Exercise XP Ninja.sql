-- DVD Rental Database: Children's Waiting List

-- 1. G and PG films with at least one available inventory copy.
-- A copy is available when it has never been rented or its rental was returned.
SELECT DISTINCT
		f.film_id,
		f.title,
		f.rating
FROM film AS f
JOIN inventory AS i ON i.film_id = f.film_id
WHERE f.rating IN ('G', 'PG')
	AND NOT EXISTS (
			SELECT 1
			FROM rental AS r
			WHERE r.inventory_id = i.inventory_id
				AND r.return_date IS NULL
	)
ORDER BY f.rating, f.title;


-- 2. Waiting list for children's movies.

DROP TABLE IF EXISTS children_waiting_list;

CREATE TABLE children_waiting_list (
		waiting_list_id SERIAL PRIMARY KEY,
		film_id INTEGER NOT NULL REFERENCES film(film_id) ON DELETE CASCADE,
		child_name VARCHAR(100) NOT NULL,
		requested_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- 3. Test data: two children wait for one film and one child waits for
-- another. The first two available G/PG films are selected dynamically.
WITH available_children_films AS (
		SELECT DISTINCT
				f.film_id,
				ROW_NUMBER() OVER (ORDER BY f.film_id) AS film_number
		FROM film AS f
		JOIN inventory AS i ON i.film_id = f.film_id
		WHERE f.rating IN ('G', 'PG')
			AND NOT EXISTS (
					SELECT 1
					FROM rental AS r
					WHERE r.inventory_id = i.inventory_id
						AND r.return_date IS NULL
			)
), test_waiting_list (film_number, child_name) AS (
		VALUES
				(1, 'Amina'),
				(1, 'David'),
				(2, 'Maya')
)
INSERT INTO children_waiting_list (film_id, child_name)
SELECT acf.film_id, twl.child_name
FROM available_children_films AS acf
JOIN test_waiting_list AS twl
	ON twl.film_number = acf.film_number;

-- Count the people waiting for every available G/PG film, including films
-- whose waiting-list count is zero.
WITH available_children_films AS (
		SELECT DISTINCT
				f.film_id,
				f.title,
				f.rating
		FROM film AS f
		JOIN inventory AS i ON i.film_id = f.film_id
		WHERE f.rating IN ('G', 'PG')
			AND NOT EXISTS (
					SELECT 1
					FROM rental AS r
					WHERE r.inventory_id = i.inventory_id
						AND r.return_date IS NULL
			)
)
SELECT
		acf.film_id,
		acf.title,
		acf.rating,
		COUNT(cwl.waiting_list_id) AS people_waiting
FROM available_children_films AS acf
LEFT JOIN children_waiting_list AS cwl
			 ON cwl.film_id = acf.film_id
GROUP BY acf.film_id, acf.title, acf.rating
ORDER BY acf.rating, acf.title;
