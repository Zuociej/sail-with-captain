<?php

require __DIR__ . '/bootstrap.php';

require_method('POST');
$data = request_body();
require_fields($data, ['trip_id', 'full_name', 'email', 'phone']);

$email = filter_var($data['email'], FILTER_VALIDATE_EMAIL);
if ($email === false) {
    json_response(['error' => 'Invalid email address.'], 422);
}

$db = database();
$db->beginTransaction();

try {
    $trip = $db->prepare('SELECT id FROM trips WHERE id = ? AND is_active = 1 AND spots_left > 0 FOR UPDATE');
    $trip->execute([(int) $data['trip_id']]);
    if (!$trip->fetch()) {
        $db->rollBack();
        json_response(['error' => 'This trip is sold out or unavailable.'], 409);
    }

    $application = $db->prepare(
        'INSERT INTO trip_applications (trip_id, full_name, email, phone, message)
         VALUES (?, ?, ?, ?, ?)',
    );
    $application->execute([
        (int) $data['trip_id'],
        trim((string) $data['full_name']),
        $email,
        trim((string) $data['phone']),
        trim((string) ($data['message'] ?? '')),
    ]);

    $update = $db->prepare('UPDATE trips SET spots_left = spots_left - 1 WHERE id = ? AND spots_left > 0');
    $update->execute([(int) $data['trip_id']]);
    $db->commit();
    json_response(['ok' => true], 201);
} catch (Throwable) {
    if ($db->inTransaction()) {
        $db->rollBack();
    }
    json_response(['error' => 'Application could not be saved.'], 500);
}