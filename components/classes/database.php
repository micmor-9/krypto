<?php

  class Database {

    /* CONNECTION PARAMETERS */
    private $DB_HOST;
    private $DB_USER;
    private $DB_PASSWORD;
    private $DB_NAME;

    private $connection;
    /* --------------------- */

    function __construct() {
      /* Get settings from ini file */
      $path = $_SERVER['DOCUMENT_ROOT'];
      $ini_data = parse_ini_file($path.'/config/db.ini');

      $this->DB_HOST = $ini_data['DB_HOST'];
      $this->DB_USER = $ini_data['DB_USER'];
      $this->DB_PASSWORD = $ini_data['DB_PASSWORD'];
      $this->DB_NAME = $ini_data['DB_NAME'];

      /* Try connection to the database */
      $this->connection = $this->connect();

      if(!$this->connection) {
        return false;
      }
      
      $sql = 'SHOW TABLES FROM '.$this->DB_NAME;
      $result = $this->connection->query($sql);

      /* If empty, run the setup of the database. */
      if($result->num_rows == 0) {
        if(!($this->setup())){
          echo 'There has been an error in the setup of database.';
        }
      }
    }

    function setup() {
      //DB Tables inizialization
      //Table: user
      $sql = "CREATE TABLE user ( user_id INT NOT NULL AUTO_INCREMENT , email VARCHAR(30) NOT NULL UNIQUE , first_name VARCHAR(30) NOT NULL , last_name VARCHAR(30) NOT NULL , password VARCHAR(200) NOT NULL , birthdate DATE NOT NULL , PRIMARY KEY (user_id));";
      $result = $this->connection->query($sql);
      
      if(!$result) {
        echo 'Error while creating table user. '.$this->connection->error;
        return false;
      }

      //Table: key
      $sql = "CREATE TABLE pass_key ( key_id INT NOT NULL AUTO_INCREMENT , key_value VARCHAR(200) NOT NULL, PRIMARY KEY (key_id));";
      $result = $this->connection->query($sql);
      
      if(!$result) {
        echo 'Error while creating table key. '.$this->connection->error;
        return false;
      }

      //Table: ecnrypted_object
      $sql = "CREATE TABLE encrypted_object ( obj_id VARCHAR(8) NOT NULL UNIQUE , timeout DATE NOT NULL , content VARCHAR(1000) NULL, qr_value VARCHAR(100) NOT NULL , qr_download_link VARCHAR(150) NOT NULL, user_id INT NOT NULL, key_id INT NOT NULL, PRIMARY KEY (obj_id), FOREIGN KEY (user_id) REFERENCES user(user_id), FOREIGN KEY (key_id) REFERENCES pass_key(key_id));";
      $result = $this->connection->query($sql);
      
      if(!$result) {
        echo 'Error while creating table encrypted_object. '.$this->connection->error;
        return false;
      }

      return true;
    }

    function connect() {
      if(!isset($this->DB_HOST) || !isset($this->DB_USER) || !isset($this->DB_PASSWORD) || !isset($this->DB_NAME)) {
        return false;
      } else {
        $mysqli = new mysqli($this->DB_HOST, $this->DB_USER, $this->DB_PASSWORD, $this->DB_NAME);      
        return $mysqli;
      }
    }

    function getConnection() {
      return $this->connection;
    }

    function closeConnection() {
      $this->connection->close();
    }

  }
