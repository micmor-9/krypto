<?php
  require_once '../classes/user.php';
  require_once '../classes/database.php';
  require_once '../classes/encrypted_object.php';

  session_start();
  $content = $_POST['content'];
  $timeout = $_POST['timeout'];
  $user_id = $_SESSION['uid'];
  $key = $_POST['key'];
  $encrypted_key = $_POST['encryptedKey'];
  $password = $_POST['password'];

  if($content == null || $timeout == null || $user_id == null || $key == null || $password == null || $encrypted_key == null) {
    die(json_encode(array(
      'status' => 'error',
      'output' => 'data'
    )));
  }

  $current_user = User::getUserById($user_id);
  if($current_user->checkPassword($password)) {
    $encrypted_object = new EncryptedObject($timeout, $content, $user_id);
    $res = $encrypted_object->insertObject($encrypted_key);
    die(json_encode($res));
  } else {
    die(json_encode(array(
      'status' => 'error',
      'output' => 'password'
    )));
  }

?>