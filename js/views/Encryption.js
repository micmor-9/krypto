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

      var values = {};
      $.each($(form).serializeArray(), function (i, field) {
        values[field.name] = field.value;
      });

      //console.log(values);
      event.preventDefault();

      //Validations
      let today = new Date();
      if (values["encryptionObjectType"] == "msg") {
        if (values["encryptionMessage"].length > maxMessageLength) {
          success = false;
        }
      } else {
        //check if file has been uploaded successfully
      }

      if (success) {
        this.encryptionResult(values);
      }

      /* $("#encryptionMessage").val(
        CryptoJS.AES.encrypt(
          values["encryptionMessage"],
          values["encryptionKey"]
        )
      ); */
    });
  }

  encryptionResult(values) {
    $(".app-content").fadeTo("slow", 0.4);
    if (values["encryptionObjectType"] == "msg") {
      var encryptedMessage = CryptoJS.AES.encrypt(
        values["encryptionMessage"],
        values["encryptionKey"]
      ).toString();

      console.log(encryptedMessage);

      //ajax call to insert the encrypted message in DB and returns hashed identifier for retrieving items

      var qrImage =
        '<img src="https://api.qrserver.com/v1/create-qr-code/?data=' +
        values["encryptedMessage"] +
        '&size=100x100" alt="" title="" />';

      var newContent =
        `<a href="encryption" class="btn btn-link px-0" role="button" data-link>&larr; back</a>
      <h3>Result</h3>
      <form name="encryptionForm" id="encryptionForm" method="post" class="col-12 col-lg-8 col-xl-5 mr-auto mb-3 needs-validation" novalidate>
      <div class="row my-1 encryption-message">
        <div class="col my-2">
          <label for="encryptionMessage" class="form-label">Your encrypted message</label>
          <textarea class="form-control" id="encryptionMessage" name="encryptionMessage" rows="10" disabled>` +
        encryptedMessage +
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
          </div>
        </div>
      </div>
      </form>
      </div>`;

      $(".app-content").html(newContent);
      $(".app-content").fadeTo("slow", 1);

    }
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
      `<div class="container">
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

    var tooltipBtn = document.getElementById("generateKey");
    var tooltip = new bootstrap.Tooltip(tooltipBtn);

    $(tooltipBtn).on("click", (e) => {
      var key = this.generateKey();
      $("#encryptionKey").val(key);
      this.charCounterUpdate();
    });

    this.encryptionHandler();
  }
}
