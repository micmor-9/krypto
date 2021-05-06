/* View Decryption
  Page from which the user can update his personal data.
*/


import AbstractView from './AbstractView.js';

export default class Decryption extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('Decryption');
  }

  async getHtml() {
    return '<h1>Decryption</h1>';
  }

}


