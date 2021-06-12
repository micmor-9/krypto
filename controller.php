<body>
  <div class="container-fluid">
    <div class="row">
      <div id="usrSidebar" class="col-12 col-sm-3 col-lg-2 py-3 px-4">
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
          </a>
          <ul class="dropdown-menu text-small shadow" aria-labelledby="userDropdown">
            <li><a class="dropdown-item" href="logout">Logout</a></li>
          </ul>
        </div>
        </ul>
      </div>

      <div id="appContent" class="col-12 col-sm-9 col-lg-10 py-3">

      </div>
    </div>
  </div>

  <script type="module" src="/js/controller.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/crypto-js.min.js"></script>
  <?php require 'components/footer.php'; ?>
</body>

</html>