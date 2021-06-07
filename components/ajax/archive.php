<?php
  require_once '../classes/user.php';
  require_once '../classes/database.php';
  require_once '../classes/encrypted_object.php';

  session_start();

  $user_id = $_SESSION['uid'];

  //User matches the one logged in
  $archive = User::getArchive($user_id);
  die(json_encode($archive));    

?>