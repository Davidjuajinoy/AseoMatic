<?php

class UsuariosController extends Usuario{

        private $seguridad;

        public function __construct()
        {
            try
            {
                $this->seguridad = new Security();
                $this->seguridad->seguridadAdministrador();
            }catch(Exception $e)
            {
                die('Error de Instancia');
            }

        }
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
                   $token = $this->seguridad->encryptToken(str_replace(' ','',$nombres.$numero_documento.$apellidos));
                   $clave = password_hash($clave1,PASSWORD_DEFAULT);
                   parent::storeUser($nombres,$apellidos,$correo,$clave,$numero_documento,$fk_rol,$fk_fondo_pension,$fk_cargo,$fk_tipo_documento,$fk_eps,$token);
                   echo json_encode(['ok' => 'usuarioCreado']);


               }else{
                   echo json_encode(['error' => 'correoExistente']);
               }
           }
           else{
                echo json_encode(['error' => 'errorAgregarUsuario']);
                return;
           }
       }
   
       //? Funcion para actualizar un usuario
       public function update()
       {
        $id = Security::verificateInt($_POST['update_id']);
        $nombres = Security::verificateName( $_POST['update_nombres']);
        $apellidos = Security::verificateName( $_POST['update_apellidos']);
        $correo = Security::verificateEmail( $_POST['update_correo']);
        $clave1 = Security::verificatePassword($_POST['update_clave']);
        $numero_documento = Security::verificateDocument( $_POST['update_numero_documento']);
        $fk_rol = Security::verificateInt( $_POST['update_rol']);
        $fk_fondo_pension = Security::verificateInt( $_POST['update_fondo_pension']);
        $fk_cargo = Security::verificateInt( $_POST['update_cargo']);
        $fk_tipo_documento = Security::verificateInt( $_POST['update_tipo_documento']);
        $fk_eps = Security::verificateInt( $_POST['update_eps']);
        $updated_at = Security::verificateDate($_POST['updated_at']);
        $token =$_POST['token'];
        // para validar el token con el token de la DB
        $usuario = parent::showUser($id,$token);
        // si no quiere actualizar la clave se usa el input hidden
        $claveAntigua =$_POST['clave_antigua'];

        //validacion de la clave si no se envia nada en el input update_clave se envia la clave_antigua
        if(empty($clave1) || $clave1 == false)
        {
            //se valida que la clave antigua sea igual a la que esta en la DB
            if($claveAntigua == $usuario->clave)
            {
                $clave =$claveAntigua;
            }
            else{
                echo json_encode(['error' => 'errorActualizarUsuario1']);
                return;
            }

        }else if($clave1)
        {
            $clave =password_hash($clave1,PASSWORD_DEFAULT); 
        }

            if($nombres && $apellidos && $correo && $numero_documento && $fk_rol && $fk_fondo_pension && $fk_cargo && $fk_tipo_documento && $fk_eps && $updated_at && $usuario->token == $token && isset($clave) )
            {
                
                if(!Login::verificarSiExisteEmail($correo) || Login::verificarSiExisteEmailUpdate($correo,$id))
                {
                    $token1 = $this->seguridad->encryptToken(str_replace(' ','',$nombres.$numero_documento.$apellidos));
                    parent::UpdateUser($nombres,$apellidos,$correo,$clave,$numero_documento,$fk_rol,$fk_fondo_pension,$fk_cargo,$fk_tipo_documento,$fk_eps,$token1,$updated_at,$id);
                    echo json_encode(['ok' => 'usuarioActualizado']);
 
 
                }else{
                    echo json_encode(['error' => 'correoExistente']);
                }
             

            }else{
                echo json_encode(['error' => 'errorActualizarUsuario']);
                return;
            }

       }
   
       //? Funcion para eliminar un usuario
       public function destroy()
       {
           $id=$this->seguridad->verificateInt($_REQUEST['delete_id']);
           $token = $_REQUEST['token'];
           if($id && $token)
           {
               parent::deleteUser($id,$token);
           }
       }
   
    
}