<?php

class Empleado extends DataBase
{
    public function showProfile($token)
    {
        try {
            $stm = parent::conectar()->prepare("SELECT * FROM usuarios  WHERE token = ? ");
            $stm->bindParam(1,$token,PDO::PARAM_STR);
            $stm->execute();
            $result=$stm->fetch(PDO::FETCH_OBJ);
            return json_encode($result);
        } catch (Exception $e) {
            die('Murio ShowUser'.$e->getMessage());
        }
    }
}