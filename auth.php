<?php
if (isset($_GET['action'])) {
  require_once 'components/classes/database.php';
  require_once 'components/classes/user.php';

  $action = $_GET['action'];

  if ($action != 'register' && $action != 'login') {
    header('location: login');
  }

  switch ($action) {
    case 'register':
      $user = new User($_POST['usrFirstName'], $_POST['usrLastName'], $_POST['usrEmail'], $_POST['usrPassword'], $_POST['usrBirthdate']);
      if ($user->registerUser()) {
        //Registration completed successfully
        header('location: login?result=register');
      } else {
        //Error occurred during registration
        header('location: register?result=error');
      }
      break;

    case 'login':
      $usrEmail = $_POST['usrEmail'];
      $usrPassword = $_POST['usrPassword'];
      $usrRememberCheck = (isset($_POST['usrRememberCheck'])) ? true : false;

      if ($usrEmail != '' && $usrPassword != '') {
        //Check if user with email exists
        $user = User::findUserByEmail($usrEmail);
        if ($user) {
          //User found successfully, now check passwords
          $check = $user->checkPassword($usrPassword);
          if ($check) {
            //Passwords match, proceed to login
            echo 'Login successful.';
            $uid = $user->getUserId();
            $logged_in = time();
            session_start();
            $_SESSION['uid'] = $uid;
            $_SESSION['logged_in'] = $logged_in;
            if ($usrRememberCheck) {
              $cookie_content = sha1(md5($user->getEmail()) . md5($user->getPassword()));
              setcookie('AUTH_ID', $user->getUserId(),  time() + 60 * 60 * 24, '/', '.krypto.poliba.com', true);
              setcookie('AUTH_TOKEN', $cookie_content,  time() + 60 * 60 * 24, '/', '.krypto.poliba.com', true);
            }
            header("location: /");
          } else {
            //Passwords don't match, reject login with error
            header('location: login?result=password');
          }
        } else {
          //No user found
          header('location: login?result=user');
        }
      }
      break;
  }
}

//Function that checks if user is logged through session or through cookie
//If login == true, redirect to login, else to index
function checkAuth($login = false) {
  //Check if a session has already been created.
  session_start();
  var_dump($_SESSION);
  var_dump($_COOKIE);
  if (isset($_SESSION['uid']) || isset($_SESSION['logged_in'])) {
    if ((time() - $_SESSION['logged_in']) <= 3600) {
      return User::getUserById($_SESSION['uid']);
    } else {
      session_unset();
      header('location: login?result=session');
    }
  } else {
    //Check if cookie is set.
    if (isset($_COOKIE['AUTH_ID']) && isset($_COOKIE['AUTH_TOKEN'])) {
      //There is a cookie, check its integrity.
      $user = User::getUserById($_COOKIE['AUTH_ID']);
      if ($user) {
        $cookieCheck = sha1(md5($user->getEmail()) . md5($user->getPassword()));
        if ($_COOKIE['AUTH_TOKEN'] === $cookieCheck) {
          //Cookie check successful. Fill session data.
          $uid = $user->getUserId();
          $logged_in = time();
          //Fill session data.
          $_SESSION['uid'] = $uid;
          $_SESSION['logged_in'] = $logged_in;
          return $user;
        } else {
          //Integrity check failed. Unset cookies and redirect to login
          setcookie('AUTH_ID', null,  1, '/', '.krypto.poliba.com', true);
          setcookie('AUTH_TOKEN', null,  1, '/', '.krypto.poliba.com', true);
          session_unset();
          header('location: login');
        }
      }
    }
  }
}
