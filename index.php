<!doctype html>
<html lang="en">

<?php
global $title;
$title = 'Krypto, data hiding at its finest';
require 'components/head.php';
?>

<body>
  <div class="d-flex flex-row">
    <div id="usrSidebar" class="d-inline-flex flex-column p-3">
      <a href="/" class="d-flex align-items-center link-dark text-decoration-none">
        <img class="d-block mx-auto" src="../assets/logo-light.jpeg" alt="Krypto" width="100" height="100" />
      </a>
      <hr>
      <ul class="nav nav-pills flex-column mb-auto">
        <li class="nav-item"><a href="encryption" id="encryption" class="nav-link" data-link>Encryption</a></li>
        <li><a href="decryption" id="decryption" class="nav-link" data-link>Decryption</a></li>
        <li><a href="archive" id="archive" class="nav-link" data-link>Archive</a></li>
        <li><a href="my-account" id="my-account" class="nav-link" data-link>My Account</a></li>
      </ul>
      <!-- <hr>
    <div class="dropdown">
      <a href="#" class="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
        <strong>Username</strong>
      </a>
      <ul class="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
        <li><a class="dropdown-item" href="#">New project...</a></li>
        <li><a class="dropdown-item" href="#">Settings</a></li>
        <li><a class="dropdown-item" href="#">Profile</a></li>
        <li>
          <hr class="dropdown-divider">
        </li>
        <li><a class="dropdown-item" href="#">Sign out</a></li>
      </ul>
    </div> -->
    </div>

    <div id="appContent" class="d-inline-flex flex-column flex-fill p-3">

    </div>
  </div>

  <script type="module" src="/js/app.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/crypto-js.min.js"></script>
  <?php require 'components/footer.php'; ?>
</body>

</html>