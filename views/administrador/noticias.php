<?php require_once 'layout/header.php'; ?>


<main class="main w-100">

  <div class="container mt-5">
    <div class="row w-100 mx-0">

      <div class="col-12 ">
        <table class="table  w-100  table-responsive-lg">
          <thead class="thead-dark">
            <tr>
              <th colspan="1">#</th>
              <th colspan="2">Noticia</th>
              <th colspan="2">Fecha de Publicación</th>
              <th>Autor</th>
              <th>Opciones</th>
              <th class="th-opacity b-custom"><i class="fa fa-plus" data-toggle="modal" data-target="#ModalAddNew"></i></th>
            </tr>
          </thead>


          <tbody id="tablaAllNews">
            


          </tbody>
        </table>
      </div>
    </div>
  </div>
  <!-- * End Table-->
</main>

<!-- ? Modal Create-->
<div class="modal fade" id="ModalAddNew" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">

  <div class="modal-dialog modal-lg modal-dialog-scrollable">
    <div class="modal-content  bg-dark text-white">
      <div class="modal-header border-0 b-custom">
        <h5 class="modal-title text-center h4 font-weight-bold text-shadow-1
              text-white" id="informationModal">Agregar Noticia</h5>
        <button type="button" id="cerrarModalNoticia" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form action="" method="POST" enctype="multipart/form-data">
          <div class="row">
            <div class=" col-sm-12">
                <div class="form-group">
                  <label for="titulo_noticia" class="text-shadow-1 text-custom text-capitalize">Titulo de Noticia</label>
                  <input type="text" class="form-control bg-white input-custom" name="titulo_noticia" placeholder="Juanito salio a pescar y salio Pescado" id="titulo_noticia">
                </div>

                <div class="form-group">
                  <label for="descripcion_noticia" class="text-shadow-1 text-custom text-capitalize">descripcion De noticia</label>
                  <!-- <input type="email" class="form-control bg-white input-custom" name="descripcion_noticia" placeholder="pepito@gmail.com" id="descripcion_noticia"> -->
                  <textarea name="descripcion_noticia" id="descripcion_noticia" class="form-control" cols="20" rows="4" placeholder="Juanito salio a pescar y salio Pescado xd"></textarea>
                </div>
              

                <div class="form-group">
                  <label for="fk_usuario" class="text-shadow-1 text-custom text-capitalize">Autor</label>
                  <select name="fk_usuario" id="fk_usuario" class="form-control ">
                    <option value="" selected="true">-- Seleccione --</option>
                    <?php foreach (parent::allTable('usuarios') as $user) { ?>
                      <option value="<?php echo $user->id_usuario ?>"><?php echo $user->nombres." ".$user->apellidos ?></option>
                    <?php } ?>
                  </select>
                </div>

            </div>
            <div class="form-group col-5 d-flex align-items-center">
                  <label data-hover="Seleccionar Img" for="new_img" class="w-100 text-center text-decoration-none button--scale-text-1  font-weight-bold  b-custom text-white rounded-lg text-capitalize">Seleccionar Imagen</label>
                   <input type="file" name="new_img" id="new_img" class="img-profile__input-file">
            </div>

            <div class="form-group col-7 text-center">
                 <img  id="prev-img" class="img-fluid img-thumbnail" alt="">
            </div>

         

          </div>

          <div class="text-right">
            <button id="GuardarNoticia" class="mr-3 btn-custom b-r-custom text-decoration-none font-weight-bold b-custom text-white rounded-lg">Aceptar</button>
           <button type="button" id="CancelarNoticia" class="btn-custom b-r-custom text-decoration-none font-weight-bold b-custom text-white rounded-lg" data-dismiss="modal">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
<!-- ? Modal End Create-->

