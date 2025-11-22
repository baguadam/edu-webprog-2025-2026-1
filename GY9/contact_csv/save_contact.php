<?php

$name = $_GET['name'] ?? '';
$email = $_GET['email'] ?? '';
$phone = $_GET['phone'] ?? '';

if ($name === '' || $email === '' || $phone === '') {
    die("Missing fields: name, email and phone are required");
}

$file = @fopen("contacts.csv", "a");
if (!$file) {
    die("Could not open contacts.csv...");
}

fputcsv($file, [$name, $email, $phone], escape: ',');
fclose($file);

echo "Contact saved!";