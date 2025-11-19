<?php
$errors = [];

function validate_name($input, &$errors) {
    if (!isset($input)) {
        $errors['name'] = "Nem érkezett név!";
    } else if (empty($input)) {
        $errors['name'] = "Nincs név megadva!";
    } else if (strlen(trim($input)) < 3) {
        $errors['name'] = "Túl rövid...";
    }

    return count($errors) === 0;
}

$is_valid = $_GET && isset($_GET['name']) && validate_name($_GET['name'], $errors);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Üdvözlés</title>
</head>
<body>
    <h1>Üdvözlő oldal</h1>
    <a href="welcome.php?name=John">John</a>
    <form action="" method="GET">
        <input type="text" name="name" id="">
        <button type="submit">Küldés</button>
    </form>
    <?php if ($is_valid): ?>
        <h2>Üdv, <?=  $_GET['name']  ?></h2>
    <?php endif; ?> 

    <?php foreach($errors as $error): ?>
        <h3>Error: <?= $error ?></h3>
    <?php endforeach; ?>
</body>
</html>