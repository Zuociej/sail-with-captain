<?php

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

function is_https(): bool
{
    return (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
        || ($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https';
}

function require_https(): void
{
    if (!is_https() && ($_SERVER['SERVER_NAME'] ?? '') !== 'localhost') {
        json_response(['error' => 'HTTPS is required.'], 426);
    }
}

function json_response(mixed $data, int $status = 200): never
{
    http_response_code($status);
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function request_body(): array
{
    $body = json_decode(file_get_contents('php://input'), true);
    return is_array($body) ? $body : [];
}

function database(): PDO
{
    $configPath = __DIR__ . '/config.php';
    if (!is_file($configPath)) {
        json_response(['error' => 'Server database configuration is missing.'], 500);
    }

    $config = require $configPath;
    $dsn = sprintf(
        'mysql:host=%s;dbname=%s;port=%d;charset=utf8mb4',
        $config['host'],
        $config['name'],
        $config['port'] ?? 3306,
    );

    try {
        return new PDO($dsn, $config['user'], $config['password'], [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]);
    } catch (PDOException) {
        json_response(['error' => 'Database connection failed.'], 500);
    }
}

function require_method(string $method): void
{
    if ($_SERVER['REQUEST_METHOD'] !== $method) {
        header('Allow: ' . $method);
        json_response(['error' => 'Method not allowed.'], 405);
    }
}

function require_fields(array $data, array $fields): void
{
    foreach ($fields as $field) {
        if (!isset($data[$field]) || trim((string) $data[$field]) === '') {
            json_response(['error' => "Missing field: {$field}"], 422);
        }
    }
}

function start_secure_session(): void
{
    if (session_status() === PHP_SESSION_ACTIVE) {
        return;
    }

    ini_set('session.use_strict_mode', '1');
    session_set_cookie_params([
        'httponly' => true,
        'secure' => is_https(),
        'samesite' => 'Lax',
        'path' => '/',
    ]);
    session_start();
}

function require_admin(): array
{
    start_secure_session();
    if (empty($_SESSION['admin_id'])) {
        json_response(['error' => 'Authentication required.'], 401);
    }

    return [
        'id' => (int) $_SESSION['admin_id'],
        'username' => (string) ($_SESSION['admin_username'] ?? ''),
    ];
}