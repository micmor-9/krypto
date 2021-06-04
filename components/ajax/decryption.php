<?php
  require_once '../classes/user.php';
  require_once '../classes/database.php';
  require_once '../classes/encrypted_object.php';

  if(isset($_POST['object'])) {
    $object = EncryptedObject::getObjectById($_POST['object']);
    if($object) {
      die(json_encode($object->getData()));
    } else {
      die(json_encode(array(
        'status' => 'error'
      )));
    }
  }

?>