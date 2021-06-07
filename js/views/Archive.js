/* View Archive
  
*/

import AbstractView from "./AbstractView.js";

export default class Archive extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Archive");
  }

  async getHtml() {
    var userID = $('#loggedUserID').val();
    var objectHTML = "";

    $.ajax({
      url: '../../components/ajax/archive.php',
      type: 'POST',
      data: {user_id: userID},
      success: function(result, xhr, status) {
        console.log(result);
        if(result != false) {
          var data = $.parseJSON(result);        

          data.forEach((object) => {
            objectHTML+= `<div class="accordion-item">
            <h2 class="accordion-header" id="heading-` + object['obj_id'] +`">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#object-` + object['obj_id'] +`" aria-expanded="true" aria-controls="object-` + object['obj_id'] +`">
                ` + object['obj_id'] + `
              </button>
            </h2>
            <div id="object-` + object['obj_id'] +`" class="accordion-collapse collapse" aria-labelledby="heading-` + object['obj_id'] +`" data-bs-parent="#archiveAccordion">
              <div class="accordion-body">
                <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
              </div>
            </div>
          </div>
            `;
          });

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
