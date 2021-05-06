/*
  This abstract class is a boilerplate for other views, so here are defined the methods implemented in each view
*/

export default class {
  constructor(params) {
    this.params = params;
  }

  setTitle(title) {
    document.title = (title + ' | Krypto');
  }

  async getHtml() {
    return "";
  }
  
}