<?php

require __DIR__ . '/bootstrap.php';

require_method('GET');
json_response(['authenticated' => true, 'admin' => require_admin()]);