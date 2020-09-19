<?php 

class LoginController extends Login{
  
    public function auth()
    {     
       
        $nombre_usuario = Security::verificateEmail($_POST['nombre_usuario']);
        $passVerificado = Security::htmlChars($_POST['password']);
        
        if($nombre_usuario)
        {
            $password = md5($passVerificado);
            $usuario = parent::verificarLogin($nombre_usuario,$password);
            $verificarEmail  = Login::verificarSiExisteEmail($nombre_usuario);

            if($usuario)
            {
                    if( $nombre_usuario == $usuario->correo  && $password == $usuario->clave){
                        if( $usuario->fk_rol == 1)
                        {
                            $_SESSION['ADMINISTRADOR'] = $usuario;
                            echo json_encode($usuario);
                        }
                        else if( $usuario->fk_rol == 2){
                            $_SESSION['EMPLEADO'] = $usuario;
                            echo json_encode($usuario);
                        }
                    }
            }else if($verificarEmail){

                echo json_encode(['error' => 'incorrectoP']); //P password

            }else if(!$verificarEmail && !$usuario){

                echo json_encode(['error' => 'incorrectoU&P']); // U user & P password

            }else{
                echo json_encode(['error'=>'datosIncorrectosAmbos']);
                header('location:?c=All&m=index');
            }

        }else{
            echo json_encode(['error' => 'nombreUsuarioInvalido']);
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