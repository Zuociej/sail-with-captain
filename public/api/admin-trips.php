<?php

require __DIR__ . '/bootstrap.php';

require_method('GET');
require_admin();
$db = database();
$query = $db->query(
    'SELECT id, title, region, image_url AS image, dates, duration, price,
            spots_left AS spotsLeft, total_spots AS totalSpots, description, is_active
     FROM trips ORDER BY dates ASC, id ASC',
);

json_response(['trips' => $query->fetchAll()]);