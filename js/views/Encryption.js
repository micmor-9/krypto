/* View Encryption
  Page from which the user can update his personal data.
*/

import AbstractView from "./AbstractView.js";

const maxMessageLength = 200;
const keyLengths = [128, 192, 256];

export default class Encryption extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Encryption");
  }

  #encryptionHandler() {
    $("#encryptionForm").submit(function (event) {
      //TODO form validation

      event.preventDefault();
      var values = {};
      $.each($(this).serializeArray(), function (i, field) {
        values[field.name] = field.value;
      });

      $("#encryptionMessage").val(
        CryptoJS.AES.encrypt(
          values["encryptionMessage"],
          values["encryptionKey"]
        )
      );
    });
  }

  generateKey() {
    let keyLength = ($("input[name='encryptionKeyLength']:checked").val());
    var salt = CryptoJS.lib.WordArray.random(128 / 8);
    var passphrase = CryptoJS.lib.WordArray.random(16 / 8);
    var generatedKey = CryptoJS.PBKDF2(passphrase, salt, {
      keySize: keyLength / 64,
    });

    $("#encryptionKey").val(generatedKey);
    this.charCounterUpdate();
  }

  charCounterUpdate() {
    let keyLength = $("input[name='encryptionKeyLength']:checked").val();
    $("#keyCharacterCounter").html(
      $("#encryptionKey").val().length + "/" + keyLength / 8
    );
  }

  async getHtml() {
    var date = new Date();
    var stringDate = date.getFullYear() + '-' + ('0' + (date.getMonth()+1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
    return (
      `<div class="container">
    <h1>Encryption</h1>
    <p class="lead">Advanced Encryption Standard(AES) is a symmetric encryption algorithm. AES is the industry standard as of now as it allows 128 bit, 192 bit and 256 bit encryption. Symmetric encryption is very fast as compared to asymmetric encryption and are used in systems such as database system.</p>
    <form name="encryptionForm" id="encryptionForm" method="post" class="col-12 col-lg-8 col-xl-5 mr-auto my-3">
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
        <textarea class="form-control" id="encryptionMessage" name="encryptionMessage" rows="10"></textarea>
        <span class="character-counter" id="messageCharacterCounter">0/` +
      maxMessageLength +
      `</span>
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
        <input type="date" class="form-control" id="encryptionTimeout" name="encryptionTimeout" value="` + stringDate +`">
      </div>
    </div>
    <div class="row my-1">
      <label for="encryptionKey" class="col-sm-4 col-form-label my-2">Your key</label>
      <div class="col my-2">
        <div class="input-group">
          <input type="text" class="form-control" id="encryptionKey" name="encryptionKey">
          <button class="btn btn-outline-primary" type="button" id="generateKey" data-bs-toggle="tooltip" data-bs-placement="top" title="Generate a key"><i class="bi bi-key-fill"></i></button>
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
          $(".encryption-message").fadeIn();
          break;

        case "file":
          $(".encryption-message").fadeOut();
          $(".encryption-file").fadeIn();
          break;
      }
    });

    var tooltipBtn = document.getElementById("generateKey");
    var tooltip = new bootstrap.Tooltip(tooltipBtn);

    $(tooltipBtn).on("click", (e) => {
      this.generateKey();
    });
    this.#encryptionHandler();
  }
}
