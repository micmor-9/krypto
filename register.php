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
      <form name="usrRegisterForm" class="col-8 mx-auto my-3">
        <div class="row my-1">
          <div class="col-12 col-lg-6 my-2">
            <div class="form-floating">
              <input type="email" class="form-control" name="usrEmail" id="usrEmail" placeholder="name@example.com">
              <label for="usrEmail">Email address</label>
            </div>
          </div>
          <div class="col-12 col-lg -6 my-2">
            <div class="form-floating">
              <input type="password" class="form-control" name="usrPassword" id="usrPassword" placeholder="Password">
              <label for="usrPassword">Password</label>
            </div>
          </div>
        </div>
        <div class="row my-1">
          <div class="col-6 col-lg-4 my-2">
            <div class="form-floating">
              <input type="text" class="form-control" name="usrFirstName" id="usrFirstName" value="">
              <label for="usrFirstName" class="form-label">First Name</label>
            </div>
          </div>
          <div class="col-6 col-lg-4 my-2">
            <div class="form-floating">
              <input type="text" class="form-control" name="usrLastName" id="usrLastName" value="">
              <label for="usrLastName" class="form-label">Last Name</label>
            </div>
          </div>
          <div class="col-6 col-lg-4 my-2">
            <div class="form-floating">
              <input type="date" class="form-control" name="usrBirthdate" id="usrBirthdate" value="">
              <label for="usrBirthdate" class="form-label">Birthdate</label>
            </div>
          </div>
        </div>
        <div class="row my-1">
          <div class="col mx-auto my-2">
            <label class="form-check-label" for="usrPrivacyCheck">
              I accept the <u>privacy policy</u> of the application
              <input class="form-check-input mx-2" type="checkbox" value="" id="usrPrivacyCheck">
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
</body>

</html>