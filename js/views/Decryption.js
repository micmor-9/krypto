/* View Decryption
  Page from which the user can decrypt a message or a file
*/

import AbstractView from "./AbstractView.js";

const maxMessageLength = 400;
const keyLengths = [128, 192, 256];

export default class Decryption extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Decryption");
  }

  decryptionHandler() {
    $("#decryptionForm").submit((event) => {
      //TODO decryptionHandler

      /* var form = document.getElementById("decryptionForm");
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

      console.log(values);
      event.preventDefault();

      //Validations
      let today = new Date();
      if (values["decryptionObjectType"] == "msg") {
        if (values["decryptionMessage"].length > maxMessageLength) {
          success = false;
        }
      } else {
        //check if file has been uploaded successfully
      }

      if (success) {
        this.decryptionResult(values);
      } */
    });
  }

  decryptionResult(values) {
    $(".app-content").fadeTo("slow", 0.4);
    if (values["decryptionObjectType"] == "msg") {
      var encryptedMessage = CryptoJS.AES.encrypt(
        values["decryptionMessage"],
        values["decryptionKey"]
      ).toString();

      console.log(encryptedMessage);

      //ajax call to insert the encrypted message in DB and returns hashed identifier for retrieving items

      var qrImage =
        '<img src="https://api.qrserver.com/v1/create-qr-code/?data=' +
        values["encryptedMessage"] +
        '&size=100x100" alt="" title="" />';

      var newContent =
        `<a href="decryption" class="btn btn-link px-0" role="button" data-link>&larr; back</a>
      <h3>Result</h3>
      <form name="decryptionForm" id="decryptionForm" method="post" class="col-12 col-lg-8 col-xl-5 mr-auto mb-3 needs-validation" novalidate>
      <div class="row my-1 decryption-message">
        <div class="col my-2">
          <label for="decryptionMessage" class="form-label">Your encrypted message</label>
          <textarea class="form-control" id="decryptionMessage" name="decryptionMessage" rows="10" disabled>` +
        encryptedMessage +
        `</textarea>
        </div>
      </div>
      <div class="row my-1">
        <label for="decryptionKey" class="col-sm-4 col-form-label my-2">Your key</label>
        <div class="col my-2">
          <div class="input-group">
            <input type="text" class="form-control" id="decryptionKey" name="decryptionKey" value="` +
        values["decryptionKey"] +
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

  charCounterUpdate() {
    let keyLength = $("input[name='decryptionKeyLength']:checked").val();
    $("#keyCharacterCounter").html(
      $("#decryptionKey").val().length
    );
  }

  async getHtml() {
    return (
      `<div class="container">
    <h1>Decryption</h1>
    <div class="app-content">
    <div class="app-content-overlay">
    <form name="decryptionForm" id="decryptionForm" method="post" class="col-12 col-lg-8 col-xl-5 mr-auto my-3 needs-validation" novalidate>
    <div class="row my-1">
      <label for="decryptionObjectType" class="col-sm-4 col-form-label my-2">Choose </label>
      <div class="col my-2">
        <div class="btn-group" role="group" aria-label="decryption Object Type">
          <input type="radio" class="btn-check" name="decryptionObjectType" id="encObjMessage" value="msg" autocomplete="off" checked>
          <label class="btn btn-outline-primary" for="encObjMessage">Message</label>    
          <input type="radio" class="btn-check" name="decryptionObjectType" id="encObjFile" value="file" autocomplete="off">
          <label class="btn btn-outline-primary" for="encObjFile">File</label>
        </div>
      </div>
    </div>
    <div class="row my-1 decryption-message">
      <div class="col my-2">
        <label for="decryptionMessage" class="form-label">Your message</label>
        <textarea class="form-control" id="decryptionMessage" name="decryptionMessage" rows="10" required></textarea>
        <span class="character-counter" id="messageCharacterCounter">0/` +
      maxMessageLength +
      `</span>
      <div class="invalid-feedback">The message field cannot be empty.</div>
      </div>
    </div>
    <div class="row my-1">
      <label for="decryptionFile" class="decryption-file col-sm-4 col-form-label my-2">Upload your file</label>
      <div class="col my-2"> 
        <input type="file" class="decryption-file form-control" id="decryptionFile" name="decryptionFile">
      </div>
    </div>
    <div class="row my-1">
      <label for="decryptionKey" class="col-sm-4 col-form-label my-2">Your key</label>
      <div class="col my-2">
          <input type="text" class="form-control" id="decryptionKey" name="decryptionKey" maxlength="` +
      keyLengths[2] / 8 +
      `" pattern=".{` +
      keyLengths[2] / 8 +
      `}" required>          
        <div class="invalid-feedback">The key field must have the correct length.</div>
        <span class="character-counter" id="keyCharacterCounter">0</span>
      </div>
    </div>
    
    <div class="row my-1">
      <div class="col my-2">
        <button class="btn btn-primary" type="submit">Decrypt</button>
      </div>
    </div>
  </form>
  </div>
  </div>
  </div>`
    );
  }

  loadScripts() {
    $("#decryptionMessage").on("input", function () {
      $("#messageCharacterCounter").html(
        $(this).val().length + "/" + maxMessageLength
      );
    });

    $("#decryptionKey").on("input", () => {
      this.charCounterUpdate();
    });

    $("input[name='decryptionObjectType']").on("change", function () {
      let type = $(this).val();
      switch (type) {
        case "msg":
          $(".decryption-file").fadeOut();
          $("#decryptionFile").attr("required", false);

          $(".decryption-message").fadeIn();
          $("#decryptionMessage").attr("required", true);
          break;

        case "file":
          $(".decryption-message").fadeOut();
          $("#decryptionMessage").attr("required", false);

          $(".decryption-file").fadeIn();
          $("#decryptionFile").attr("required", true);
          break;
      }
    });

    this.decryptionHandler();
  }
}
