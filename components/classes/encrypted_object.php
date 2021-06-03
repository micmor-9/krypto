<?php

  class EncryptedObject {

    private $obj_id;
    private $timeout;
    private $content;
    private $key_id;
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

    function getObectId() {
      return $this->obj_id;
    }

    function getContent() {
      return $this->content;
    }

    function getKey() {
      return $this->key_id;
    }

    function getUser() {
      return $this->user_id;
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

      $stmt = $conn->prepare("INSERT INTO pass_key (key_value, key_length) VALUES (?, ?)");
      if($stmt == FALSE) {
        die('prepare() failed: ' . htmlspecialchars($conn->error));
      }

      $stmt->bind_param("si", $key, $key_length);
      if ( false == $stmt ) {
        die('bind_param() failed: ' . htmlspecialchars($stmt->error));
      }

      $key_length = strlen($key);

      $stmt->execute();
      if($stmt->errno == 0) {
        $this->key_id = $conn->insert_id;
        $stmt->close();
      } else {
        $stmt->close();
        $db->closeConnection();
        return $stmt->error;
      }

      //Generate 8-char unique ID from key
      $this->obj_id = substr(md5(substr($key, 0, 8)), 0, 8);

      $stmt = $conn->prepare("INSERT INTO encrypted_object (obj_id, timeout, content, file_download_link, qr_value, qr_download_link, user_id, key_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
      if($stmt == FALSE) {
        die('prepare() failed: ' . htmlspecialchars($conn->error));
      }

      $stmt->bind_param("ssssssii", $obj_id, $timeout, $content, $file_download_link, $qr_value, $qr_download_link, $user_id, $key_id);
      if ( false == $stmt ) {
        die('bind_param() failed: ' . htmlspecialchars($stmt->error));
      }

      $obj_id = $this->obj_id;
      $timeout = $this->timeout;
      $content = $this->content;
      $file_download_link = $this->file_download_link;
      $qr_value = 'https://'.$_SERVER['HTTP_HOST'].'/decryption?obj='.$this->obj_id;
      $qr_download_link = 'https://api.qrserver.com/v1/create-qr-code/?data='.$qr_value.'&size=150x150';
      $user_id = $this->user_id;
      $key_id = $this->key_id;

      $stmt->execute();
      if($stmt->errno == 0) {
        $stmt->close();
        $db->closeConnection();
        return $this->obj_id;
      } else {
        $error = $stmt->error;
        $stmt->close();
        $db->closeConnection();
        return $error;
      }
    }

    



  }

?>