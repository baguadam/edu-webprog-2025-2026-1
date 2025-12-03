<?php
include("musicstorage.php");

$data = [];
$errors = [];
$ms = new MusicStorage();

function validate($values, &$data, &$errors) {
    if (!isset($values["author"]) || trim($values["author"]) === '') {
        $errors["author"] = "A szerző megadása kötelező";
    } else {
        $data["author"] = $values["author"];
    }

    if (!isset($values["song"]) || trim($values["song"]) === '') {
        $errors["song"] = "A zeneszám megadása kötelező";
    } else {
        $data["song"] = $values["song"];
    }

    if (!isset($values["year"]) || trim($values["year"]) === "") {
        $errors["year"] = "Az év megadása kötelező";
    } else if (!filter_var($values["year"], FILTER_VALIDATE_INT)) {
        $errors["year"] = "At év egész szám kell, hogy legyen";
    } else {
        $year = (int)$values["year"];
        if ($year < 1900 || $year > 2025) {
            $errors["year"] = "Az év 1900 és 2025 között kell, hogy legyen";
        } else {
            $data["year"] = $year;
        }
    }

    return count($errors) === 0;
}

if (count($_POST) > 0) {
    if (validate($_POST, $data, $errors)) {
        $ms->add($data);
    }
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Zenerszám hozzáadása</title>
    <style>
        input + small {
            color: red;
        }
    </style>
</head>
<body>
    <form action="" method="POST">
        Előadó:
        <input type="text" name="author" id="" value="<?= $_POST["author"] ?? "" ?>"/>
        <?php if (isset($errors["author"])) : ?>
            <small><?= $errors["author"] ?></small>
        <?php endif; ?>
        <br/>
        Szám címe:
        <input type="text" name="song" id="" value="<?= $_POST["song"] ?? "" ?>"/>
        <?php if (isset($errors["song"])) : ?>
            <small><?= $errors["song"] ?></small>
        <?php endif; ?>
        <br/>
        Évjárat:
        <input type="number" name="year" id="" value="<?= $_POST["year"] ?? "" ?>"/>
        <?php if (isset($errors["year"])) : ?>
            <small><?= $errors["year"] ?></small>
        <?php endif; ?>
        <br/>
        <button type="submit">Elküld</button>
    </form>
</body>
</html>