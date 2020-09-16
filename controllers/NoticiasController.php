<?php 

class NoticiasController extends Noticia
{
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
    
}