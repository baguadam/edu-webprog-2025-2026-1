<?php
include("storage.php");
include("contactstorage.php");

$data = [];
$errors = [];

function validate($post, &$data, &$errors) {
    if (!isset($_POST["name"])) {
        $errors["name"] = "Name is required!";
    } else if (trim($post["name"]) === "") {
        $errors["name"] = "Name is empty";
    } else {
        $data["name"] = $post["name"];
    }

    if (!isset($post["phone"])) {
        $errors["phone"] = "Phone is required!";
    } else if (trim($post["phone"]) === "") {
        $errors["phone"] = "Phone is empty!";
    } else if (!filter_var($post["phone"], FILTER_VALIDATE_REGEXP, [
        "options" => [
            "regexp" => "/^\+\d{11,13}$/"
        ]
    ])) {
        $errors["phone"] = "Phone has wrong format!";
    } else {
        $data["phone"] = $post["phone"];
    }

    return count($errors) === 0;
}

if (count($_POST) > 0) {
    if (validate($_POST, $data, $errors)) {
        $cs = new ContactStorage();
        $cs->add($data);
        echo "Data added!";
    }
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contacts</title>
</head>
<body>
    <h1>New Contact</h1>
    <form action="" method="POST">
        Name:
        <input type="text" name="name" required value="<?= $_POST["name"] ?? "" ?>"/>
        <?php if(isset($errors["name"])) : ?>
            <span><?= $errors["name"] ?></span>
        <?php endif; ?>
        <br/>
        Phone:
        <input type="text" name="phone" value="<?= $_POST["phone"] ?? "" ?>"/>
        <?php if(isset($errors["phone"])) : ?>
            <span><?= $errors["phone"] ?></span>
        <?php endif; ?>
        <br/>
        <button type="submit">Add</button>
    </form>
</body>
</html>