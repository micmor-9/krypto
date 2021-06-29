var registerForm = document.getElementById("usrRegisterForm");

if (registerForm) {
  var passwordTooltip = document.getElementById('usrPassword')
  var tooltip = new bootstrap.Tooltip(passwordTooltip)

  //Register form validation
  $(registerForm).submit((event) => {
    var valid = true;
    var success = registerForm.checkValidity();
    if (!success) {
      event.stopPropagation();
      valid = false;
    }

    if(passwordCheck() == 0 || passwordCheck() == 2) {
      $("#usrPasswordConfirm").addClass("is-invalid");
      valid = false;
    }

    var values = {};
    $.each($(registerForm).serializeArray(), function (i, field) {
      values[field.name] = field.value;
    });

    registerForm.classList.add("was-validated");

    if(!valid) {
      event.preventDefault();
    }
  });
}

$("#usrPassword").change(function (event) {
  passwordCheck();
});

$("#usrPasswordConfirm").change(function (event) {
  passwordCheck();
});

passwordCheck = function () {
  var psw = $("#usrPassword").val();
  var pswCnf = $("#usrPasswordConfirm").val();

  //RegExp Password length between 8 and 15 characters, with one lowercase letter, one uppercase letter, one numeric digit and one special character
  var test = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
  if(psw.match(test)) {
    $("#usrPassword").removeClass("is-invalid");
    if(psw == pswCnf) {
      $("#usrPassword").removeClass("is-invalid");
      $("#usrPasswordConfirm").removeClass("is-invalid");
      $("#usrRegisterForm").addClass("was-validated");
      return 1; //Password is valid and matches the confirm
    } else {
      $("#usrPasswordConfirm").addClass("is-invalid");
      $("#usrRegisterForm").removeClass("was-validated");
      return 0; //Passwords don't match
    }
  } else {
    $("#usrPassword").addClass("is-invalid");
    $("#usrRegisterForm").removeClass("was-validated");
    return 2; //Password is invalid
  }
};
