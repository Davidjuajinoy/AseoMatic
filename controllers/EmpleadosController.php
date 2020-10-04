<?php 


class EmpleadosController extends Empleado{
    private $seguridad;

    public function __construct()
    {
        try
        {
            $this->seguridad = new Security();
            $this->seguridad->seguridadEmpleados();
        }catch(Exception $e)
        {
            die('Error de Instacia');
        }

    }

    public function index()
    {
        $title='Empleado';
        require_once('views/empleado/index.php');
    }

    public function showNomina()
    {
        $title='Empleado Nomina';
        require_once 'views/empleado/nomina.php';
    }
    
    public function showCertificado()
    {
        $title='Empleado Certificado';
        require_once 'views/empleado/certificado.php';
    }

    public function showPerfil()
    {
        $title = 'Empleado Perfil';
        require_once 'views/empleado/perfil.php';
        
    }

    public function show()
    {
        $token = $_SESSION['EMPLEADO']->token;
        echo parent::showProfile($token);
    }

    public function edit()
    {

    }

    public function update()
    {

    }

    public function destroy()
    {

    }
}