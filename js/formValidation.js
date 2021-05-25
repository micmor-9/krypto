var loginForm = document.getElementById("usrLoginForm");
var registerForm = document.getElementById("usrRegisterForm");

if (loginForm) {
  //login form validation
}

if (registerForm) {
  //Register form validation
  $(registerForm).submit((event) => {
    var valid = true;
    var success = registerForm.checkValidity();
    if (!success) {
      event.stopPropagation();
      valid = false;
    }

    if(!passwordCheck()) {
      $("#usrPasswordConfirm").addClass("is-invalid");
      valid = false;
    }

    var values = {};
    $.each($(registerForm).serializeArray(), function (i, field) {
      values[field.name] = field.value;
    });

    console.log(values);
    registerForm.classList.add("was-validated");

    if(!valid) {
      event.preventDefault();
    }
  });
}

$("#usrPassword").change(function (event) {
  console.log(passwordCheck());
});

$("#usrPasswordConfirm").change(function (event) {
  if(!passwordCheck()) {
    $("#usrPasswordConfirm").addClass("is-invalid");
    $("#usrRegisterForm").removeClass("was-validated");
  } else {
    $("#usrPasswordConfirm").removeClass("is-invalid");
    $("#usrRegisterForm").addClass("was-validated");
  }
});

passwordCheck = function () {
  var psw = $("#usrPassword").val();
  var pswCnf = $("#usrPasswordConfirm").val();

  if (psw != pswCnf) {
    return false;
  } else {
    return true;
  }
};
