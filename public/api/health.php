<?php

require __DIR__ . '/bootstrap.php';

require_method('GET');
database();
json_response(['ok' => true]);