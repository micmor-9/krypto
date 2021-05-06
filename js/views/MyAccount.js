/* View MyAccount
  Page from which the user can update his personal data.
*/


import AbstractView from './AbstractView.js';

export default class MyAccount extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('My Account');
  }

  async getHtml() {
    return '<h1>My Account</h1>';
  }

}