<!-- ? Modal Update-->
<div class="modal fade w-100" id="ModalUpdateNews" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">

  <div class="modal-dialog modal-lg ">
  
    <div class="modal-content  bg-dark text-white">
      <div class="modal-header border-0 b-custom">
        <h5 class="modal-title text-center h4 font-weight-bold text-shadow-1
        text-white" id="informationModal">Actualizar Usuario</h5>
        <button type="button" id="cerrarModalUpdateUsuario" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form action="?c=Administradores&m=store" method="POST">
          <div class="row">
            <div class="col-md-6 col-sm-12">
              <div class="form-group">


                <input type="hidden" name="update_id" id="update_id">


                <label for="update_nombres" class="text-shadow-1 text-custom">Nombres</label>
                <input type="text" class="form-control bg-white text-capitalize input-custom" name="update_nombres" id="update_nombres">
              </div>

            </div>



            <div class="col-md-6 col-sm-12">

              <div class="form-group">
                <label for="update_apellidos" class="text-shadow-1 text-custom">Apellidos</label>
                <input type="text" class="form-control bg-white text-capitalize input-custom" name="update_apellidos" id="update_apellidos">
              </div>


            </div>

            <div class="form-group col-12">
              <label for="update_correo" class="text-shadow-1 text-custom">Correo</label>
              <input type="email" class="form-control bg-white input-custom" name="update_correo" id="update_correo">

              <label for="update_clave" class="text-shadow-1 text-custom">Clave</label>
              <input type="password" class="form-control bg-white input-custom" name="update_clave" id="update_clave">
            </div>

            <div class="form-group col-md-8 col-sm-12">
              <label for="update_numero_documento" class="text-shadow-1 text-custom">Número Documento</label>
              <input type="text" class="form-control bg-white input-custom" name="update_numero_documento" id="update_numero_documento">
            </div>

            <div class="form-group col-md-4 col-sm-12">
              <label for="update_tipo_documento" class="text-shadow-1 text-custom">Tipo Documento</label>
              <select name="update_tipo_documento" id="update_tipo_documento" class="form-control bg-white text-capitalize">
                <option value="" selected="true">-- Seleccione --</option>
                <?php foreach (parent::allTable('tipos_documentos') as $documento) { ?>
                  <option value="<?php echo $documento->id_tipo_documento ?>"><?php echo $documento->tipo_documento ?></option>
                <?php } ?>
              </select>
            </div>

          </div>

          <div class="row">



            <div class="form-group  col-sm-12 col-lg-3 col-md-6">
              <label for="update_rol" class="text-shadow-1 text-custom">Rol</label>
              <select name="update_rol" id="update_rol" class="form-control bg-white text-capitalize">
                <option value="" selected="true">-- Seleccione --</option>
                <?php foreach (parent::allTable('roles') as $rol) { ?>
                  <option value="<?php echo $rol->id_rol ?>"><?php echo $rol->nombre_rol ?></option>
                <?php } ?>
              </select>
            </div>


            <div class="form-group  col-sm-12 col-lg-3 col-md-6">
              <label for="update_cargo" class="text-shadow-1 text-custom">Cargo</label>
              <select name="update_cargo" id="update_cargo" class="form-control bg-white text-capitalize">
                <option value="" selected="true">-- Seleccione --</option>
                <?php foreach (parent::allTable('cargos') as $cargo) { ?>
                  <option value="<?php echo $cargo->id_cargo ?>"><?php echo $cargo->nombre_cargo ?></option>
                <?php } ?>
              </select>
            </div>

            <div class="form-group  col-sm-12 col-lg-3 col-md-6">
              <label for="update_eps" class="text-shadow-1 text-custom">EPS</label>
              <select name="update_eps" id="update_eps" class="form-control bg-white text-capitalize">
                <option value="" selected="true">-- Seleccione --</option>
                <?php foreach (parent::allTable('eps') as $eps) { ?>
                  <option value="<?php echo $eps->id_eps ?>"><?php echo $eps->nombre_eps ?></option>
                <?php } ?>
              </select>
            </div>

            <div class="form-group  col-sm-12 col-lg-3 col-md-6">
              <label for="update_fondo_pension" class="text-shadow-1 text-custom">Fondo de Pensión</label>
              <select name="update_fondo_pension" id="update_fondo_pension" class="form-control bg-white text-capitalize">
                <option value="" selected="true">-- Seleccione --</option>
                <?php foreach (parent::allTable('fondos_pension') as $fondo_pension) { ?>
                  <option value="<?php echo $fondo_pension->id_fondo_pension ?>"><?php echo $fondo_pension->nombre_fondo_pension ?></option>
                <?php } ?>
              </select>
            </div>

          </div>



          <input type="hidden" name="updated_at" id="updated_at" value="<?php echo date("Y-m-d")  ?>">



          <div class="d-flex justify-content-start align-items-center">

            <button id="EditarUsuario" class="mr-3 btn-custom b-r-custom text-decoration-none font-weight-bold b-custom text-white rounded-lg">Aceptar</button>


            <button type="button" id="CancelarUpdateUsuario" class="btn-custom b-r-custom text-decoration-none font-weight-bold b-custom text-white rounded-lg" data-dismiss="modal">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
