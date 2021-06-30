<?php
if (isset($_GET['action'])) {
  require_once 'components/classes/database.php';
  require_once 'components/classes/user.php';

  //Determino l'operazione da effettuare
  $action = $_GET['action'];

  if ($action != 'register' && $action != 'login') {
    header('location: login');
  }

  switch ($action) {
    case 'register':
      //Registrazione
      $user = new User($_POST['usrFirstName'], $_POST['usrLastName'], $_POST['usrEmail'], $_POST['usrPassword'], $_POST['usrBirthdate']);
      if ($user->registerUser()) {
        //Registrazione completata con successo
        header('location: login?result=register');
      } else {
        //Si è verificato un errore durante la registrazione
        header('location: register?result=error');
      }
      break;

    case 'login':
      $usrEmail = $_POST['usrEmail'];
      $usrPassword = $_POST['usrPassword'];
      $usrRememberCheck = (isset($_POST['usrRememberCheck'])) ? true : false;

      if ($usrEmail != '' && $usrPassword != '') {
        //Verifica se esiste un utente associato all'email inserita
        $user = User::findUserByEmail($usrEmail);
        if ($user) {
          //Utente trovato con successo, ora verifica le password
          $check = $user->checkPassword($usrPassword);
          if ($check) {
            //Le password corrispondono, procedi con il login
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
            //Le password non corrispondono, segnala errore
            header('location: login?result=password');
          }
        } else {
          //Nessun utente trovato
          header('location: login?result=user');
        }
      }
      break;
  }
}

//Funzione che verifica se l'utente è loggato tramite sessione o cookie
function checkAuth() {
  //Verifico se è già presente una sessione in memoria
  session_start();
  if (isset($_SESSION['uid']) || isset($_SESSION['logged_in'])) {
    if ((time() - $_SESSION['logged_in']) <= 3600) {
      $_SESSION['logged_in'] = time();
      return User::getUserById($_SESSION['uid']);
    } else {
      session_unset();
      header('location: login?result=session');
    }
  } else {
    //Verifico se è già presente un cookie in memoria
    if (isset($_COOKIE['AUTH_ID']) && isset($_COOKIE['AUTH_TOKEN'])) {
      //Cookie presente, verifico integrità
      $user = User::getUserById($_COOKIE['AUTH_ID']);
      if ($user) {
        $cookieCheck = sha1(md5($user->getEmail()) . md5($user->getPassword()));
        if ($_COOKIE['AUTH_TOKEN'] === $cookieCheck) {
          //Cookie integro. Inserisco dati nella sessione
          $uid = $user->getUserId();
          $logged_in = time();
          //Dati sessione
          $_SESSION['uid'] = $uid;
          $_SESSION['logged_in'] = $logged_in;
          return $user;
        } else {
          //Cookie non integro, sessione distrutta e reindirizzo al login
          setcookie('AUTH_ID', null,  1, '/', '.krypto.poliba.com', true);
          setcookie('AUTH_TOKEN', null,  1, '/', '.krypto.poliba.com', true);
          session_unset();
          header('location: login');
        }
      }
    } else {
      //L'utente non è loggato
      if(isset($_GET['obj'])) {
        header('location: login');
      }
    }
  }
}
