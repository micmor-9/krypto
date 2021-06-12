/* View Encryption
  Page from which the user can update his personal data.
*/

import AbstractView from "./AbstractView.js";

const maxMessageLength = 400;
const keyLengths = [128, 192, 256];

export default class Encryption extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Encryption");
  }

  encryptionHandler() {
    $("#encryptionForm").submit((event) => {
      var form = document.getElementById("encryptionForm");
      var success = form.checkValidity();
      if (!success) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add("was-validated");

      event.preventDefault();

      if (success) {
        var passwordModal = new bootstrap.Modal(document.getElementById('passwordConfirm'));
        passwordModal.show();

        $('#passwordConfirmButton').on('click', () => {
          var form = document.getElementById("passwordConfirmForm");
          var success = form.checkValidity();
          if (!success) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add("was-validated");

          if(success) {
            var encryptionForm = document.getElementById("encryptionForm");
            var values = {};
            $.each($(encryptionForm).serializeArray(), function (i, field) {
              values[field.name] = field.value;
            });
            values["password"] = $('#passwordConfirmField').val();
            passwordModal.hide();
            this.encryptionResult(values);
          }
        });
      }
    });
  }

  downloadFile(encryptedData) {
    var blob = new Blob([encryptedData], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "krypto.txt");
  }

  animateText = (object, text) => {
    function _animate(object, text) {
      object.animate({opacity: 0},"slow");
      object.queue(function() {
        object.html(text);
        object.dequeue(); 
      });
      object.animate({opacity:'1'},"slow");
    }
    
    let content = object.html();
    _animate(object, text);
    setTimeout(() => {
      _animate(object, content);
    }, 2000);
  }

  encryptionResult(values) {
    $(".app-content").fadeTo("slow", 0.4);

    var data;

    if (values["encryptionObjectType"] == "msg") {
      //Object Type Message
      data = values["encryptionMessage"];
    } else {
      //Object Type File
      data = values["encryptionFileContent"];
    }

    console.log('Data: ' + data);
    var encryptedData = this.encrypt(data, values["encryptionKey"], values["encryptionKey"].length);
    var encryptedKey = this.encrypt(values["encryptionKey"], values["password"], values["password"].length);

    $.ajax({
      url: '../../components/ajax/encryption.php',
      type: 'POST',
      data: {content: encryptedData, timeout: values["encryptionTimeout"], key: values["encryptionKey"], encryptedKey: encryptedKey, password: values["password"]},
      success: (result, xhr, status) => {
        try {
          var data = $.parseJSON(result);
          var status = data['status'];
        } catch (e) {
          status = 'error';
          console.log(result);
        }
        var resultAlert;
        if(status == 'success') {
          //If encryption was successful
          resultAlert = `<h3>Result <small class="text-muted">#` + data['output'] + `</small></h3>
          <div class="row">
          <form class="col-12 col-lg-7 col-xl-6 mr-auto mb-3">
          <div class="alert alert-success alert-dismissible fade show" role="alert">
            Message encrypted successfully and stored in database.
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>`;

          var qrLink = 'https://' + document.location.hostname + '/decryption?obj=' + data['output'];
          var imageSrc = "https://api.qrserver.com/v1/create-qr-code/?data=" + qrLink + "&size=150x150";
          var qrImage ='<img src="' + imageSrc + '" alt="" title="" style="width: 100%; max-width: 150px;" />';

          var newContent =
            `<a href="encryption" class="btn btn-link px-0" role="button" data-link>&larr; back</a>
          ` + resultAlert +`
          <div class="row my-1 encryption-message">
            <label for="encryptionMessage" class="form-label">Your encrypted message</label>
            <div class="col my-2">
              <textarea class="form-control" id="encryptionMessage" name="encryptionMessage" rows="10" disabled>` +
            encryptedData +
            `</textarea>
            </div>
          </div>
          <div class="row my-1">
            <label for="encryptionKey" class="col-sm-4 col-form-label my-2">Your key</label>
            <div class="col my-2">
              <div class="input-group">
                <input type="text" class="form-control" id="encryptionKey" name="encryptionKey" value="` +
            values["encryptionKey"] +
            `" disabled>
              <button class="btn btn-primary" type="button" id="copyKey" data-bs-toggle="tooltip" data-bs-placement="top" title="Copy key to clipboard"><i class="bi bi-clipboard"></i></button>
              </div>
          </div>
          </div>
          </form>
          <div class="col-12 col-lg-5 col-xl-5 mr-auto mb-3">
            <div class="row qr-code-area">
              <div>Your QR Code</div>
              <div class="col-4 col-lg-6 col-xl-4 my-2">
                <div><a href="`+ qrLink +`">` + qrImage +`</a></div>
              </div>
              <div class="col-8 col-lg-6 col-xl-5 my-2 d-grid">
                <div class="btn-group-vertical">
                  <button id="shareButton" class="btn btn-outline-primary" type="button"><i class="bi bi-share-fill"></i>Share</button>
                  <button id="copyButton" class="btn btn-outline-primary" type="button"><i class="bi bi-link-45deg"></i></i>Copy link</button>
                  <button id="downloadButton" class="btn btn-outline-primary" type="button"><i class="bi bi-download"></i>Download as a file</button>
                  <button id="emailButton" class="btn btn-outline-primary" type="button"><i class="bi bi-envelope-fill"></i>E-Mail</button>
                </div>
              </div>
            </div>
          </div>
          </div>
          </div>`;

          $(".app-content").html(newContent);

          this.encryptionScripts(qrLink, encryptedData);

          var copyKeyButton = document.getElementById("copyKey");
          var tooltip = new bootstrap.Tooltip(copyKeyButton);

          $(".app-content").fadeTo("slow", 1);
        } else {
          //If encryption wasn't successful
          resultAlert = `<h3>Result</h3>
          <div class="row">
          <form class="col-12 col-lg-7 col-xl-6 mr-auto mb-3">
          <div class="alert alert-danger alert-dismissible fade show" role="alert">
            There has been an error during the encryption process. <a href="encryption" class="alert-link">Retry</a>
            ` + result +`
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>`;

          var newContent =
            `<a href="encryption" class="btn btn-link px-0" role="button" data-link>&larr; back</a>
          ` + resultAlert +`
          </form>
          </div>
          </div>`;

          $(".app-content").html(newContent);

          $(".app-content").fadeTo("slow", 1);
        }

      },
      error: function() {
        console.log("Ajax Error");
      }
    })
  }

  encryptionScripts(qrLink, encryptedData) {
    $('#shareButton').on("click", (e) => {
      if (navigator.share) {
        navigator.share({
          title: 'Krypto - Share encrypted message',
          url: qrLink
        }).then(() => { 
          this.animateText($('#shareButton'), 'Shared successfully!');
        })
        .catch(console.error);
      } else {
        this.animateText($('#shareButton'), 'Browser not supported');
      }
    });

    $('#copyButton').on("click", (e) => {
      const elem = document.createElement('textarea');
      elem.value = qrLink;
      document.body.appendChild(elem);
      elem.select();
      document.execCommand('copy');
      document.body.removeChild(elem);

      var button = $('#copyButton');
      this.animateText(button, 'Copied to clipboard!');
    });

    $('#copyKey').on("click", (e) => {
      const elem = document.createElement('textarea');
      elem.value = $('#encryptionKey').val();
      document.body.appendChild(elem);
      elem.select();
      document.execCommand('copy');
      document.body.removeChild(elem);
      $('#copyKey i').removeClass('bi-clipboard');
      $('#copyKey i').addClass('bi-check2');
      setTimeout(() => {
        $('#copyKey i').removeClass('bi-check2');
        $('#copyKey i').addClass('bi-clipboard');
      }, 1500)
    });

    $('#downloadButton').on("click", (e) => {
      this.downloadFile(encryptedData);
      this.animateText($('#downloadButton'), 'File downloaded!');
      
    });

    $('#emailButton').on("click", (e) => {
      window.open('mailto:?subject=Krypto - Share encrypted message&body=' + qrLink);
      this.animateText($('#emailButton'), 'Email sent!');
    });
  }

  encrypt (msg, pass, keyLength) {
    console.log('Msg: ' + msg);
    var keySize = keyLength*8;
    var iterations = 100;

    var salt = CryptoJS.lib.WordArray.random(128/8);
    
    var key = CryptoJS.PBKDF2(pass, salt, {
        keySize: keySize/32,
        iterations: iterations
      });
  
    var iv = CryptoJS.lib.WordArray.random(128/8);
    
    var encrypted = CryptoJS.AES.encrypt(msg, key, { 
      iv: iv, 
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC 
    });
    
    var transitmessage = salt.toString()+ iv.toString() + encrypted.toString();
    return transitmessage;
  }

  generateKey() {
    let keyLength = $("input[name='encryptionKeyLength']:checked").val();
    var salt = CryptoJS.lib.WordArray.random(128 / 8);
    var passphrase = CryptoJS.lib.WordArray.random(16 / 8);
    var generatedKey = CryptoJS.PBKDF2(passphrase, salt, {
      keySize: keyLength / 64,
    });

    return generatedKey;
  }

  charCounterUpdate() {
    let keyLength = $("input[name='encryptionKeyLength']:checked").val();
    $("#keyCharacterCounter").html(
      $("#encryptionKey").val().length + "/" + keyLength / 8
    );
  }

  async getHtml() {
    var date = new Date();
    var todayDate =
      date.getFullYear() +
      "-" +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + date.getDate()).slice(-2);
    date.setDate(date.getDate() + 30);
    var stringDate =
      date.getFullYear() +
      "-" +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + date.getDate()).slice(-2);
    return (
      `<div class="container-fluid">
    <h1>Encryption</h1>
    <p class="lead">Advanced Encryption Standard(AES) is a symmetric encryption algorithm. AES is the industry standard as of now as it allows 128 bit, 192 bit and 256 bit encryption. Symmetric encryption is very fast as compared to asymmetric encryption and are used in systems such as database system.</p>
    <div class="app-content">
    <div class="app-content-overlay">
    <form name="encryptionForm" id="encryptionForm" method="post" class="col-12 col-lg-8 col-xl-5 mr-auto my-3 needs-validation" novalidate>
    <div class="row my-1">
      <label for="encryptionObjectType" class="col-sm-4 col-form-label my-2">Choose </label>
      <div class="col my-2">
        <div class="btn-group" role="group" aria-label="Encryption Object Type">
          <input type="radio" class="btn-check" name="encryptionObjectType" id="encObjMessage" value="msg" autocomplete="off" checked>
          <label class="btn btn-outline-primary" for="encObjMessage">Message</label>    
          <input type="radio" class="btn-check" name="encryptionObjectType" id="encObjFile" value="file" autocomplete="off">
          <label class="btn btn-outline-primary" for="encObjFile">File</label>
        </div>
      </div>
    </div>
    <div class="row my-1 encryption-message">
      <div class="col my-2">
        <label for="encryptionMessage" class="form-label">Your message</label>
        <textarea class="form-control" id="encryptionMessage" name="encryptionMessage" rows="10" required></textarea>
        <span class="character-counter" id="messageCharacterCounter">0/` +
      maxMessageLength +
      `</span>
      <div class="invalid-feedback">The message field can't be empty.</div>
      </div>
    </div>
    <div class="row my-1">
      <label for="encryptionFile" class="encryption-file col-sm-4 col-form-label my-2">Upload your file</label>
      <div class="col my-2"> 
        <input type="file" class="encryption-file form-control" id="encryptionFile" name="encryptionFile">
        <input type="hidden" name="encryptionFileContent" id="encryptionFileContent">
      </div>
    </div>
    <div class="row my-1">
      <label for="encryptionKeyLength" class="col-sm-4 col-form-label my-2">Key Length</label>
      <div class="col my-2">
        <div class="btn-group" role="group" aria-label="Key Length input group">
          <input type="radio" class="btn-check" name="encryptionKeyLength" id="keyLength128" value="128" autocomplete="off" checked>
          <label class="btn btn-outline-primary" for="keyLength128">128 bit</label>    
          <input type="radio" class="btn-check" name="encryptionKeyLength" id="keyLength192" value="192" autocomplete="off">
          <label class="btn btn-outline-primary" for="keyLength192">192 bit</label>    
          <input type="radio" class="btn-check" name="encryptionKeyLength" id="keyLength256" value="256" autocomplete="off">
          <label class="btn btn-outline-primary" for="keyLength256">256 bit</label>
        </div>
      </div>
    </div>
    <div class="row my-1">
      <label for="encryptionTimeout" class="col-sm-4 col-form-label my-2">Timeout</label>
      <div class="col my-2">
        <input type="date" class="form-control" id="encryptionTimeout" name="encryptionTimeout" value="` +
      stringDate +
      `" min="` +
      todayDate +
      `">
      </div>
    </div>
    <div class="row my-1">
      <label for="encryptionKey" class="col-sm-4 col-form-label my-2">Your key</label>
      <div class="col my-2">
        <div class="input-group">
          <input type="text" class="form-control" id="encryptionKey" name="encryptionKey" maxlength="` +
      keyLengths[0] / 8 +
      `" pattern=".{` +
      keyLengths[0] / 8 +
      `}" required>
          <button class="btn btn-outline-primary" type="button" id="generateKey" data-bs-toggle="tooltip" data-bs-placement="top" title="Generate a key"><i class="bi bi-key-fill"></i></button>
          <div class="invalid-feedback">The key field must have the correct length.</div>
          </div>
        <span class="character-counter" id="keyCharacterCounter">0/` +
      keyLengths[0] / 8 +
      `</span>
      </div>
    </div>
    
    <div class="row my-1">
      <div class="col my-2">
        <button class="btn btn-primary" type="submit">Encrypt</button>
      </div>
    </div>
  </form>
  </div>
  </div>
  </div>
  <div class="modal fade" id="passwordConfirm" tabindex="-1" aria-labelledby="passwordConfirmLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="passwordConfirmLabel">Confirm your password</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body text-start">
          <form method="POST" name="passwordConfirmForm" id="passwordConfirmForm" class="needs-validation" novalidate>
            Insert your password to validate the encryption
            <div class="my-3">
              <label for="passwordConfirmField" class="form-label">Password</label>
              <input type="password" class="form-control" name="passwordConfirmField" id="passwordConfirmField" required>
            </div>
        </div>
        <div class="modal-footer">            
          <button type="submit" name="passwordConfirmButton" id="passwordConfirmButton" class="btn btn-primary">Confirm</button>
          </form>
        </div>
      </div>
    </div>
  </div>`
    );
  }

  loadScripts() {
    $("#encryptionMessage").on("input", function () {
      $("#messageCharacterCounter").html(
        $(this).val().length + "/" + maxMessageLength
      );
    });

    $("input[name='encryptionKeyLength']").on("change", () => {
      let length = $("input[name='encryptionKeyLength']:checked").val() / 8;
      $("#encryptionKey").attr("maxlength", length);
      $("#encryptionKey").attr("pattern", ".{" + length + "}");
      this.charCounterUpdate();
    });

    $("#encryptionKey").on("input", () => {
      this.charCounterUpdate();
    });

    $("input[name='encryptionObjectType']").on("change", function () {
      let type = $(this).val();
      switch (type) {
        case "msg":
          $(".encryption-file").fadeOut();
          $("#encryptionFile").attr("required", false);

          $(".encryption-message").fadeIn();
          $("#encryptionMessage").attr("required", true);
          break;

        case "file":
          $(".encryption-message").fadeOut();
          $("#encryptionMessage").attr("required", false);

          $(".encryption-file").fadeIn();
          $("#encryptionFile").attr("required", true);
          break;
      }
    });

    $("input[name='encryptionFile']").on("change", function () {
      var encryptionFile = document.getElementById('encryptionFile').files[0];
      var fileReader = new FileReader();
      fileReader.onload = function(fileLoadedEvent){
          var textFromFileLoaded = fileLoadedEvent.target.result;
          $('#encryptionFileContent').val(textFromFileLoaded);
      };
      fileReader.readAsText(encryptionFile);
    });

    var generateKeyButton = document.getElementById("generateKey");
    var tooltip = new bootstrap.Tooltip(generateKeyButton);

    $(generateKeyButton).on("click", (e) => {
      var key = this.generateKey();
      $("#encryptionKey").val(key);
      this.charCounterUpdate();
    });

    this.encryptionHandler();
  }
}
