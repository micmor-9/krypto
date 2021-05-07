/* View MyAccount
  Page from which the user can update his personal data.
*/

import AbstractView from "./AbstractView.js";

export default class MyAccount extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("My Account");
  }

  async getHtml() {
    return `<div class="container">
    <h1>My Account</h1>
    <form name="myAccountForm" id="myAccountForm" class="col-12 col-lg-8 col-xl-5 mr-auto my-3">
    <div class="row my-1">
      <div class="col my-2">
        <div class="form-floating">
          <input type="email" class="form-control" name="usrEmail" id="usrEmail" value="name@example.com" disabled>
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
          <input type="text" class="form-control" name="usrFirstName" id="usrFirstName" value="First Name">
          <label for="usrFirstName" class="form-label">First Name</label>
        </div>
      </div>
      <div class="col-12 col-md-6 my-2">
        <div class="form-floating">
          <input type="text" class="form-control" name="usrLastName" id="usrLastName" value="Last Name">
          <label for="usrLastName" class="form-label">Last Name</label>
          </div>
          </div>
    </div>
    <div class="row my-1">
      <div class="col-12 col-md-6 my-2">
        <div class="form-floating">
          <input type="date" class="form-control" name="usrBirthdate" id="usrBirthdate" value="1999-01-03">
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
    $('#oldPassword').on('input', function () {
      if($(this).val() != '') {
        $('.password-change').fadeIn();
      } else {
        $('.password-change').fadeOut();
      }
    });
  }
  
}
