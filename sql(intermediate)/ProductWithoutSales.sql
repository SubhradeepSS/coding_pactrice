SELECT a.sku, a.product_name from Product a WHERE a.id NOT IN (
    SELECT b.product_id FROM Invoice_Item b
) ORDER BY a.sku;