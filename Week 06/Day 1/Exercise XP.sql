


CREATE TABLE IF NOT EXISTS items (
    item_id SERIAL PRIMARY KEY,
    item_name VARCHAR(100) NOT NULL,
    price INT NOT NULL
);

CREATE TABLE IF NOT EXISTS customers (
    customer_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL
);

-- 2. Insert Data
INSERT INTO items (item_name, price) 
VALUES 
    ('Small Desk', 100),
    ('Large desk', 300),
    ('Fan', 80);

INSERT INTO customers (first_name, last_name) 
VALUES 
    ('Greg', 'Jones'),
    ('Sandra', 'Jones'),
    ('Scott', 'Scott'),
    ('Trevor', 'Green'),
    ('Melanie', 'Johnson');

-- 3. Fetch Data Queries

-- All the items
SELECT * FROM items;

-- All the items with a price above 80 (80 not included)
SELECT * FROM items WHERE price > 80;

-- All the items with a price below 300 (300 included)
SELECT * FROM items WHERE price <= 300;

-- All customers whose last name is 'Smith'
-- Outcome: An empty result set (0 rows returned) because no customer with the last name 'Smith' exists in the table.
SELECT * FROM customers WHERE last_name = 'Smith';

-- All customers whose last name is 'Jones'
SELECT * FROM customers WHERE last_name = 'Jones';

-- All customers whose firstname is not 'Scott'
SELECT * FROM customers WHERE first_name != 'Scott';