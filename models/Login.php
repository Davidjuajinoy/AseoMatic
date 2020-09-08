<?php

class Login extends DataBase{
    public function verificarLogin($email,$clave)
    {
        try {
            // $stm = parent::conectar()->prepare("SELECT * FROM usuarios INNER JOIN roles  WHERE usuarios.fk_rol= rol.id_rol and usuarios.correo=? and  usuarios.clave=?");
            $stm = parent::conectar()->prepare("SELECT * FROM usuarios INNER JOIN roles WHERE usuarios.fk_rol= roles.id_rol AND usuarios.correo=? AND usuarios.clave=?");
            // $stm->bindParam(1,$email,PDO::PARAM_STR);
            $stm->bindParam(1,$email,PDO::PARAM_STR);
            $stm->bindParam(2,$clave,PDO::PARAM_STR);
            $stm->execute();
            return $stm->fetch(PDO::FETCH_OBJ);

        } catch (Exception $e) {
            die('Error Login F:'.$e->getMessage());
        }
    }


}