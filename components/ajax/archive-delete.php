<?php
  require_once '../classes/user.php';
  require_once '../classes/database.php';
  require_once '../classes/encrypted_object.php';

  $archive = EncryptedObject::deleteObject($_POST['id']);
  if($archive) {
    die(true);
  } else {
    die(false);
  }

?>