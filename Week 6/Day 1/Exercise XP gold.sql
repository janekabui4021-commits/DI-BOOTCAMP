
SELECT first_name, last_name, birth_date 
FROM students 
FETCH FIRST 4 ROWS ONLY 
ORDER BY last_name ASC;


SELECT first_name, last_name, birth_date 
FROM students 
ORDER BY birth_date DESC 
LIMIT 1;


SELECT first_name, last_name, birth_date 
FROM students 
OFFSET 2 
LIMIT 3;