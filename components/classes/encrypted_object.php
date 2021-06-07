<?php

  class EncryptedObject {

    private $obj_id;
    private $timeout;
    private $content;
    private $key_id;
    private $key;
    private $user_id;
    private $file_download_link;

    function __construct($timeout, $content, $user_id, $obj_id = null, $file_download_link = null) {
      $this->timeout = $timeout;
      $this->content = $content;
      $this->user_id = $user_id;
      if($obj_id != null) {
        $this->obj_id = $obj_id;
      }
      if($file_download_link != null) {
        $this->file_download_link = $file_download_link;
      }
    }

    function getData() {
      $data = array(
        'objectID'  => $this->getObjectId(),
        'timeout'   => $this->getTimeout(),
        'content'   => $this->getContent(),
        'user'      => $this->getUser(),
        'fileDownloadLink' => $this->getFileDownloadLink()
      );

      return $data;
    }

    function getObjectId() {
      return $this->obj_id;
    }

    function getContent() {
      return $this->content;
    }

    function getKey() {
      $db = new Database();
      $conn = $db->getConnection();

      $stmt = $conn->prepare("SELECT * FROM pass_key WHERE key_id = (?)");
      if($stmt == false) {
        die('prepare() failed: ' . htmlspecialchars($conn->error));
      }

      $stmt->bind_param("i", $this->key_id);
      if ( $stmt == false ) {
        die('bind_param() failed: ' . htmlspecialchars($stmt->error));
      }

      $stmt->execute();
      if($stmt->errno == 0) {
        $res = $stmt->get_result();
        $key = $res->fetch_assoc();

        if($key) {
          $_key = $key['key_value'];
          $stmt->close();
          $db->closeConnection();
          $this->key = $_key;
          return $_key;
        } else {
          $stmt->close();
          $db->closeConnection();
          return false;
        }
      } else {
        $stmt->close();
        $db->closeConnection();
        return false;
      }
    }

    function getUser() {
      $user = User::getUserById($this->user_id);

      return $user->getData();
    }

    function getTimeout() {
      return $this->timeout;
    }

    function getFileDownloadLink() {
      return $this->file_download_link;
    }

    function insertObject($key) {
      $db = new Database();
      $conn = $db->getConnection();

      $result = array(); 

      $stmt = $conn->prepare("INSERT INTO pass_key (key_value, key_length) VALUES (?, ?)");
      if($stmt == FALSE) {
        die('prepare() failed: ' . htmlspecialchars($conn->error));
      }

      $key_length = strlen($key);

      $stmt->bind_param("si", $key, $key_length);
      if ( false == $stmt ) {
        die('bind_param() failed: ' . htmlspecialchars($stmt->error));
      }

      $stmt->execute();
      if($stmt->errno == 0) {
        $this->key_id = $conn->insert_id;
        $stmt->close();
      } else {
        $result['status'] = 'error';
        $result['output'] = $stmt->error;
        $stmt->close();
        $db->closeConnection();
        return $result;
      }

      //Generate 8-char unique ID from key
      $this->obj_id = substr(md5(substr($key, 0, 8)), 0, 8);

      $stmt = $conn->prepare("INSERT INTO encrypted_object (obj_id, timeout, content, file_download_link, qr_value, qr_download_link, user_id, key_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
      if($stmt == FALSE) {
        die('prepare() failed: ' . htmlspecialchars($conn->error));
      }

      $obj_id = $this->obj_id;
      $timeout = $this->timeout;
      $content = $this->content;
      $file_download_link = $this->file_download_link;
      $qr_value = 'https://'.$_SERVER['HTTP_HOST'].'/decryption?obj='.$this->obj_id;
      $qr_download_link = 'https://api.qrserver.com/v1/create-qr-code/?data='.$qr_value.'&size=150x150';
      $user_id = $this->user_id;
      $key_id = $this->key_id;

      $stmt->bind_param("ssssssii", $obj_id, $timeout, $content, $file_download_link, $qr_value, $qr_download_link, $user_id, $key_id);
      if ( false == $stmt ) {
        die('bind_param() failed: ' . htmlspecialchars($stmt->error));
      }

      $stmt->execute();
      if($stmt->errno == 0) {
        $result['status'] = 'success';
        $result['output'] = $this->obj_id;
        $stmt->close();
        $db->closeConnection();
        return $result;
      } else {
        $result['status'] = 'error';
        $result['output'] = $stmt->error;
        $stmt->close();
        $db->closeConnection();
        return $result;
      }
    }

    static function getObjectById($id) {
      $db = new Database();
      $conn = $db->getConnection();

      $stmt = $conn->prepare("SELECT * FROM encrypted_object WHERE obj_id = (?)");
      if($stmt == false) {
        die('prepare() failed: ' . htmlspecialchars($conn->error));
      }

      $stmt->bind_param("s", $id);
      if ( $stmt == false ) {
        die('bind_param() failed: ' . htmlspecialchars($stmt->error));
      }

      $stmt->execute();
      if($stmt->errno == 0) {
        $res = $stmt->get_result();
        $encrypted_object = $res->fetch_assoc();

        if($encrypted_object) {
          $_object = new EncryptedObject($encrypted_object['timeout'], $encrypted_object['content'], $encrypted_object['user_id'], $encrypted_object['obj_id'], $encrypted_object['file_download_link']);
          $stmt->close();
          $db->closeConnection();
          return $_object;
        } else {
          $stmt->close();
          $db->closeConnection();
          return false;
        }
      } else {
        $stmt->close();
        $db->closeConnection();
        return false;
      }
    }

  }

?>