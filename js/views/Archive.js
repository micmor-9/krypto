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

            objectHTML += `<div class="accordion-item" data-id="` + object['obj_id'] +`">
            <h2 class="accordion-header" id="heading-` + object['obj_id'] +`">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#object-` + object['obj_id'] + `" aria-expanded="true" aria-controls="object-` + object['obj_id'] +`">
                <strong>#` + object['obj_id'] + `</strong>
              </button>
            </h2>
            <div id="object-` + object['obj_id'] +`" class="accordion-collapse collapse" aria-labelledby="heading-` + object['obj_id'] + `" data-bs-parent="#archiveAccordion">
              <div class="accordion-body row">`;
            if(object['file_download_link'] == null) {
              //Object Type Message
              objectHTML += `<label for="encryptionMessage" class="form-label"><strong>Message</strong></label><div class="col-12 col-md-7 my-2"><textarea class="form-control" id="encryptionMessage-` + object['obj_id'] +`" name="encryptionMessage" rows="5" disabled>` + object['content'] + `</textarea></div>`;              
            } else {
              //Object Type File
            }
            objectHTML += `
                  <div class="col-12 col-md-5 my-2">
                    <div class="row">
                      <div class="input-group">
                        <div class="input-group-text"><i class="bi bi-key-fill" title="Key"></i></div>
                        <input name="encryptionKey" type="text" class="form-control" value="` + object['key_value'] + `">                      
                        <button class="btn btn-outline-primary copy-key" type="button" data-key="` + object['key_value'] + `" title="Copy key to clipboard"><i class="bi bi-clipboard"></i></button>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col text-end my-2">
                        <a href="` + object['qr_value'] + `" class="btn btn-outline-primary" role="button"><i class="bi bi-unlock-fill mr-1"></i>Decrypt</a>
                        <button class="btn btn-outline-danger ms-2 delete-button" data-object="`+ object['obj_id'] +`" type="button"><i class="bi bi-trash-fill mr-1"></i>Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>`;
          });

          $('#archiveAccordion').html(objectHTML);
        } else {
          objectHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">No encrypted object found for this user.<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`;
          $('#archiveAccordion').html(objectHTML);
        }

        $('.copy-key').on("click", function() {
          const elem = document.createElement('textarea');
          elem.value = $(this).data('key');
          document.body.appendChild(elem);
          elem.select();
          document.execCommand('copy');
          document.body.removeChild(elem);
          $(this).find('i').removeClass('bi-clipboard');
          $(this).find('i').addClass('bi-check2');
          setTimeout(() => {
            $(this).find('i').removeClass('bi-check2');
            $(this).find('i').addClass('bi-clipboard');
          }, 1500)
        });

        $('.delete-button').on('click', function() {
          var deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
          var obj_id = $(this).data('object');
          $('#deleteModalLabel').html('Delete <strong>#' + obj_id + '</strong>');
          deleteModal.show();
          $('#modalDeleteButton').click(() => {
            $.ajax({
              url: '../../components/ajax/archive-delete.php',
              type: 'POST',
              data: {id: obj_id},
              success: function(result, xhr, status) {
                if(result) {
                  deleteModal.hide();
                  $('.accordion-item[data-id="'+ obj_id +'"]').fadeOut();
                  setTimeout(() => {
                    $('.accordion-item[data-id="'+ obj_id +'"]').remove();
                  }, 1000);
                }
              }
            });
          })
        });
      }
    });

    return `<div class="container">
    <h1>Archive</h1>
    <div class="app-content">
    <div class="accordion col-12 col-lg-8 col-xl-7 mr-auto my-3" id="archiveAccordion">
    </div>
    <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="deleteModalLabel"></h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            Are you sure you want to delete this encrypted object?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
            <button type="button" id="modalDeleteButton" class="btn btn-primary">Delete</button>
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>`;
  }

  loadScripts() {
  }
}
