/* View Archive
  
*/


import AbstractView from './AbstractView.js';

export default class Archive extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('Archive');
  }

  async getHtml() {
    return '<h1>Archive</h1>';
  }

}


