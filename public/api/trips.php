<?php

require __DIR__ . '/bootstrap.php';

require_method('GET');
$db = database();
$query = $db->query(
    'SELECT id, title, region, image_url AS image, dates, duration, price,
            spots_left AS spotsLeft, total_spots AS totalSpots, description
     FROM trips
     WHERE is_active = 1
     ORDER BY dates ASC, id ASC',
);

json_response(['trips' => $query->fetchAll()]);