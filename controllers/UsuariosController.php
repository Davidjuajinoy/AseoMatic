<?php

class UsuariosController extends Usuario{

       //? trae la informacion en formato JSON
       public function allUsersJson()
       {
           echo parent::allUsers();
       }
   
       //? trae la vista de Gestion de Usuarios
       public function show()
       {
           $title= 'Gestion De Usuarios';
           require_once 'views/administrador/usuarios.php';
           
       }
   
       //? funcion para crear un usuario
       public function store()
       {
           $nombres = Security::verificateName( $_POST['nombres']);
           $apellidos = Security::verificateName( $_POST['apellidos']);
           $correo = Security::verificateEmail( $_POST['correo']);
           $clave1 = Security::verificatePassword($_POST['clave']);
           $numero_documento = Security::verificateDocument( $_POST['numero_documento']);
           $fk_rol = Security::verificateInt( $_POST['rol']);
           $fk_fondo_pension = Security::verificateInt( $_POST['fondo_pension']);
           $fk_cargo = Security::verificateInt( $_POST['cargo']);
           $fk_tipo_documento = Security::verificateInt( $_POST['tipo_documento']);
           $fk_eps = Security::verificateInt( $_POST['eps']);
           
           if($nombres && $apellidos && $correo && $clave1 && $numero_documento && $fk_rol && $fk_fondo_pension && $fk_cargo && $fk_tipo_documento && $fk_eps)
           {
               if(!Login::verificarSiExisteEmail($correo))
               {
                   $clave = md5($clave1);
                   parent::storeUser($nombres,$apellidos,$correo,$clave,$numero_documento,$fk_rol,$fk_fondo_pension,$fk_cargo,$fk_tipo_documento,$fk_eps);
                   echo json_encode(['ok' => 'usuarioCreado']);


               }else{
                   echo json_encode(['error' => 'correoExistente']);
               }
           }
           else{
                echo json_encode(['error' => 'errorAgregarUsuario']);
           }
       }
   
       //? Funcion para actualizar un usuario
       public function update()
       {
           $id = $_POST['update_id'];
           $nombres = $_POST['update_nombres'];
           $apellidos = $_POST['update_apellidos'];
           $correo = $_POST['update_correo'];
           $clave = md5($_POST['update_clave']);
           $numero_documento = $_POST['update_numero_documento'];
           $fk_rol = $_POST['update_rol'];
           $fk_fondo_pension = $_POST['update_fondo_pension'];
           $fk_cargo = $_POST['update_cargo'];
           $fk_tipo_documento = $_POST['update_tipo_documento'];
           $fk_eps = $_POST['update_eps'];
           $updated_at = $_POST['updated_at'];
           parent::UpdateUser($nombres,$apellidos,$correo,$clave,$numero_documento,$fk_rol,$fk_fondo_pension,$fk_cargo,$fk_tipo_documento,$fk_eps,$updated_at,$id);
       }
   
       //? Funcion para eliminar un usuario
       public function destroy()
       {
           
           parent::deleteUser($_REQUEST['delete_id']);
       }
   
    
}