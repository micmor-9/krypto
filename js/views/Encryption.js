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
    return '<h1>Encryption</h1>';
  }

}


