<?php 

class Security extends DataBase{


    public function seguridad()
    {
        if(empty($_SESSION['ADMINISTRADOR']) || is_null($_SESSION['ADMINISTRADOR']) )
        {
            if(isset($_SESSION['EMPLEADO']))
            {
                header('location:?c=Empleados&m=index');
            }else{
                header('location:?c=All&m=index');
            }
        }
        //
        
    }

    public function seguridadEmpleados()
    {
       
        if(empty($_SESSION['EMPLEADO']) || is_null($_SESSION['EMPLEADO']))
        {
            if(isset($_SESSION['ADMINISTRADOR']))
            {
                header('location:?c=Administradores&m=index');
            }else{
                header('location:?c=All&m=index');
            }
        }
        
    }


}