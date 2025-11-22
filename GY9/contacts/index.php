<?php
include("storage.php");
include("contactstorage.php");

$cs = new ContactStorage();
$contacts = $cs->findAll();
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
            <th>Phone</th>
        </tr>
        <?php foreach($contacts as $contact): ?>
            <tr>
                <td><?= $contact['name'] ?></td>
                <td><?= $contact['phone'] ?></td>
            </tr>
        <?php endforeach; ?>
    </table>
</body>
</html>