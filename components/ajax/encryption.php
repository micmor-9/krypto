<?php
  require_once '../classes/user.php';
  require_once '../classes/database.php';
  require_once '../classes/encrypted_object.php';

  $content = $_POST['content'];
  $timeout = $_POST['timeout'];
  $user_id = $_POST['user_id'];
  $key = $_POST['key'];

  if($content == null || $timeout == null || $user_id == null || $key == null) {
    die('Error');
  }

  $encrypted_object = new EncryptedObject($timeout, $content, $user_id);
  $res = $encrypted_object->insertObject($key);

  die(json_encode($res));

?>