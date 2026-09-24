DROP TABLE IF EXISTS FirstTab;
DROP TABLE IF EXISTS SecondTab;

CREATE TABLE FirstTab (
	id INTEGER,
	name VARCHAR(10)
);

INSERT INTO FirstTab (id, name) VALUES
	(5, 'Pawan'),
	(6, 'Sharlee'),
	(7, 'Krish'),
	(NULL, 'Avtaar');

CREATE TABLE SecondTab (
	id INTEGER
);

INSERT INTO SecondTab (id) VALUES
	(5),
	(NULL);

SELECT 'Q1' AS question, COUNT(*) AS answer
FROM FirstTab AS ft
WHERE ft.id NOT IN (
	SELECT id FROM SecondTab WHERE id IS NULL
)

UNION ALL

SELECT 'Q2' AS question, COUNT(*) AS answer
FROM FirstTab AS ft
WHERE ft.id NOT IN (
	SELECT id FROM SecondTab WHERE id = 5
)

UNION ALL

SELECT 'Q3' AS question, COUNT(*) AS answer
FROM FirstTab AS ft
WHERE ft.id NOT IN (
	SELECT id FROM SecondTab
)

UNION ALL

SELECT 'Q4' AS question, COUNT(*) AS answer
FROM FirstTab AS ft
WHERE ft.id NOT IN (
	SELECT id FROM SecondTab WHERE id IS NOT NULL
);
