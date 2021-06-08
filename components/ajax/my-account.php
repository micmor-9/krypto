<?php
  require_once '../classes/user.php';
  require_once '../classes/database.php';

  session_start();

  $user_id = $_SESSION['uid'];
  $user = User::getUserById($user_id);

  die(json_encode($user->getData()));

?>