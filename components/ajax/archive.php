<?php
  require_once '../classes/user.php';
  require_once '../classes/database.php';
  require_once '../classes/encrypted_object.php';

  session_start();

  if(isset($_POST['user_id'])) {
    if($_POST['user_id'] == $_SESSION['uid']) {
      //User matches the one logged in
      $archive = User::getArchive($_POST['user_id']);

      die(json_encode($archive));
    } else {
      die('stong cca');
    }
    
  }

?>