<?php 
require_once 'components/classes/database.php';
require_once 'components/classes/user.php';
$valid = true;

$action = $_GET['action'];
echo $action;

if (isset($action)) {
	if ($action != 'register' && $action != 'login') {
		$valid = false;
	}
} else {
	$valid = false;
}

if (!$valid) {
	//header('location: /');
  die();
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

    if($usrEmail != '' && $usrPassword != '') {
      //Check if user with email exists
      $user = User::findUserByEmail($usrEmail);
      if($user) {
        //User found successfully, now check passwords
        $check = $user->checkPassword($usrPassword);
        if($check) {
          //Passwords match, proceed to login

          //TODO authentication
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
?>

