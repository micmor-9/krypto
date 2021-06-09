<!doctype html>
<html lang="en">

<?php
global $title;
$title = 'Login | Krypto';
require 'components/head.php';

if (isset($_GET['result'])) {
  require_once 'components/classes/database.php';
  require_once 'components/classes/user.php';

  switch ($_GET['result']) {
    case 'register':
      $alertMessage = '<div class="alert alert-success alert-dismissible fade show" role="alert">
        Registration completed successfully!
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>';
      break;

    case 'user':
      $alertMessage = '<div class="alert alert-danger alert-dismissible fade show" role="alert">
        No user found. Try with another email address.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>';
      break;

    case 'password':
      $alertMessage = '<div class="alert alert-danger alert-dismissible fade show" role="alert">
        Wrong password. <a href="#" class="alert-link">Lost your password?</a>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>';
      break;

    case 'session':
      $alertMessage = '<div class="alert alert-warning alert-dismissible fade show" role="alert">
        Session expired, please login again.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>';
      break;
  }
}
?>

<body>
  <div class="container">
    <div class="px-4 py-5 my-md-5 text-center">
      <div><a href="/" class="d-inline-block"><img class="d-block mx-auto" src="../assets/logo-light.jpeg" alt="" width="120" height="120" /></a></div>
      <a class="btn btn-link" href="/" role="button">&larr; back</a>
      <h1 class="display-6">Login</h1>
      <form action="auth?action=login" method="post" name="usrLoginForm" id="usrLoginForm"" class="col-lg-5 mx-auto my-3 needs-validation" novalidate>
        <?php echo (isset($alertMessage)) ? $alertMessage : ''; ?> 
        <div class="row my-1">
          <div class="col my-2">
            <div class="form-floating">
              <input type="email" class="form-control" name="usrEmail" id="usrEmail" required>
              <label for="usrEmail">Email address</label>
            </div>
          </div>
        </div>
        <div class="row my-1">
          <div class="col my-2">
            <div class="form-floating">
              <input type="password" class="form-control" name="usrPassword" id="usrPassword" required>
              <label for="usrPassword">Password</label>
            </div>
          </div>
        </div>
        <div class="row my-1">
          <div class="col mx-auto my-2">
            <button type="button" class="btn btn-link" data-bs-toggle="modal" data-bs-target="#resetPassword">Lost your password?</button><br>
            <label class="form-check-label" for="usrRememberCheck">
              Remember me
              <input class="form-check-input mx-2" type="checkbox" name="usrRememberCheck" id="usrRememberCheck">
            </label>
          </div>
        </div>
        <div class="row my-1">
          <div class="col">
            <button class="btn btn-primary" type="submit">Login</button>
          </div>
        </div>
      </form>
      <div class="modal fade" id="resetPassword" tabindex="-1" aria-labelledby="resetPasswordLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="resetPasswordLabel">Reset your password</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body text-start">
            Insert your email to reset your password
            <div class="my-3">
              <label for="usrEmailReset" class="form-label">Email address</label>
              <input type="email" class="form-control" id="usrEmailReset">
            </div>
          </div>
          <div class="modal-footer">            
            <button type="button" id="modalResetButton" class="btn btn-primary">Reset</button>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>

  <?php require 'components/footer.php'; ?>
</body>

</html>