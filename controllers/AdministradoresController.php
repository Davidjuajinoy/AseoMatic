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
        // funcion img
        $directorio = "assets/uploud/";
        $archivo= $directorio.basename($_FILES["new_img"]["name"]);
        //info de ext(jpg,png,etc)
        $tipoArchivo =strtolower(pathinfo($archivo,PATHINFO_EXTENSION));
        //verifica que el archivo tenga dimensiones(w,h) 
        $DimensionesImg =getimagesize($_FILES['new_img']['tmp_name']);
        
        if($DimensionesImg == true)
        {
            $tamañoImg = $_FILES['new_img']["size"];
            if($tamañoImg > 1000000)
            {
                echo "El archivo tiene que ser menor a 1m";
            }
            else{
                if($tipoArchivo == "jpg" || $tipoArchivo == "png" || $tipoArchivo == "jpeg" )
                {
                    move_uploaded_file($_FILES["new_img"]["tmp_name"],$archivo);
                }
                else{
                    echo "la extension del archivo no es valida";
                }
            }
        }else{
            echo "el documento no es una img";
        }

        
    }


    // ! End CRUD Noticias


}