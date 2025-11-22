<?php
$notes = [
  ["title" => "Shopping list", "text" => "Milk, Bread, Bananas"],
  ["title" => "Reminder", "text" => "Call mom"]
];

$json = json_encode($notes, JSON_PRETTY_PRINT);
file_put_contents("notes.json", $json);
echo "Notes saved to notes.json\n";