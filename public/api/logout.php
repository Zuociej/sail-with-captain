<?php

require __DIR__ . '/bootstrap.php';

require_https();
require_method('POST');
start_secure_session();
$_SESSION = [];
if (ini_get('session.use_cookies')) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000, $params['path'], '', $params['secure'], $params['httponly']);
}
session_destroy();
json_response(['authenticated' => false]);