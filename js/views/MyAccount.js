/* View MyAccount
  Pagina per la modifica dei dati personali
*/

import AbstractView from "./AbstractView.js";

export default class MyAccount extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("My Account");
  }

  async getHtml() {
    //Ottengo i dati dal DB relativi all'utente corrente
    $.ajax({
      url: '../../components/ajax/my-account.php',
      type: 'POST',
      success: function(result, xhr, status) {
        var userData = $.parseJSON(result);
        $('#usrEmail').val(userData['email']);
        $('#usrFirstName').val(userData['firstName']);
        $('#usrLastName').val(userData['lastName']);
        $('#usrBirthdate').val(userData['birthdate']);
      }
    });

    //Form per l'aggiornamento dei dati
    return `<div class="container-fluid">
    <h1>My Account</h1>
    <form name="myAccountForm" id="myAccountForm" class="col-12 col-lg-8 col-xl-5 mr-auto my-3">
    <div class="row my-1">
      <div class="col my-2">
        <div class="form-floating">
          <input type="email" class="form-control" name="usrEmail" id="usrEmail" value="" disabled>
          <label for="usrEmail">Email address</label>
        </div>
      </div>
    </div>
    <div class="row my-1">
      <div class="col my-2">
        <div class="form-floating">
          <input type="password" class="form-control" name="oldPassword" id="oldPassword">
          <label for="oldPassword">Old Password</label>
        </div>
      </div>
    </div>
    <div class="row my-1">
      <div class="col-12 col-md-6 my-2 password-change">
        <div class="form-floating">
          <input type="password" class="form-control" name="newPassword" id="newPassword">
          <label for="newPassword">New Password</label>
        </div>
      </div>
      <div class="col-12 col-md-6 my-2 password-change">
        <div class="form-floating">
          <input type="password" class="form-control" name="newPasswordRepeat" id="newPasswordRepeat">
          <label for="newPasswordRepeat">Repeat New Password</label>
        </div>
      </div>
    </div>
    <div class="row my-1">
      <div class="col-12 col-md-6 my-2">
        <div class="form-floating">
          <input type="text" class="form-control" name="usrFirstName" id="usrFirstName" value="">
          <label for="usrFirstName" class="form-label">First Name</label>
        </div>
      </div>
      <div class="col-12 col-md-6 my-2">
        <div class="form-floating">
          <input type="text" class="form-control" name="usrLastName" id="usrLastName" value="">
          <label for="usrLastName" class="form-label">Last Name</label>
          </div>
          </div>
    </div>
    <div class="row my-1">
      <div class="col-12 col-md-6 my-2">
        <div class="form-floating">
          <input type="date" class="form-control" name="usrBirthdate" id="usrBirthdate" value="">
          <label for="usrBirthdate" class="form-label">Birthdate</label>
        </div>
      </div>
    </div>
    <div class="row my-1">
      <div class="col">
        <button class="btn btn-primary" type="submit">Update</button>
      </div>
    </div>
  </form>
  </div>`;
  }

  loadScripts() {
    //Abilito i campi per la nuova password se viene inserita la vecchia password
    $('#oldPassword').on('input', function () {
      if($(this).val() != '') {
        $('.password-change').fadeIn();
      } else {
        $('.password-change').fadeOut();
      }
    });
  }
  
}
