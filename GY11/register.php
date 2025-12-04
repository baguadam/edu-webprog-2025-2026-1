<?php
include("auth.php");
include("userstorage.php");

$errors = [];
$data = [];

function validate($values, &$data, &$errors) {
    if (!isset($values["username"]) || trim($values["username"]) === '') {
        $errors["username"] = "A felhasználónév megadása kötelező";
    } else {
        $data["username"] = $values["username"];
    }

    if (!isset($values["password"]) || trim($values["password"]) === '') {
        $errors["password"] = "A jelszó megadása kötelező";
    } else {
        $data["password"] = $values["password"];
    }

    if (!isset($values["fullname"]) || trim($values["fullname"]) === '') {
        $errors["fullname"] = "A teljes név megadása kötelező";
    } else {
        $data["fullname"] = $values["fullname"];
    }

    return count($errors) === 0;
}

if (count($_POST) > 0) {
    if (validate($_POST, $data, $errors)) {
        $user_storage = new UserStorage();
        $auth = new Auth($user_storage);

        if ($auth->user_exists($data['username'])) {
            $errors['global'] = "Ilyen felhasználó már létezik!";
        } else {
            $auth->register($data);

            header('Location: index.php');
            exit();
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Regisztráció</title>
    <style>
        small {
            color: red;
        }
    </style>
</head>
<body>
    <h1>Regisztráció</h1>
    <form action="" method="POST">
        Felhasználónév:
        <input type="text" name="username" id="" value="<?= $_POST["username"] ?? "" ?>"/>
        <?php if (isset($errors["username"])) : ?>
            <small><?= $errors["username"] ?></small>
        <?php endif; ?>
        <br/>

        Jelszó:
        <input type="password" name="password" id="" value="<?= $_POST["password"] ?? "" ?>"/>
        <?php if (isset($errors["password"])) : ?>
            <small><?= $errors["password"] ?></small>
        <?php endif; ?>
        <br/>

        Teljes név:
        <input type="text" name="fullname" id="" value="<?= $_POST["fullname"] ?? "" ?>"/>
        <?php if (isset($errors["fullname"])) : ?>
            <small><?= $errors["fullname"] ?></small>
        <?php endif; ?>
        <br/>

        <button type="submit">Elküld</button>
    </form>

    <?php if (isset($errors["global"])) : ?>
        <small><?= $errors["global"] ?></small>
    <?php endif; ?>
</body>
</html>