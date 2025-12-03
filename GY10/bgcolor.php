<?php 
session_start();

print_r($_GET);
print_r($_SESSION);

$default_color = "#800000ff";

// feldolgozás
if (isset($_GET['color'])) {
    $color = $_GET['color'] ?? $default_color;
    $color = urldecode($color); // hex formátumú    
} else {
    $color = $_SESSION['bgcolor'];
}

$reg = '/^#[0-9a-f]{6}$/i';
if (!preg_match($reg, $color)) {
    $color = $default_color;
}

// kiírás
$_SESSION['bgcolor'] = $color; 
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Háttérszín</title>
</head>
<body style="background-color: <?= $color ?>;">
    <form action="" method="GET">
        <input type="color" name="color" id="" value="<?= $color ?>">
        <button type="submit">Küldés!</button>
    </form>
    <a href="http://localhost:3001/index.php">Kezdőlap</a>    
</body>
</html>