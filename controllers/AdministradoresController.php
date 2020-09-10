<?php 

class AdministradoresController extends Administrador{
    
    private $seguridad;

    public function __construct()
    {
        try
        {
            $this->seguridad = new Security();
            $this->seguridad->seguridadAdministrador();
        }catch(Exception $e)
        {
            die('Error de Instacia');
        }

    }

    public function index()
    {
        $title = 'Administrador';
        require_once 'views/administrador/index.php';
    }
    
//------------------------------------------------------------------------------------------------------------------------
    // ! CRUD usuarios
    
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
        // echo "<script>showAllUsers();</script>";
        
    }

    //? funcion para crear un usuario
    public function store()
    {
        $nombres = $_POST['nombres'];
        $apellidos = $_POST['apellidos'];
        $correo = $_POST['correo'];
        $clave = md5($_POST['clave']);
        $numero_documento = $_POST['numero_documento'];
        $fk_rol = $_POST['rol'];
        $fk_fondo_pension = $_POST['fondo_pension'];
        $fk_cargo = $_POST['cargo'];
        $fk_tipo_documento = $_POST['tipo_documento'];
        $fk_eps = $_POST['eps'];
        parent::storeUser($nombres,$apellidos,$correo,$clave,$numero_documento,$fk_rol,$fk_fondo_pension,$fk_cargo,$fk_tipo_documento,$fk_eps);
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


     // ! End CRUD usuarios

//------------------------------------------------------------------------------------------------------------------------


    // ! CRUD Noticias

    //? trae la informacion en formato JSON
    public function allNewsJson()
    {
        echo parent::allNews();
    }

    function showNews()
    {
        $title = "Gestion de Noticias";
        require_once 'views/administrador/noticias.php';
    }

    function storeNew()
    {
        $fecha = new DateTime();
        // funcion img
        $directorio = "assets/uploud/news/";
        $archivo= $directorio.basename($fecha->getTimeStamp().$_FILES["new_img"]["name"]);
        //info de ext(jpg,png,etc)
        $tipoArchivo =strtolower(pathinfo($archivo,PATHINFO_EXTENSION));
        //verifica que el archivo tenga dimensiones(w,h) 
        $DimensionesImg =getimagesize($_FILES['new_img']['tmp_name']);
        
        if($DimensionesImg == true)
        {
            $tamañoImg = $_FILES['new_img']["size"];
            if($tamañoImg > 2000000)
            {
                echo "El archivo tiene que ser menor a 2mb";
            }
            else{
                if($tipoArchivo == "jpg" || $tipoArchivo == "png" || $tipoArchivo == "jpeg" )
                {
                    move_uploaded_file($_FILES["new_img"]["tmp_name"],$archivo);
                    $tituloNoticia = $_POST['titulo_noticia'];
                    $descripcionNoticia = $_POST['descripcion_noticia'];
                    $fechaPublicacion = $_POST['fecha_noticia'];
                    $imgNew = $archivo;
                    $newUser = $_POST['fk_usuario'];
            
                    parent::storeAddNew($tituloNoticia,$descripcionNoticia,$fechaPublicacion,$imgNew,$newUser);
                }
                else{
                    echo "la extension del archivo no es valida";
                }
            }
        }else{
            echo "el documento no es una img";
        }
    

        
    }

    public function updateNews()
    {
        $idNoticia =$_POST['update_id_noticia'];
        $tituloNoticia = $_POST['update_titulo_noticia'];
        $descripcionNoticia = $_POST['update_descripcion_noticia'];
        $fechaPublicacion = $_POST['update_fecha_noticia'];
        $idUser = $_POST['update_fk_usuario'];
        //para la ruta de la imagen 
        $rutaImg=parent::showImg($idNoticia)->imagen_noticia;
        
        $imgUpdate = '';
        //? si no se actualiza una img tomara el valor que tenia anteriormente y si actualiza se borrara la anterior
        if(empty($_POST['update_new_img']))
        {
            //? Update Img
            $fecha = new DateTime();
            // funcion img
            $directorio = "assets/uploud/news/";
            $archivo= $directorio.basename($fecha->getTimeStamp().$_FILES["update_new_img"]["name"]);
            //info de ext(jpg,png,etc)
            $tipoArchivo =strtolower(pathinfo($archivo,PATHINFO_EXTENSION));
            //verifica que el archivo tenga dimensiones(w,h) 
            $DimensionesImg =getimagesize($_FILES['update_new_img']['tmp_name']);

            if($DimensionesImg == true)
            {
                $tamañoImg = $_FILES['update_new_img']["size"];
                if($tamañoImg > 2000000)
                {
                    echo "El archivo tiene que ser menor a 2mb";
                }
                else{
                    if($tipoArchivo == "jpg" || $tipoArchivo == "png" || $tipoArchivo == "jpeg" )
                    {
                        //Borra la imagen que tenia antes
                        unlink($rutaImg);
                        move_uploaded_file($_FILES["update_new_img"]["tmp_name"],$archivo);
                        $imgUpdate=$archivo;
                    }
                    else{
                        echo "la extension del archivo no es valida";
                    }
                }
            }else{
                echo "el documento no es una img";
            }
        }else{
            $imgUpdate = $rutaImg;
        }

        parent::updateNew($tituloNoticia,$descripcionNoticia,$fechaPublicacion,$imgUpdate,$idUser,$idNoticia);
    }

    public function destroyNew()
    {

        $id = $_REQUEST['id'];
        //funcion para mostrar la ruta de la img por id
        $rutaImg = parent::showImg($id);
        //Funcion que borra la imagen (recibe la ruta de img)
        unlink($rutaImg->imagen_noticia);
        parent::deleteNew($id);
    }


    // ! End CRUD Noticias


    // ! CRUD Eventos

      //? trae la informacion en formato JSON
      public function allEventsJson()
      {
          echo parent::allEvent();
      }
  
      function showEvents()
      {
          $title = "Gestion de Eventos";
          require_once 'views/administrador/eventos.php';
      }
  
      function storeEvents()
      {
          $fecha = new DateTime();
          // funcion img
          $directorio = "assets/uploud/events/";
          $archivo= $directorio.basename($fecha->getTimeStamp().$_FILES["event_img"]["name"]);
          //info de ext(jpg,png,etc)
          $tipoArchivo =strtolower(pathinfo($archivo,PATHINFO_EXTENSION));
          //verifica que el archivo tenga dimensiones(w,h) 
          $DimensionesImg =getimagesize($_FILES['event_img']['tmp_name']);
          
          if($DimensionesImg == true)
          {
              $tamañoImg = $_FILES['event_img']["size"];
              if($tamañoImg > 2000000)
              {
                  echo "El archivo tiene que ser menor a 2mb";
              }
              else{
                  if($tipoArchivo == "jpg" || $tipoArchivo == "png" || $tipoArchivo == "jpeg" )
                  {
                      move_uploaded_file($_FILES["event_img"]["tmp_name"],$archivo);
                      $tituloEvento = $_POST['titulo_evento'];
                      $descripcionEvento = $_POST['descripcion_evento'];
                      $fechaPublicacion = $_POST['fecha_evento'];
                      $imgEvent = $archivo;
                      $EventUser = $_POST['fk_usuario'];
              
                      parent::storeAddEvent($tituloEvento,$descripcionEvento,$fechaPublicacion,$imgEvent,$EventUser);
                  }
                  else{
                      echo "la extension del archivo no es valida";
                  }
              }
          }else{
              echo "el documento no es una img";
          }
      
  
          
      }
  
      public function updateEvents()
      {
          $idEvento =$_POST['update_id_evento'];
          $tituloEvento = $_POST['update_titulo_evento'];
          $descripcionEvento = $_POST['update_descripcion_evento'];
          $fechaPublicacion = $_POST['update_fecha_evento'];
          $idUser = $_POST['update_fk_usuario'];
          //para la ruta de la imagen 
          $rutaImg=parent::showImgEvent($idEvento)->imagen_evento;
          
          $imgUpdate = '';
          //? si no se actualiza una img tomara el valor que tenia anteriormente y si actualiza se borrara la anterior
          if(empty($_POST['update_event_img']))
          {
              //? Update Img
              $fecha = new DateTime();
              // funcion img
              $directorio = "assets/uploud/events/";
              $archivo= $directorio.basename($fecha->getTimeStamp().$_FILES["update_event_img"]["name"]);
              //info de ext(jpg,png,etc)
              $tipoArchivo =strtolower(pathinfo($archivo,PATHINFO_EXTENSION));
              //verifica que el archivo tenga dimensiones(w,h) 
              $DimensionesImg =getimagesize($_FILES['update_event_img']['tmp_name']);
  
              if($DimensionesImg == true)
              {
                  $tamañoImg = $_FILES['update_event_img']["size"];
                  if($tamañoImg > 2000000)
                  {
                      echo "El archivo tiene que ser menor a 2mb";
                  }
                  else{
                      if($tipoArchivo == "jpg" || $tipoArchivo == "png" || $tipoArchivo == "jpeg" )
                      {
                          //Borra la imagen que tenia antes
                          unlink($rutaImg);
                          move_uploaded_file($_FILES["update_event_img"]["tmp_name"],$archivo);
                          $imgUpdate=$archivo;
                      }
                      else{
                          echo "la extension del archivo no es valida";
                      }
                  }
              }else{
                  echo "el documento no es una img";
              }
          }else{
              $imgUpdate = $rutaImg;
          }
  
          parent::updateEvent($tituloEvento,$descripcionEvento,$fechaPublicacion,$imgUpdate,$idUser,$idEvento);
      }
  
      public function destroyEvents()
      {
  
          $id = $_REQUEST['id'];
          //funcion para mostrar la ruta de la img por id
          $rutaImg = parent::showImgEvent($id);
          //Funcion que borra la imagen (recibe la ruta de img)
          unlink($rutaImg->imagen_evento);
          parent::deletEvent($id);
      }


    // ! End CRUD Noticias

}