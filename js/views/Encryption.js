/* View Encryption
  Page from which the user can update his personal data.
*/

import AbstractView from "./AbstractView.js";

const maxMessageLength = 200;

export default class Encryption extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Encryption");
  }

  #encryptionHandler() {
    $("#encryptionForm").submit(function (event) {
      event.preventDefault();
      var values = {};
      $.each($(this).serializeArray(), function (i, field) {
        values[field.name] = field.value;
      });

      $('#encryptionMessage').val(CryptoJS.AES.encrypt(values['encryptionMessage'], values['encryptionKey']));
    });
  }

  async getHtml() {
    return (
      `<div class="container">
    <h1>Encryption</h1>
    <p class="lead">Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt facere dolorem quaerat vitae, iure eum voluptatum libero.</p>
    <form name="encryptionForm" id="encryptionForm" method="post" class="col-12 col-lg-8 col-xl-5 mr-auto my-3">
    <div class="row my-1">
      <div class="col my-2">
        <label for="encryptionMessage" class="form-label">Your message</label>
        <textarea class="form-control" id="encryptionMessage" name="encryptionMessage" rows="10"></textarea>
        <span class="character-counter">0/` +
      maxMessageLength +
      `</span>
      </div>
    </div>
    <div class="row my-1">
      <label for="encryptionKeyLength" class="col-sm-4 col-form-label my-2">Key Length</label>
      <div class="col my-2">
        <div class="btn-group" role="group" aria-label="Key Length input group">
          <input type="radio" class="btn-check" name="encryptionKeyLength" id="keyLength128" autocomplete="off" checked>
          <label class="btn btn-outline-primary" for="keyLength128">128 bit</label>    
          <input type="radio" class="btn-check" name="encryptionKeyLength" id="keyLength192" autocomplete="off">
          <label class="btn btn-outline-primary" for="keyLength192">192 bit</label>    
          <input type="radio" class="btn-check" name="encryptionKeyLength" id="keyLength256" autocomplete="off">
          <label class="btn btn-outline-primary" for="keyLength256">256 bit</label>
        </div>
      </div>
    </div>
    <div class="row my-1">
      <label for="encryptionTimeout" class="col-sm-4 col-form-label my-2">Timeout</label>
      <div class="col my-2">
        <input type="date" class="form-control" id="encryptionTimeout" name="encryptionTimeout">
      </div>
    </div>
    <div class="row my-1">
      <label for="encryptionKey" class="col-sm-4 col-form-label">Your key</label>
      <div class="col my-2">
        <input type="text" class="form-control" id="encryptionKey" name="encryptionKey">
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
      $(".character-counter").html(
        $(this).val().length + "/" + maxMessageLength
      );
    });

    this.#encryptionHandler();
  }
}
