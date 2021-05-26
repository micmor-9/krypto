<?php

  class Database {

    /* CONNECTION PARAMETERS */
    static $DB_HOST;
    static $DB_USER;
    static $DB_PASSWORD;
    static $DB_NAME;
    /* -------------------.- */

    function __construct() {
      /* Get settings from ini file */
      $path = $_SERVER['DOCUMENT_ROOT'];
      $ini_data = parse_ini_file($path.'/config/db.ini');
      var_dump($ini_data);
    }

    function setup() {

    }

    function connect() {

    }

  }

?>
