<?php
include("auth.php");
include("userstorage.php");

session_start();

$user_storage = new UserStorage();
$auth = new Auth($user_storage);

$auth->logout();
header('Location: index.php');
exit();