<?php
global $title;
$title = 'Register | Krypto';
require_once 'components/head.php';

//Verifico che non ci siano errori di registrazione precedente
if (isset($_GET['result'])) {
  if ($_GET['result'] == 'error') {
    $alertMessage = '<div class="alert alert-danger alert-dismissible fade show" role="alert">
      There has been an error during registration. Retry!
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>';
  }
}
?>

<!doctype html>
<html lang="en">

<body>
  <div class="container">
    <div class="px-4 py-5 my-md-5 text-center">
      <div><a href="/" class="d-inline-block"><img class="d-block mx-auto" src="../assets/logo-light.jpeg" alt="" width="120" height="120" /></a></div>
      <a class="btn btn-link" href="<?php echo $_SERVER['HTTP_REFERER']; ?>" role="button">&larr; back</a>
      <h1 class="display-6">Register</h1>
      <form action="auth?action=register" name="usrRegisterForm" id="usrRegisterForm" class="col-8 mx-auto my-3 needs-validation" method="post" novalidate>
        <?php echo (isset($alertMessage)) ? $alertMessage : ''; ?>
        <div class="row my-1">
          <div class="col-12 col-lg-4 my-2">
            <div class="form-floating">
              <input type="text" class="form-control" name="usrFirstName" id="usrFirstName" value="" required>
              <label for="usrFirstName" class="form-label">First Name</label>
              <div class="invalid-feedback">Please insert your first name</div>
            </div>
          </div>
          <div class="col-12 col-lg-4 my-2">
            <div class="form-floating">
              <input type="text" class="form-control" name="usrLastName" id="usrLastName" value="" required>
              <label for="usrLastName" class="form-label">Last Name</label>
              <div class="invalid-feedback">Please insert your last name</div>
            </div>
          </div>
          <div class="col-12 col-lg-4 my-2">
            <div class="form-floating">
              <input type="email" class="form-control" name="usrEmail" id="usrEmail" required>
              <label for="usrEmail">Email address</label>
              <div class="invalid-feedback">Please insert your email address</div>
            </div>
          </div>
        </div>
        <div class="row my-1">
          <div class="col-12 col-lg-4 my-2">
            <div class="form-floating">
              <input type="date" class="form-control" name="usrBirthdate" id="usrBirthdate" value="" required>
              <label for="usrBirthdate" class="form-label">Birthdate</label>
              <div class="invalid-feedback">Please insert your birth date</div>
            </div>
          </div>
          <div class="col-12 col-lg-4 my-2">
            <div class="form-floating">
              <input type="password" class="form-control" name="usrPassword" id="usrPassword" data-bs-toggle="tooltip" data-bs-placement="top" title="Password must be between 8 and 15 chars, must contain a number, an uppercase letter and a special char" required>
              <label for="usrPassword">Password</label>
              <div class="invalid-feedback">Invalid password</div>
            </div>
          </div>
          <div class="col-12 col-lg-4 my-2">
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
  <script src="js/scripts/formValidation.js"></script>
</body>
</html>