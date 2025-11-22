<?php
$file = @fopen("contacts.csv", "r");

if (!$file) {
    die("Could not open contacts.csv for reading...");
}

$contacts = [];
while (($row = fgetcsv($file, escape: ',')) !== false) {
    if (count($row) < 3) {
        continue;
    }

    $contacts[] = [
        'name'  => $row[0],
        'email' => $row[1],
        'phone' => $row[2]
    ];
}

fclose($file);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contacts</title>
</head>
<body>
    <table>
        <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
        </tr>
        <?php foreach($contacts as $contact): ?>
            <tr>
                <td><?= $contact['name'] ?></td>
                <td><?= $contact['email'] ?></td>
                <td><?= $contact['phone'] ?></td>
            </tr>
        <?php endforeach; ?>
    </table>
</body>
</html>
