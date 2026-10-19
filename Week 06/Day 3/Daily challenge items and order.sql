-- Daily Challenge: Items and Orders

-- Drop objects in dependency order so this script can be run again.
DROP FUNCTION IF EXISTS total_order_price(INTEGER);
DROP FUNCTION IF EXISTS total_user_order_price(INTEGER, INTEGER);
DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS product_orders;
DROP TABLE IF EXISTS users;


-- 1 and 2. One product_order can have many items. Each item belongs to
-- exactly one order through this foreign key.
CREATE TABLE product_orders (
	order_id SERIAL PRIMARY KEY,
	order_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE items (
	item_id SERIAL PRIMARY KEY,
	order_id INTEGER NOT NULL REFERENCES product_orders(order_id) ON DELETE CASCADE,
	item_name VARCHAR(100) NOT NULL,
	price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
	quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0)
);


-- 3. Return the total price for one order.
CREATE FUNCTION total_order_price(order_id_input INTEGER)
RETURNS NUMERIC(12, 2)
LANGUAGE SQL
STABLE
AS $$
	SELECT COALESCE(SUM(i.price * i.quantity), 0)::NUMERIC(12, 2)
	FROM items AS i
	WHERE i.order_id = order_id_input;
$$;


-- Bonus 1 and 2. One user can have many product orders.
CREATE TABLE users (
	user_id SERIAL PRIMARY KEY,
	username VARCHAR(100) NOT NULL UNIQUE
);

ALTER TABLE product_orders
ADD COLUMN user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE;


-- Bonus 3. Return the total only when the order belongs to the user.
CREATE FUNCTION total_user_order_price(
	user_id_input INTEGER,
	order_id_input INTEGER
)
RETURNS NUMERIC(12, 2)
LANGUAGE SQL
STABLE
AS $$
	SELECT COALESCE(SUM(i.price * i.quantity), 0)::NUMERIC(12, 2)
	FROM items AS i
	JOIN product_orders AS po ON po.order_id = i.order_id
	WHERE po.order_id = order_id_input
	  AND po.user_id = user_id_input;
$$;


-- Test data.
INSERT INTO users (username)
VALUES ('alice'), ('bob');

INSERT INTO product_orders (user_id)
VALUES
	((SELECT user_id FROM users WHERE username = 'alice')),
	((SELECT user_id FROM users WHERE username = 'bob'));

INSERT INTO items (order_id, item_name, price, quantity)
VALUES
	(1, 'Notebook', 4.50, 2),
	(1, 'Pen', 1.25, 3),
	(2, 'Backpack', 25.00, 1);

-- Expected totals: order 1 = 12.75, order 2 = 25.00.
SELECT order_id, total_order_price(order_id) AS total_price
FROM product_orders
ORDER BY order_id;

SELECT total_user_order_price(
	(SELECT user_id FROM users WHERE username = 'alice'),
	(SELECT order_id FROM product_orders WHERE user_id = (
		SELECT user_id FROM users WHERE username = 'alice'
	) ORDER BY order_id LIMIT 1)
) AS alice_order_total;
