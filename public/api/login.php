<?php

require __DIR__ . '/bootstrap.php';

require_https();
require_method('POST');
$data = request_body();
require_fields($data, ['username', 'password']);

$username = trim((string) $data['username']);
$password = (string) $data['password'];
$ip = substr((string) ($_SERVER['REMOTE_ADDR'] ?? 'unknown'), 0, 45);
$db = database();

$recent = $db->prepare(
    'SELECT COUNT(*) FROM login_attempts
     WHERE ip_address = ? AND attempted_at > (NOW() - INTERVAL 15 MINUTE)',
);
$recent->execute([$ip]);
if ((int) $recent->fetchColumn() >= 5) {
    json_response(['error' => 'Too many login attempts. Try again later.'], 429);
}

$userQuery = $db->prepare(
    'SELECT id, username, password_hash FROM admin_users
     WHERE username = ? AND is_active = 1 LIMIT 1',
);
$userQuery->execute([$username]);
$user = $userQuery->fetch();

if (!$user || !password_verify($password, $user['password_hash'])) {
    $attempt = $db->prepare('INSERT INTO login_attempts (ip_address, username) VALUES (?, ?)');
    $attempt->execute([$ip, $username]);
    json_response(['error' => 'Invalid credentials.'], 401);
}

start_secure_session();
session_regenerate_id(true);
$_SESSION['admin_id'] = (int) $user['id'];
$_SESSION['admin_username'] = $user['username'];

$db->prepare('DELETE FROM login_attempts WHERE ip_address = ?')->execute([$ip]);
$db->prepare('UPDATE admin_users SET last_login_at = NOW() WHERE id = ?')->execute([$user['id']]);
json_response(['authenticated' => true, 'username' => $user['username']]);