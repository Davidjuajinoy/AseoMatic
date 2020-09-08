  $('#sidebarCollapse').click(function () {
      $('#sidebar, #content').toggleClass('active');
      
  });

  //Admin shwow user
  
  $('.edit-btn').click(function()
  {
    $('#ModalUpdateUser').modal('show');
    $tr = $(this).closest('tr');

    let data = $tr.children('td').map(function()
    {
      return $(this).text();
    }).get();

    console.log(data);
    $('#update_id').val(data[0]);
    // $('#update_nombres').val(data[1]);
    // $('#update_apellidos').val(data[2]);
    // $('#update_numero_documento').val(data[3]);
    // $('#update_correo').val(data[4]);
    // $('#update_fk_rol').val(data[0]);
    

  });
// $(document()).ready(function (){
 
// })