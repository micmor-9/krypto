var passwordResetForm = document.getElementById('passwordResetForm');

$(passwordResetForm).submit((event) => {
  var success = passwordResetForm.checkValidity();
  if (!success) {
    event.preventDefault();
    event.stopPropagation();
    passwordResetForm.classList.add('was-validated');
  } else {
    event.preventDefault();
    event.stopPropagation();

    $(passwordResetForm).fadeTo("slow", 0.4);
    $('#usrEmailReset').attr('disabled', true);
    $('#modalResetButton').attr('disabled', true);

    $.ajax({
      url: '../../components/ajax/reset-password.php',
      type: 'POST',
      data: {email: $('#usrEmailReset').val()},
      success: (result, xhr, status) => {
        try {
          var data = $.parseJSON(result);
          var output = data['result'];

          switch (output) {
            case 'success':
              $newHtml = '<div class="alert alert-success alert-dismissible fade show" role="alert">Your password was reset successfully.</div>';
              break;

            case 'password':
              $newHtml = '<div class="alert alert-danger alert-dismissible fade show" role="alert">There was an error trying to reset your password</div>';
              break;

            case 'user':
              $newHtml = '<div class="alert alert-warning alert-dismissible fade show" role="alert">No user found with this email address</div>';
              break;

            case 'email':
              $newHtml = '<div class="alert alert-danger alert-dismissible fade show" role="alert">No email provided</div>';
              break;
          }

          $('.modal-body').html($newHtml);
          setTimeout(() => {
            $('.modal .btn-close').click();
          }, 2000);
        } catch (e) {
          status = 'error';
          console.log(result);
        }
      }
    });
  }

});