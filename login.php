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
      // TODO change user alert content
      $alertMessage = '<div class="alert alert-success alert-dismissible fade show" role="alert">
        Registration completed successfully!
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>';
      break;

    case 'password':
      // TODO change password alert content
      $alertMessage = '<div class="alert alert-success alert-dismissible fade show" role="alert">
        Registration completed successfully!
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
      <a class="btn btn-link" href="<?php echo $_SERVER['HTTP_REFERER']; ?>" role="button">&larr; back</a>
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
    </div>
  </div>

  <?php require 'components/footer.php'; ?>
</body>

</html>