<!doctype html>
<html lang="en">

<?php
global $title;
global $loggedUser;
$title = 'Krypto, data hiding at its finest';
require_once 'components/head.php';

$loggedUser = checkAuth();

if($loggedUser instanceof User) {
  //User is logged, show application
  include 'controller.php';
} else {
  //User is not logged, show intro
  include 'intro.php';
}

?>

