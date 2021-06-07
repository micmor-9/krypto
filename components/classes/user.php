<?php 

  class User {
    
    private $user_id;
    private $first_name;
    private $last_name;
    private $email;
    private $password;
    private $birthdate;

    function __construct($f_name, $l_name, $e_mail, $psw, $bd, $id = null) {
      $this->first_name = $f_name;
      $this->last_name = $l_name;
      $this->email = $e_mail;
      $this->password = $psw;
      $this->birthdate = $bd;
      $this->user_id = $id;
    }

    function getUserId() {
      return $this->user_id;
    }

    function getData() {
      $data = array(
        'userID'  => $this->getUserId(),
        'firstName'   => $this->getFirstName(),
        'lastName'   => $this->getLastName(),
        'email'      => $this->getEmail(),
        'birthdate' => $this->getBirthdate()
      );

      return $data;
    }

    function getFirstName() {
      return $this->first_name;
    }

    function getLastName() {
      return $this->last_name;
    }

    function getEmail() {
      return $this->email;
    }

    function getPassword() {
      return $this->password;
    }

    function getBirthdate() {
      return $this->birthdate;
    }

    function registerUser() {
      $db = new Database();
      $conn = $db->getConnection();

      $stmt = $conn->prepare("INSERT INTO user (email, first_name, last_name, password, birthdate) VALUES (?, ?, ?, ?, ?)");
      if($stmt == FALSE) {
        die('prepare() failed: ' . htmlspecialchars($conn->error));
      }

      $email = $this->email;
      $firstName = $this->first_name;
      $lastName = $this->last_name;
      $password = password_hash($this->password, PASSWORD_DEFAULT);
      $birthdate = $this->birthdate;

      $stmt->bind_param("sssss", $email, $firstName, $lastName, $password, $birthdate);
      if ( false == $stmt ) {
        die('bind_param() failed: ' . htmlspecialchars($stmt->error));
      }

      $stmt->execute();
      if($stmt->errno == 0) {
        $this->user_id = $conn->insert_id;
        $stmt->close();
        $db->closeConnection();
        return $this->user_id;
      } else {
        $stmt->close();
        $db->closeConnection();
        return false;
      }
    }

    static function findUserByEmail($email) {
      $db = new Database();
      $conn = $db->getConnection();

      $stmt = $conn->prepare("SELECT * FROM user WHERE email = (?)");
      if($stmt == FALSE) {
        die('prepare() failed: ' . htmlspecialchars($conn->error));
      }

      $stmt->bind_param("s", $email);
      if ( false == $stmt ) {
        die('bind_param() failed: ' . htmlspecialchars($stmt->error));
      }

      $stmt->execute();
      if($stmt->errno == 0) {
        $res = $stmt->get_result();
        $user = $res->fetch_assoc();

        if($user['user_id'] != 0) {
          $_user = new User($user['first_name'], $user['last_name'], $user['email'], $user['password'], $user['birthdate'], $user['user_id']);
          return $_user;
        } else {
          return false;
        }
        $stmt->close();
        $db->closeConnection();
        return true;
      } else {
        $stmt->close();
        $db->closeConnection();
        return false;
      }
    }

    static function getUserById($id) {
      $db = new Database();
      $conn = $db->getConnection();

      $stmt = $conn->prepare("SELECT * FROM user WHERE user_id = (?)");
      if($stmt == false) {
        die('prepare() failed: ' . htmlspecialchars($conn->error));
      }

      $stmt->bind_param("i", $id);
      if ( $stmt == false ) {
        die('bind_param() failed: ' . htmlspecialchars($stmt->error));
      }

      $stmt->execute();
      if($stmt->errno == 0) {
        $res = $stmt->get_result();
        $user = $res->fetch_assoc();

        if($user) {
          $_user = new User($user['first_name'], $user['last_name'], $user['email'], $user['password'], $user['birthdate'], $user['user_id']);
          $stmt->close();
          $db->closeConnection();
          return $_user;
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

    static function getArchive( $user_id ) {
      $db = new Database();
      $conn = $db->getConnection();

      $stmt = $conn->prepare("SELECT obj_id, timeout, content, file_download_link, qr_value, qr_download_link, key_value FROM encrypted_object, pass_key WHERE user_id = (?) AND encrypted_object.key_id = pass_key.key_id");
      if($stmt == false) {
        die('prepare() failed: ' . htmlspecialchars($conn->error));
      }

      $stmt->bind_param("i", $user_id);
      if ( $stmt == false ) {
        die('bind_param() failed: ' . htmlspecialchars($stmt->error));
      }

      $stmt->execute();
      if($stmt->errno == 0) {
        $res = $stmt->get_result();
        $objects = array();
        
        if($res->num_rows > 0) {
          while($_object = $res->fetch_assoc()) {
            array_push($objects, $_object);
          }
          $stmt->close();
          $db->closeConnection();
          return $objects;
        } else {
          $stmt->close();
          $db->closeConnection();
          return false;
        }
      } else {
        $stmt->close();
        $db->closeConnection();
        return $stmt->error;
      }
    }

    function checkPassword( $psw ) {
      return password_verify($psw, $this->password);
    }

  }
