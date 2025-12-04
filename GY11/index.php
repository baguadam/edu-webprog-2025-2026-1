<?php
include("auth.php");
include("userstorage.php");

session_start();

$user_storage = new UserStorage();
$auth = new Auth($user_storage);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kezdőlap</title>
</head>
<body>
    <?php if($auth->is_authenticated()): ?>
        <a href="add.php">Hozzáadás</a>
        <a href="logout.php">Kijelentkezés</a>
    <?php else: ?>
        <a href="login.php">Bejelentkezés</a>
        <a href="register.php">Regisztráció</a>
    <?php endif; ?>
</body>
</html>