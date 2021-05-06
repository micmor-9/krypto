/* View Encryption
  Page from which the user can update his personal data.
*/


import AbstractView from './AbstractView.js';

export default class Encryption extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('Encryption');
  }

  async getHtml() {
    return `<div class="container">
    <h1>Encryption</h1>
    <p class="lead">Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt facere dolorem quaerat vitae, iure eum voluptatum libero.</p>
    <form name="encryptionForm" class="col-12 col-lg-8 col-xl-5 mr-auto my-3">
    <div class="row my-1">
      <div class="col my-2">
        <label for="encryptionMessage" class="form-label">Your message</label>
        <textarea class="form-control" id="encryptionMessage" rows="10"></textarea>
        <span class="character-counter"></span>
      </div>
    </div>
    <div class="row my-1">
      <div class="col my-2">
        <label for="encryptionKey" class="form-label">Your key</label>
        <input type="text" class="form-control" id="encryptionKey">
      </div>
    </div>
    <div class="row my-1">
      <div class="col my-2">
        <button class="btn btn-primary" type="submit">Encrypt</button>
      </div>
    </div>
  </form>
  </div>`;
  }

  loadScripts() {
    var maxMessageLength = 200;
    $('#encryptionMessage').on('input', function() {
      let messageLength = $(this).val().length;
      if(messageLength > 0) {
        $('.character-counter').html($(this).val().length + '/' + maxMessageLength);
      } else {
        $('.character-counter').html('');
      }
    })
  }

}


