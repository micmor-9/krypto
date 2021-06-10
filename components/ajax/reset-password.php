<?php
  require_once '../classes/user.php';
  require_once '../classes/database.php';

  $email = $_POST['email'];

  if($email == null) {
    $result = array(
      //No email provided
      'result' => 'email'
    );
    die(json_encode($result));
  }

  //Try to match the email address to an existing user
  $user = User::findUserByEmail($email);

  if($user) {
    if($user->resetPassword()) {
      //Password reset successful
      $result = array(
        'result' => 'success'
      );
      die(json_encode($result));
    } else {
      //Password reset error
      $result = array(
        'result' => 'password'
      );
      die(json_encode($result));
    }
  } else {
    //No user found
    $result = array(
      'result' => 'user'
    );
    die(json_encode($result));
  }

?>