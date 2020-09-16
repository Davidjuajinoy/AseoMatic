<?php 

class LoginController extends Login{
  
    public function auth()
    {     
        $nombre_usuario = $_POST['nombre_usuario'];
        $password = md5($_POST['password']);
        $usuario = parent::verificarLogin($nombre_usuario,$password);

        if( $nombre_usuario == $usuario->correo  && $password == $usuario->clave)
        {
            if( $usuario->fk_rol == 1)
            {
                $_SESSION['ADMINISTRADOR'] = $usuario;
                header('location:?c=Administradores&m=index');
            }
            else if( $usuario->fk_rol == 2){
                $_SESSION['EMPLEADO'] = $usuario;
                header('location:?c=Empleados&m=index');  
               
                
            }
        }else if( $nombre_usuario == $usuario->correo && $password != $usuario->clave )
        {

            echo "<script src="."assets/js/jquery-3.5.1.slim.min.js"."></script>
            <script src="."assets/js/sweetalert2.all.min.js"."></script>
            <script src="."assets/js/general_scripts.js"."></script>";
            echo "<script>
            Swal.fire({
                icon: 'error',
                title: 'Error de validacion de datos',
                text: `la contraseña es incorrecta !`,
                grow: 'fullscreen',
                confirmButtonText :'Entendido',
                allowOutsideClick : false,
                allowEscapeKey : false,
                stopKeydownPropagation : false,
                keydownListenerCapture:false
              }).then( () => {
                location= `?c=All&m=index`
            })
                </script>";
            //   header('location:?c=All&m=index');
        }
        else{
            header('location:?c=All&m=index');
        }
    }

    public function destroy()
    {
        session_unset();
        session_destroy();
        header('location:?c=All&m=index');
        exit;
    }

}