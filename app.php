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
      <hr>
      <div class="dropdown">
        <a href="#" class="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
          <strong><?php echo $loggedUser->getFirstName().' '.$loggedUser->getLastName();?></strong>
          <input type="hidden" id="loggedUserID" value="<?php echo $loggedUser->getUserId(); ?>">
        </a>
        <ul class="dropdown-menu text-small shadow" aria-labelledby="userDropdown">
          <li><a class="dropdown-item" href="logout">Sign out</a></li>
        </ul>
      </div>
      </ul>
    </div>

    <div id="appContent" class="d-inline-flex flex-column flex-fill p-3">

    </div>
  </div>

  <script type="module" src="/js/app.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/crypto-js.min.js"></script>
  <?php require 'components/footer.php'; ?>
</body>

</html>