<!-- ? Modal End Update-->


<!-- ? Modal Show-->
<div class="modal fade w-100" id="ModalShowUser" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">

  <div class="modal-dialog ">
  
    <div class="modal-content  bg-dark text-white">
      <div class="modal-header border-0 b-custom">
        <h5 class="modal-title text-center h4 font-weight-bold text-shadow-1
        text-white" id="showModal">Informacion del Usuario</h5>
        <button type="button" id="cerrarModalShowUsuario" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
          <div class="row">
            <div class="col-md-6  col-6">
              <div class="form-group">
                <label for="update_nombres" class="text-shadow-1 text-custom">Nombres</label>
                <p id="show_nombres" class="d-block text-capitalize"></p>
               
              </div>

            </div>

            <div class="col-md-6 col-6">

              <div class="form-group">
                <label class="text-shadow-1 text-custom">Apellidos</label>
                  <p id="show_apellidos" class="d-block text-capitalize"></p>
              </div>

            </div>

            <div class="form-group col-6">
              <label class="text-shadow-1 text-custom">Correo</label>
              <p id="show_correo" class="d-block"></p>
            </div>

            <div class="form-group  col-6 col-md-6">
              <label  class="text-shadow-1 text-custom">Cargo</label>
              <select id="show_cargo" class="bg-white d-block text-capitalize" disabled>
                <?php foreach (parent::allTable('cargos') as $cargo) { ?>
                  <option value="<?php echo $cargo->id_cargo ?>"><?php echo $cargo->nombre_cargo ?></option>
                <?php } ?>
              </select>
            </div>

            <div class="form-group col-md-6 col-sm-6 col-6">
              <label class="text-shadow-1 text-custom">Número Documento</label>
              <p id="show_numero_documento" class="d-block"></p>
            </div>

            <div class="form-group col-md-6 col-sm-6 col-6">
              <label class="text-shadow-1 text-custom">Tipo Documento</label>
              <select id="show_tipo_documento" class="bg-white d-block" text-capitalize  disabled>
                <?php foreach (parent::allTable('tipos_documentos') as $documento) { ?>
                  <option class="bg-white" value="<?php echo $documento->id_tipo_documento ?>"><?php echo $documento->tipo_documento ?></option>
                <?php } ?>
              </select>
            </div>

          </div>

          <div class="row">



       

         

            <div class="form-group  col-6 col-sm-4">
              <label  class="text-shadow-1 text-custom">Eps</label>
              <select id="show_eps" class="d-block bg-white text-capitalize" disabled>
                <?php foreach (parent::allTable('eps') as $eps) { ?>
                  <option value="<?php echo $eps->id_eps ?>"><?php echo $eps->nombre_eps ?></option>
                <?php } ?>
              </select>
            </div>

            <div class="form-group  col-12 col-sm-4 order-2 order-sm-1">
              <label class="text-shadow-1 text-custom">Fondo de Pensión</label>
              <select id="show_fondo_pension" class="bg-white d-block text-capitalize" disabled>
                <?php foreach (parent::allTable('fondos_pension') as $fondo_pension) { ?>
                  <option value="<?php echo $fondo_pension->id_fondo_pension ?>"><?php echo $fondo_pension->nombre_fondo_pension ?></option>
                <?php } ?>
              </select>
            </div>

            <div class="form-group  col-6 col-sm-4 order-1 order-sm-1">
              <label  class="text-shadow-1 text-custom">Rol</label>
              <select id="show_rol"  class="bg-white d-block"  disabled>
                <?php foreach (parent::allTable('roles') as $rol) { ?>
                  <option value="<?php echo $rol->id_rol ?>"><?php echo $rol->nombre_rol ?></option>
                <?php } ?>
              </select>
            </div>


          </div>



          <input type="hidden" name="updated_at" id="updated_at" value="<?php echo date("Y-m-d")  ?>">




          <div class="d-flex justify-content-end align-items-center">



              <button type="button" id="CancelarShowUsuario" class="btn-custom b-r-custom
                  text-decoration-none font-weight-bold b-custom text-white
                  rounded-lg" data-dismiss="modal">Cerrar</button>
          </div>
 
      </div>
    </div>
  </div>
</div>
    <!-- ? Modal End Show-->
    
              
    
<?php require_once 'layout/footer.php'; ?>