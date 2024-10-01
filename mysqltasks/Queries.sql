-- Retrieve Product Information
SELECT product_id, product_name, price, description, image_url
FROM products
WHERE is_active = 1;


-- Manage User Data

INSERT INTO users (username, password, email, created_at)
VALUES ('new_user', 'hashed_password', 'user@example.com', NOW());


-- Login

SELECT user_id, username
FROM users
WHERE email = 'user@example.com' AND password = 'hashed_password';

-- Profile Update

UPDATE users
SET username = 'updated_username', email = 'updated_email@example.com'
WHERE user_id = 1;

-- Shopping Cart Operations

-- Add Item

INSERT INTO shopping_cart (user_id, product_id, quantity)
VALUES (1, 101, 2)
ON DUPLICATE KEY UPDATE quantity = quantity + 2;

-- remove item

DELETE FROM shopping_cart
WHERE user_id = 1 AND product_id = 101;


-- Generate and Retrieve Order Information

-- Create Order

INSERT INTO orders (user_id, total_amount, order_date)
VALUES (1, 100.00, NOW());

-- Retrieve Order Details

SELECT o.order_id, o.order_date, o.total_amount, p.product_name, oc.quantity
FROM orders o
JOIN order_contents oc ON o.order_id = oc.order_id
JOIN products p ON oc.product_id = p.product_id
WHERE o.user_id = 1;


-- Retrieve and Update Product Inventory

-- Retrieve Inventory Levels

SELECT product_id, product_name, stock_quantity
FROM products;

-- Update Inventory Levels

UPDATE products
SET stock_quantity = stock_quantity - 2
WHERE product_id = 101;


-- Manage User Reviews and Ratings

-- Add Review

INSERT INTO product_reviews (user_id, product_id, rating, review, created_at)
VALUES (1, 101, 5, 'Great product!', NOW());

-- Retrieve Reviews

SELECT r.rating, r.review, u.username
FROM product_reviews r
JOIN users u ON r.user_id = u.user_id
WHERE r.product_id = 101;


-- Retrieve Data for Generating Reports

-- sales Figures

SELECT SUM(total_amount) AS total_sales, COUNT(order_id) AS total_orders
FROM orders
WHERE order_date >= '2024-01-01';


-- Popular Products

SELECT p.product_id, p.product_name, COUNT(oc.product_id) AS order_count
FROM order_contents oc
JOIN products p ON oc.product_id = p.product_id
GROUP BY p.product_id
ORDER BY order_count DESC
LIMIT 10;


-- Handle Discount Codes

-- Add Discount Code

INSERT INTO discount_codes (code, discount_percentage, expiration_date)
VALUES ('SAVE10', 10, '2024-12-31');


-- Apply Discount Code

SELECT discount_percentage
FROM discount_codes
WHERE code = 'SAVE10' AND expiration_date > NOW();


-- Manage User Wishlists
-- Add to Wishlist

INSERT INTO wishlists (user_id, product_id)
VALUES (1, 101)
ON DUPLICATE KEY UPDATE added_at = NOW();

-- Retrieve Wishlist Items


SELECT p.product_id, p.product_name
FROM wishlists w
JOIN products p ON w.product_id = p.product_id
WHERE w.user_id = 1;