<?php

class Administrador extends DataBase
{
    public function allUsers()
    {
        try {
            $stm = parent::conectar()->prepare("SELECT * FROM usuarios INNER JOIN roles ON usuarios.fk_rol=roles.id_rol ORDER BY apellidos");
            $stm->execute();
            $result = $stm->fetchAll(PDO::FETCH_OBJ);
            return json_encode($result);
        } catch (Exception $e) {
            die('Murio AllUsers'.$e->getMessage());
        }
    }

    public function storeUser($nombres,$apellidos,$correo,$clave,$numero_documento,$fk_rol,$fk_fondo_pension,$fk_cargo,$fk_tipo_documento,$fk_eps)
    {
        try {
            $stm = parent::conectar()->prepare("INSERT INTO usuarios(nombres,apellidos,correo,clave,numero_documento,fk_rol,fk_fondo_pension,fk_cargo,fk_tipo_documento,fk_eps,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?,?,?,CURRENT_TIME(),CURRENT_TIME())");
            $stm->bindParam(1,$nombres,PDO::PARAM_STR);
            $stm->bindParam(2,$apellidos,PDO::PARAM_STR);
            $stm->bindParam(3,$correo,PDO::PARAM_STR);
            $stm->bindParam(4,$clave,PDO::PARAM_STR);
            $stm->bindParam(5,$numero_documento,PDO::PARAM_STR);
            $stm->bindParam(6,$fk_rol,PDO::PARAM_INT);
            $stm->bindParam(7,$fk_fondo_pension,PDO::PARAM_INT);
            $stm->bindParam(8,$fk_cargo,PDO::PARAM_INT);
            $stm->bindParam(9,$fk_tipo_documento,PDO::PARAM_INT);
            $stm->bindParam(10,$fk_eps,PDO::PARAM_INT);
            $stm->execute();
            
        } catch (Exception $e) {
            die('Error StoreUser'.$e->getMessage());
        }
    }

    public function UpdateUser($nombres,$apellidos,$correo,$clave,$numero_documento,$fk_rol,$fk_fondo_pension,$fk_cargo,$fk_tipo_documento,$fk_eps,$updated_at,$id)
    {
        try {
            $stm = parent::conectar()->prepare("UPDATE usuarios SET nombres=? ,apellidos=? ,correo=?,clave=?,numero_documento=?,fk_rol=?,fk_fondo_pension=?,fk_cargo=?,fk_tipo_documento=?,fk_eps=?,updated_at=? WHERE id_usuario = ?");
            $stm->bindParam(1,$nombres,PDO::PARAM_STR);
            $stm->bindParam(2,$apellidos,PDO::PARAM_STR);
            $stm->bindParam(3,$correo,PDO::PARAM_STR);
            $stm->bindParam(4,$clave,PDO::PARAM_STR);
            $stm->bindParam(5,$numero_documento,PDO::PARAM_STR);
            $stm->bindParam(6,$fk_rol,PDO::PARAM_INT);
            $stm->bindParam(7,$fk_fondo_pension,PDO::PARAM_INT);
            $stm->bindParam(8,$fk_cargo,PDO::PARAM_INT);
            $stm->bindParam(9,$fk_tipo_documento,PDO::PARAM_INT);
            $stm->bindParam(10,$fk_eps,PDO::PARAM_INT);
            $stm->bindParam(11,$updated_at,PDO::PARAM_STR);
            $stm->bindParam(12,$id,PDO::PARAM_INT);
            $stm->execute();
            
        } catch (Exception $e) {
            die('Error StoreUser'.$e->getMessage());
        }
    }

    public function deleteUser($id)
    {
        try {
            $stm = parent::conectar()->prepare("DELETE FROM usuarios WHERE id_usuario= ?");
            $stm->bindParam(1,$id,PDO::PARAM_INT);
            $stm->execute();
        } catch (Exception $e) {
            die('Murio DeleteUser'.$e->getMessage());
        }
    }

    public function allTable($tabla)
    {
        try {
            $stm = parent::conectar()->prepare("SELECT * FROM $tabla");
            $stm->execute();
            return $stm->fetchAll(PDO::FETCH_OBJ);
        } catch (Exception $e) {
            die('Murio allTable'.$e->getMessage());
        }
    }



    //? Crud Noticias

    public function allNews()
    {
        try {
            $stm = parent::conectar()->prepare("SELECT * FROM noticias INNER JOIN usuarios ON noticias.fk_usuario=usuarios.id_usuario ORDER BY titulo_noticia");
            $stm->execute();
            $result = $stm->fetchAll(PDO::FETCH_OBJ);
            return json_encode($result);
        } catch (Exception $e) {
            die('Murio AllUsers'.$e->getMessage());
        }
    }

    public function storeAddNew($tituloNoticia,$descripcionNoticia,$fechaPublicacion,$imgNew,$newUser)
    {
        try {
            $stm = parent::conectar()->prepare("INSERT INTO noticias(titulo_noticia,descripcion_noticia,fecha_publicado,imagen_noticia,fk_usuario) VALUES(?,?,?,?,?)");
            $stm->bindParam(1,$tituloNoticia,PDO::PARAM_STR);
            $stm->bindParam(2,$descripcionNoticia,PDO::PARAM_STR);
            $stm->bindParam(3,$fechaPublicacion,PDO::PARAM_STR);
            $stm->bindParam(4,$imgNew,PDO::PARAM_STR);
            $stm->bindParam(5,$newUser,PDO::PARAM_STR);
            $stm->execute();
            
        } catch (Exception $e) {
            die('Error StoreUser'.$e->getMessage());
        }
    }


    public function updateNew($tituloNoticia,$descripcionNoticia,$fechaPublicacion,$imgNew,$fkUser,$idNoticia)
    {
        try {
            $stm =parent::conectar()->prepare("UPDATE noticias SET titulo_noticia= ?, descripcion_noticia=? ,fecha_publicado=?,imagen_noticia=?,fk_usuario=? WHERE id_noticia = ?");
            $stm->bindParam(1,$tituloNoticia,PDO::PARAM_STR);
            $stm->bindParam(2,$descripcionNoticia,PDO::PARAM_STR);
            $stm->bindParam(3,$fechaPublicacion,PDO::PARAM_STR);
            $stm->bindParam(4,$imgNew,PDO::PARAM_STR);
            $stm->bindParam(5,$fkUser,PDO::PARAM_INT);
            $stm->bindParam(6,$idNoticia,PDO::PARAM_INT);
            $stm->execute();

        } catch (Exception $e) {
            die('Error UpdateNew'.$e->getMessage());
        }
    }

    public function deleteNew($id)
    {
        try {
            $stm = parent::conectar()->prepare("DELETE FROM noticias WHERE id_noticia= ?");
            $stm->bindParam(1,$id,PDO::PARAM_INT);
            $stm->execute();
        } catch (Exception $e) {
            die('Murio DeleteNew'.$e->getMessage());
        }
    }

    public function showImg($id)
    {
        try {
            $stm = parent::conectar()->prepare("SELECT imagen_noticia FROM noticias WHERE id_noticia= ?");
            $stm->bindParam(1,$id,PDO::PARAM_INT);
            $stm->execute();
            return $stm->fetch(PDO::FETCH_OBJ);
        } catch (Exception $e) {
            die('Murio DeleteNew'.$e->getMessage());
        }
    }

   
    //? End Crud Noticias
}