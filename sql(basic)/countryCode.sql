SELECT customer_id, name, concat("+", country_code, phone_number) FROM customers
NATURAL JOIN country_codes ORDER BY customer_id;