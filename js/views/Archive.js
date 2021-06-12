/* View Archive
  
*/

import AbstractView from "./AbstractView.js";
import Decryption from "./Decryption.js";

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
        if(result != 'false') {
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
            objectHTML += `<label for="encryptionMessage" class="form-label"><strong>Message</strong></label><div class="col-12 col-lg-6 my-2"><textarea class="form-control" id="encryptionMessage-` + object['obj_id'] +`" name="encryptionMessage" rows="6" disabled>` + object['content'] + `</textarea></div>`;              
            
            objectHTML += `
                  <div class="col-12 col-lg-6 my-2">
                    <div class="row">
                      <div class="input-group col mt-2">
                        <div class="input-group-text"><i class="bi bi-key-fill" title="Key"></i></div>
                        <input name="encryptionKey" type="password" class="form-control" placeholder="Insert password to view the key">                        
                        <input name="encryptionKeyValue" type="hidden" value="` + object['key_value'] +`">                     
                        <button class="btn btn-primary unlock-key" type="button" data-object="object-` + object['obj_id'] +`" title="Get the key"><i class="bi bi-unlock"></i></button>
                      </div>
                      <div class="valid-feedback">
                        Key found successfully! 
                      </div>
                      <div class="invalid-feedback">
                        Wrong password!
                      </div>
                    </div>
                    <div class="row">
                      <div class="input-group col mt-3 mb-2">
                        <div class="input-group-text"><i class="bi bi-calendar4-event px-2" title="Timeout"></i></div>
                        <input name="encryptionTimeout" type="date" class="form-control" value="` + object['timeout'] + `" disabled>                      
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
          objectHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">No encrypted object found for this user.</div>`;
          $('#archiveAccordion').html(objectHTML);
        }

        $('.unlock-key').on("click", function() {
          var object = $(this).data('object');
          var password = $('#' + object + ' input[name="encryptionKey"]').val();
          var encryptedPassword = $('#' + object + ' input[name="encryptionKeyValue"]').val();

          var decrypted = Decryption.decrypt(encryptedPassword, password, password.length);
          var decryptedKey = decrypted.toString(CryptoJS.enc.Utf8);

          if(decryptedKey != '') {
            //Key found successfully
            $('#' + object + ' input[name="encryptionKey"]').val(decryptedKey);
            $('#' + object + ' input[name="encryptionKey"]').attr('disabled', 'true');
            $('#' + object + ' input[name="encryptionKey"]').attr('type', 'text');

            $('#' + object + ' .invalid-feedback').fadeOut();
            $('#' + object + ' .valid-feedback').fadeIn();
            $(this).attr('disabled', true);
          } else {
            //Password incorrect
            $('#' + object + ' input[name="encryptionKey"]').val('');
            $('#' + object + ' .valid-feedback').fadeOut();
            $('#' + object + ' .invalid-feedback').fadeIn();
          }
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

    return `<div class="container-fluid">
    <h1>Archive</h1>
    <div class="app-content">
    <div class="accordion col-12 col-lg-10 col-xxl-8 mr-auto my-3" id="archiveAccordion">
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
