<?php 
$default_color = "#800000ff";
$color = $_GET['color'] ?? $default_color;
$color = urldecode($color); // hex formátumú

$reg = '/^#[0-9a-f]{6}$/i';
if (!preg_match($reg, $color)) {
    $color = $default_color;
}
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
</body>
</html>