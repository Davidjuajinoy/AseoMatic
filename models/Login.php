<?php

class Login extends DataBase{
    public function verificarLogin($email,$clave)
    {
        try {
            // $stm = parent::conectar()->prepare("SELECT * FROM usuarios INNER JOIN roles WHERE usuarios.fk_rol= roles.id_rol AND usuarios.correo=? AND usuarios.clave=?");
            $stm = parent::conectar()->prepare("SELECT nombres,apellidos,correo,fk_rol,clave,nombre_rol FROM usuarios INNER JOIN roles WHERE usuarios.fk_rol= roles.id_rol AND usuarios.correo=? AND usuarios.clave=?");
            $stm->bindParam(1,$email,PDO::PARAM_STR);
            $stm->bindParam(2,$clave,PDO::PARAM_STR);
            $stm->execute();
            return $stm->fetch(PDO::FETCH_OBJ);
    
        } catch (Exception $e) {
            die('Error Login F:'.$e->getMessage());
        }
    }

    public function verificarEmail($email)
    {
        try {
            $stm = parent::conectar()->prepare("SELECT correo FROM usuarios WHERE correo= ? ");
            $stm->bindParam(1 ,$email, PDO::PARAM_STR);
            $stm->execute();
            return $stm->fetch(PDO::FETCH_OBJ);

        } catch (Exception $e) {
            die('Error Login F:'.$e->getMessage());
        }
    }


}