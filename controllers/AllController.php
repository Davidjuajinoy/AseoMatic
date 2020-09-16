<?php 

class AllController{
    
    private $seguridad;

    public function __construct()
    {
        try
        {
            $this->seguridad = new Security();
            $this->seguridad->seguridad();
        }catch(Exception $e)
        {
            die('Error de Instancia');
        }

    }



    public function index()
    {
        require_once 'views/all/index.php';
    }

    

}