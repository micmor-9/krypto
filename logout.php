<?php

  session_start();
	if(isset($_SESSION['uid']) && isset($_SESSION['logged_in'])){
		$_SESSION = array();
		if (isset($_COOKIE['AUTH_ID']) || isset($_COOKIE['AUTH_TOKEN'])) {
			setcookie('AUTH_ID', null,  1, '/', '.krypto.poliba.com', true);
      setcookie('AUTH_TOKEN', null,  1, '/', '.krypto.poliba.com', true);
		}
		session_unset();
		session_destroy();
	}
  
  header('location: /');

?>