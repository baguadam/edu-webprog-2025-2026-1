<?php 
$errors = [];
$data = [];

if (!isset($_POST['name'])) {
    $errors['name'] = "Hiányzik a név!";
} else if (empty($_POST['name'])) {
    $errors['name'] = "Nem lehet üres a név!";
} else {
    $data['name'] = $_POST['name'];
}

if (!isset($_POST['email'])) {
    $errors['email'] = "Hiányzó email!";
} else if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = "Nem megfelelő formátum!";
} else {
    $data['email'] = $_POST['email'];
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ibiza</title>
</head>
<body>
    <form action="" method="POST">
        <label for="name">Név</label>
        <input type="text" name="name" value="<?= $data['name'] ?? '' ?>">
        <span style="background-color: red;"><?= $errors['name'] ?? "" ?></span>

        <label for="email">Email</label>
        <input type="email" name="email" value="<?= $data['email'] ?? '' ?>">
        <span style="background-color: red;"><?= $errors['email'] ?? "" ?></span>

        <label for="account">Számlaszám</label>
        <input type="text" name="account">

        <select name="date" id="cars">
            <option value="january">Január</option>
            <option value="february">Február</option>
            <option value="july">Július</option>
        </select>

        <label for="accepted">Elfogadod?</label>
        <input type="checkbox">

        <button type="submit">Elküldés</button>
    </form>
</body>
</html>