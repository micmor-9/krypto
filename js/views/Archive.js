/* View Archive
  
*/

import AbstractView from "./AbstractView.js";

export default class Archive extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Archive");
  }

  async getHtml() {
    var objectHTML = "";

    $.ajax({
      url: '../../components/ajax/archive.php',
      type: 'POST',
      success: function(result, xhr, status) {
        if(result != false) {
          var data = $.parseJSON(result);        
          data.forEach((object) => {

            objectHTML += `<div class="accordion-item">
            <h2 class="accordion-header" id="heading-` + object['obj_id'] +`">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#object-` + object['obj_id'] + `" aria-expanded="true" aria-controls="object-` + object['obj_id'] +`">
                <strong>#` + object['obj_id'] + `</strong>
              </button>
            </h2>
            <div id="object-` + object['obj_id'] +`" class="accordion-collapse collapse" aria-labelledby="heading-` + object['obj_id'] + `" data-bs-parent="#archiveAccordion">
              <div class="accordion-body">`;
            if(object['file_download_link'] == null) {
              //Object Type Message
              objectHTML += `<a href="`+ object['qr_value'] +`"><img src="` + object['qr_download_link'] + `" alt="`+ object['obj_id'] +`" title="`+ object['obj_id'] +`" style="width: 100%; max-width: 50px;" /></a>`
            } else {
              //Object Type File
            }
            objectHTML += `<input type="text" value="` + object['key_value'] + `">`;
            objectHTML += `</div>
              </div>
            </div>`;
          });

          $('#archiveAccordion').html(objectHTML);
        } else {
          objectHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">No encrypted object found for this user.<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`;
          $('#archiveAccordion').html(objectHTML);
        }
      }
    });

    return `<div class="container">
    <h1>Archive</h1>
    <div class="app-content">
    <div class="accordion col-12 col-lg-8 col-xl-7 mr-auto my-3" id="archiveAccordion">
    </div>
    </div>
    </div>`;
  }

  loadScripts() {

  }
}
