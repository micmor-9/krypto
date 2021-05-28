<?php
  global $title;
  $title = 'Register | Krypto';
  require_once 'components/head.php';

  if(isset($_GET['action'])){
    require_once 'components/classes/database.php';
    require_once 'components/classes/user.php';

    if($_GET['action'] == 'register') {
      $user = new User($_POST['usrFirstName'], $_POST['usrLastName'], $_POST['usrEmail'], $_POST['usrPassword'], $_POST['usrBirthdate']);
      if($user->registerUser()){
        header('location: login?action=success');
      } else {
        header('location: register?action=register-error');
      }
    } else {
      ?>
      
<!doctype html>
<html lang="en">

<?php
global $title;
$title = 'Register | Krypto';
require 'components/head.php';
?>

<body>
  <div class="container">
    <div class="px-4 py-5 my-md-5 text-center">
      <div><a href="/" class="d-inline-block"><img class="d-block mx-auto" src="../assets/logo-light.jpeg" alt="" width="120" height="120" /></a></div>
      <a class="btn btn-link" href="<?php echo $_SERVER['HTTP_REFERER']; ?>" role="button">&larr; back</a>
      <h1 class="display-6">Register</h1>
      <form action="register?action=register" name="usrRegisterForm" id="usrRegisterForm" class="col-8 mx-auto my-3 needs-validation" method="post" novalidate>
        <div class="row my-1">
          <div class="col-6 col-lg-4 my-2">
            <div class="form-floating">
              <input type="text" class="form-control" name="usrFirstName" id="usrFirstName" value="" required>
              <label for="usrFirstName" class="form-label">First Name</label>
              <div class="invalid-feedback">Please insert your first name</div>
            </div>
          </div>
          <div class="col-6 col-lg-4 my-2">
            <div class="form-floating">
              <input type="text" class="form-control" name="usrLastName" id="usrLastName" value="" required>
              <label for="usrLastName" class="form-label">Last Name</label>
              <div class="invalid-feedback">Please insert your last name</div>
            </div>
          </div>
          <div class="col-6 col-lg-4 my-2">
            <div class="form-floating">
              <input type="email" class="form-control" name="usrEmail" id="usrEmail" required>
              <label for="usrEmail">Email address</label>
              <div class="invalid-feedback">Please insert your email address</div>
            </div>
          </div>
        </div>
        <div class="row my-1">
          <div class="col-6 col-lg-4 my-2">
            <div class="form-floating">
              <input type="date" class="form-control" name="usrBirthdate" id="usrBirthdate" value="" required>
              <label for="usrBirthdate" class="form-label">Birthdate</label>
              <div class="invalid-feedback">Please insert your birth date</div>
            </div>
          </div>
          <div class="col-6 col-lg-4 my-2">
            <div class="form-floating">
              <input type="password" class="form-control" name="usrPassword" id="usrPassword" required>
              <label for="usrPassword">Password</label>
              <div class="invalid-feedback">Please insert your password</div>
            </div>
          </div>
          <div class="col-6 col-lg-4 my-2">
            <div class="form-floating">
              <input type="password" class="form-control" name="usrPasswordConfirm" id="usrPasswordConfirm" required>
              <label for="usrPassword">Confirm Password</label>
              <div class="invalid-feedback">Passwords don't match</div>
            </div>
          </div>
        </div>
        <div class="row my-1">
          <div class="col mx-auto my-2">
            <label class="form-check-label" for="usrPrivacyCheck">
              I accept the <u>privacy policy</u> of the application
              <input class="form-check-input mx-2" type="checkbox" value="" name="usrPrivacyCheck" id="usrPrivacyCheck" required>
            </label>
          </div>
        </div>
        <div class="row my-1">
          <div class="col">
            <button class="btn btn-primary" type="submit">Submit</button>
          </div>
        </div>
      </form>
    </div>
  </div>
  <?php require 'components/footer.php'; ?>
  <script src="js/formValidation.js"></script>
</body>

</html>

<?php
    }
  }
  
?>