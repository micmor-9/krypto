/* View ArchiveView
  Page from which the user can update his personal data.
*/


import AbstractView from './AbstractView.js';

export default class ArchiveView extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('Archive View');
  }

  async getHtml() {
    return '<h1>Archive View</h1>';
  }

}


