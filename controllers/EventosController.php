<?php 

class EventosController extends Evento{

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
    
}