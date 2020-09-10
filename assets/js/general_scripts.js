// ? Modal for Error and Success

const msgError =(message) => {
    Swal.fire({
        icon: 'error',
        // titleText: `<p class="text-white h4">Error de validacion de datos</p>`,
        html: `<p class="text-white h4 mb-3 text-capitalize">Error de validacion de datos en</p><p class="text-danger text-capitalize h6">${message}</p>`,
        background : '#343a40',
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#6C63FF'

      });
}

const msgSuccess= (message) =>{
    Swal.fire({
        icon: 'success',
        html: `<p class="text-white h4 mb-3 text-capitalize">Bien Hecho</p><p class="text-success text-capitalize h6">${message}</p>`,
        focusConfirm:true,
        background : '#343a40',
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#6C63FF'
      });
}


//! JS Modulo Administrar Usuarios

if(location.search == '?c=Administradores&m=show')
{

    //? funcion De Mensaje modal y callback de eliminar(deleteUser(id));
    const msgQuestion = (message, id) => {
        Swal.fire({
            icon: 'warning',
            html: `<p class="text-white h4 mb-3 text-capitalize">Desea borrar al usuario</p><p class="text-danger text-capitalize h6">${message}</p>`,
            focusConfirm:true,
            background : '#343a40',
            confirmButtonText: 'Entendido',
            confirmButtonColor: '#6C63FF',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            cancelButtonColor: '#6C63FF'
          }).then((result) => {
            if (result.value) {
              const msg = "El usuarios ha sido eliminado";
              msgSuccess(msg);
              deleteUser(id);
    
            };
        })
    }

    //? peticion para eliminar usuario mediante id
    const deleteUser = (id) =>{
        fetch(`?c=Administradores&m=destroy&delete_id=${id}`,{
        }).then( resp =>  (resp.ok) ? Promise.resolve(resp) : Promise.reject(new Error('fallo el delete')))
        .then( resp => resp.text())
        .then((data) =>{
            // se actualiza la tabla
            showAllUsers();
        })
    
    }

    // ? guarda el th donde aparaceran los datos
    const thBody = document.getElementById('tablaAllUser');


    //? la informacion para detalles y para actualizar se guardara en ese array
    let allUsersData= [];


    //? Peticion Ajax de usuarios de DB Admin.usuarios.php
    const showAllUsers = ()=> {

        fetch('?c=Administradores&m=allUsersJson')
        .then(resp => resp.ok  ? Promise.resolve(resp)  : Promise.reject(new Error('Fallos la consulta')))
        .then(response => response.json())
        .then( data => {
            //? se guardar los datos en el array (esto es para detalles y actualizar)
            allUsersData = data;
            // console.log(allUsersData);
            const fragment = document.createDocumentFragment();
            let count= 0;
            for (const user of data) {
                count++;
                fragment.append(createAllUsersTable(user,count));
            }
            thBody.innerHTML='';
            thBody.append(fragment);
        })
        .catch( error => console.log(error));
    }


    //? Funcion del html de td para mostrar en tabla en Admin.usuarios.php
    const createAllUsersTable = (datos,count) =>{
        const fragment = document.createDocumentFragment();
        
        const trTableAllUsers =document.createElement('TR');
        trTableAllUsers.classList.add('table-light');  
        
        const tdTableAllUsers =document.createElement('TD');
        tdTableAllUsers.setAttribute('colspan', '1');
        
        tdTableAllUsers.textContent = `${count}`;

        trTableAllUsers.append(tdTableAllUsers);

        const td2TableAllUsers =document.createElement('TD');
        td2TableAllUsers.setAttribute('colspan', '2');
        td2TableAllUsers.textContent = `${datos.nombres}`;

        trTableAllUsers.append(td2TableAllUsers);

        const td3TableAllUsers =document.createElement('TD');
        td3TableAllUsers.setAttribute('colspan', '2');
        td3TableAllUsers.textContent = `${datos.apellidos}`;

        trTableAllUsers.append(td3TableAllUsers);

        const td4TableAllUsers =document.createElement('TD');
        td4TableAllUsers.textContent = `${datos.numero_documento}`;

        trTableAllUsers.append(td4TableAllUsers);


        const td5TableAllUsers =document.createElement('TD');
        td5TableAllUsers.textContent = `${datos.correo}`;
        
        trTableAllUsers.append(td5TableAllUsers);

        const td6TableAllUsers =document.createElement('TD');
        td6TableAllUsers.textContent = `${datos.nombre_rol}`;
        
        trTableAllUsers.append(td6TableAllUsers);

    

        const td9TableAllUsers =document.createElement('TD');
        td9TableAllUsers.classList.add('i-separated');
        // td9TableAllUsers.id=`${datos.id_usuario}`;
        
    
        let iTd9 =document.createElement('I');
        iTd9.id= `${datos.id_usuario}`;
        iTd9.setAttribute('data-toggle','modal');
        iTd9.setAttribute('data-target','#ModalShowUser');
        iTd9.classList.add('show-svg');
        td9TableAllUsers.append(iTd9);
        

        // let aTd9 =document.createElement('A');
        // aTd9.classList.add('edit-btn');

        let iATd9 =document.createElement('I');
        iATd9.id= `${datos.id_usuario}`;
        iATd9.classList.add('edit-svg');
        iATd9.setAttribute('data-toggle','modal');
        iATd9.setAttribute('data-target','#ModalUpdateUser');

        td9TableAllUsers.append(iATd9);

        // td9TableAllUsers.append(aTd9);

        let i2Td9 =document.createElement('I');
        i2Td9.id=`${datos.id_usuario}`;
        i2Td9.classList.add('delete-svg');
        i2Td9.setAttribute('data-toggle','modal');
        i2Td9.setAttribute('data-target','#Delete');
        
        td9TableAllUsers.append(i2Td9);

        trTableAllUsers.append(td9TableAllUsers);


        fragment.append(trTableAllUsers);
        return fragment;

    }


    //? Obtener ID y ejecutar metodos POST para edit y delete
    thBody.addEventListener('click',(e) =>{

        const id = e.target;
        if( id.getAttribute('id'))
        {
            const userId = id.getAttribute('id');
            // buscar el id que coincida con el id obtenido del evento
            const userIdFilter =allUsersData.filter( user => user.id_usuario ==userId)[0];
        
            if(id.getAttribute('data-target') == '#ModalUpdateUser')
            {
                showUserId(userIdFilter);
            }
            else if(id.getAttribute('data-target') == '#Delete')
            {
                const message= `${userIdFilter.nombres} ${userIdFilter.apellidos} identificado con el documento ${userIdFilter.numero_documento}`
                msgQuestion(message, userIdFilter.id_usuario);
            }
            else if(id.getAttribute('data-target') == '#ModalShowUser'){
                showUserInfo(userIdFilter);
            }
        
        }


    })

    //? funcion para mostrar los campos en el ModalUpdate de Administrador.usuarios
    const showUserId= (user) => {
        const nombres = document.getElementById("update_nombres").value=`${user.nombres}`;
        const apellidos = document.getElementById("update_apellidos").value=`${user.apellidos}`;
        const correo = document.getElementById("update_correo").value=`${user.correo}`;
        const rol = document.getElementById("update_rol").value=`${user.fk_rol}`;
        const clave = document.getElementById("update_clave").value=`${user.clave}`;
        const tipo_documento = document.getElementById("update_tipo_documento").value=`${user.fk_tipo_documento}`;
        const numero_documento = document.getElementById("update_numero_documento").value=`${user.numero_documento}`;
        const cargo = document.getElementById("update_cargo").value=`${user.fk_cargo}`;
        const eps = document.getElementById("update_eps").value=`${user.fk_eps}`;
        const fondo_pension = document.getElementById("update_fondo_pension").value=`${user.fk_fondo_pension}`;
        const id =document.getElementById('update_id').value=`${user.id_usuario}`;
    }

    //? funcion para mostrar los campos en el ModalShow de Administrador.usuarios
    const showUserInfo = (user)=>{
        const nombres = document.getElementById("show_nombres").textContent=`${user.nombres}`;
        const apellidos = document.getElementById("show_apellidos").textContent=`${user.apellidos}`;
        const correo = document.getElementById("show_correo").textContent=`${user.correo}`;
        const rol = document.getElementById("show_rol").value=`${user.fk_rol}`;
        const tipo_documento = document.getElementById("show_tipo_documento").value=`${user.fk_tipo_documento}`;
        const numero_documento = document.getElementById("show_numero_documento").textContent=`${user.numero_documento}`;
        const cargo = document.getElementById("show_cargo").value=`${user.fk_cargo}`;
        const eps = document.getElementById("show_eps").value=`${user.fk_eps}`;
        const fondo_pension = document.getElementById("show_fondo_pension").value=`${user.fk_fondo_pension}`;
    }

    //! Se ejecuta la para la creacion de los datos cuando acceda a Modulo Usuarios
    showAllUsers()
    // console.log(location.search)


    
    //? Funcion de Seguridad del Formulario Show-edit 
    const formIsValid = {
        nombre: false,
        apellido: false,
        correo: false,
        clave: false,
        numeroDocumento: false,
        fkRol: false,
        fondoPension: false,
        fondoPension: false,
        cargo : false,
        tipoDocumento : false,
        eps : false,
    };

    //? Resetear Funcion de Seguridad del Formulario Show-edit 

        const formIsValidReset = () =>{
            formIsValid.nombre = false;
            formIsValid.apellido= false;
            formIsValid.correo= false;
            formIsValid.clave= false;
            formIsValid.numeroDocumento= false;
            formIsValid.fkRol= false;
            formIsValid.fondoPension= false;
            formIsValid.fondoPension= false;
            formIsValid.cargo = false;
            formIsValid.tipoDocumento = false;
            formIsValid.eps = false;
        }
    //? Funcion de Expresiones Regulares Para Email
        const validateEmail = (email) => {
            const emailRegex = /^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

            if(emailRegex.test(email)) return true //console.log('email válido')
            else return false
            // console.log('email incorrecto')
        }


    $(document).ready(function(){

        //? function para vaciar Campos en modal #ModalAddUser
       
        $("#cerrarModalUsuario, #CancelarUsuario").click(function(){
            $("#nombres").val("");
            $("#apellidos").val("");
            $("#correo").val("");
            $("#clave").val("");
            $("#tipo_documento").val("");
            $("#numero_documento").val("");
            $("#cargo").val("");
            $("#eps").val("");
            $("#fondo_pension").val("");
            $("#modalMessage").hide();
        });
    
    
    //? Funcion de mensajes de Errores en las alertas 
        const validarDatos = (paramNombre,paramApellido,paramCorreo,paramClave,paramNumeroDocumento,paramFkRol,paramFondoPension,paramCargo,paramTipoDocumento,paramEps) =>
        {
            // tiene que ser parametro id "#ejemplo"
            if($(paramNombre).val() == ""){
                const message = "Ingresar nombres del usuario";
                msgError(message);
                $(paramNombre).focus();
            }
            else if($(paramApellido).val() == ""){
                const message = "Ingresar apellidos del usuario";
                msgError(message);
                $(paramApellido).focus();
            }
            else if($(paramCorreo).val() == ""){
                const message = "Ingresar correo del usuario";
                msgError(message);
                $(paramCorreo).focus();
            }
            else if(validateEmail($(paramCorreo).val()) == false)
            {
                const message = "El Correo Ingresado No es Valido";
                msgError(message);
                $(paramCorreo).focus();
            } 
            else if($(paramClave).val() == ""){
                const message = "Ingresar clave del usuario";
                msgError(message);
                $(paramClave).focus();
            }      
            else if($(paramNumeroDocumento).val() == ""){
                const message = "Ingresar numero documento";
                msgError(message);
                $(paramNumeroDocumento).focus();
            }
            else if($(paramFkRol).val() == ""){
                const message = "Seleccionar el tipo de Rol";
                msgError(message);
                $(paramFkRol).focus();
                console.log($(paramFkRol));
    
            }
            else if($(paramFondoPension).val() == ""){
                const message = "Seleccionar el fondo de pensiones";
                msgError(message);
                $(paramFondoPension).focus();
                console.log($(paramFondoPension));
    
            }
            else if($(paramCargo).val() == ""){
                const message = "Seleccionar el cargo";
                msgError(message);
                $(paramCargo).focus();
                console.log($(paramCargo));
    
            }
            else if($(paramTipoDocumento).val() == ""){
                const message = "Seleccionar el tipo de documento";
                msgError(message);
                $(paramTipoDocumento).focus();
                console.log($(paramTipoDocumento));
            }
            else if($(paramEps).val() == ""){
                const message = "Seleccionar la eps";
                msgError(message);
                $(paramEps).focus();
                console.log($(paramEps));
    
            }else{
                formIsValid.nombre = true;
                formIsValid.apellido= true;
                formIsValid.correo= true;
                formIsValid.clave= true;
                formIsValid.numeroDocumento= true;
                formIsValid.fkRol= true;
                formIsValid.fondoPension= true;
                formIsValid.fondoPension= true;
                formIsValid.cargo = true;
                formIsValid.tipoDocumento = true;
                formIsValid.eps = true;
            }
        };
    
    //? Funcion de Seguridad verificar el estado de la funcion formIsValid() 
        const validateForm = () =>{
            //?  primero convierto a array el objeto formIsValid
            const formValues = Object.values(formIsValid);
            //? una vez hecho array busco con el metodo findIndex que el valor este en false
            const valid = formValues.findIndex(value => value == false);
            //? si el valor esta en false retorna el numero del array (0,1,2,3) etc pero si no encuentra ningun false retorna -1
            if(valid == -1) return true;
            else return false;
        }
    
    //? funcion para guardar el usuario en DB en dashboard-admin : usuarios.php modal #ModalAddUser
        $("#GuardarUsuario").click(function(evt)
        {
            evt.preventDefault();
    
            validarDatos("#nombres","#apellidos","#correo","#clave","#numero_documento","#rol","#fondo_pension","#cargo","#tipo_documento","#eps");
           
            validateForm();
            
            if( validateForm() == true)
            {
                     const nombres = document.getElementById("nombres");
                     const apellidos = document.getElementById("apellidos");
                     const correo = document.getElementById("correo");
                     const clave = document.getElementById("clave");
                     const tipo_documento = document.getElementById("tipo_documento");
                     const numero_documento = document.getElementById("numero_documento");
                     const cargo = document.getElementById("cargo");
                     const eps = document.getElementById("eps");
                     const fondo_pension = document.getElementById("fondo_pension");
                     const fk_rol = document.getElementById('rol');
        
                     const formData = new FormData();
                     formData.append('nombres',nombres.value.toLowerCase());
                     formData.append('apellidos',apellidos.value.toLowerCase());
                     formData.append('correo',correo.value.toLowerCase());
                     formData.append('clave',clave.value);
                     formData.append('tipo_documento',tipo_documento.value);
                     formData.append('numero_documento',numero_documento.value);
                     formData.append('cargo',cargo.value);
                     formData.append('eps',eps.value);
                     formData.append('fondo_pension',fondo_pension.value);
                     formData.append('rol',fk_rol.value);
         
                     fetch('?c=Administradores&m=store' , 
                     {
                         method : 'POST',
                         body : formData,
                        
                     })
                     .then(resp => (resp.ok) ? Promise.resolve(resp) : Promise.reject(new Error('fallo la insercion')))
                     .then(resp => resp.text())
                     .then((data)=>{
                         $("#ModalAddUser").modal('hide');
                         let message = 'Usuario Agregado Correctamente';
                         // se llama la funcion de !=error
                         msgSuccess(message);
                         // se llama a la funcion de mostrar usuarios html
                         showAllUsers();
                        //  se reinicia a false el objeto formIsValid
                         formIsValidReset();
                        //  se reinician los  valores de los campos solicitados 
                         nombres.value="";
                         apellidos.value="";
                         correo.value="";
                         clave.value="";
                         tipo_documento.value="";
                         numero_documento.value="";
                         cargo.value="";
                         eps.value="";
                         fondo_pension.value="";
                         fk_rol.value="";
                        
                     });
    
            }
    
               
    
        });
    
        
        
    //? funcion para actualizar el usuario en DB en dashboard-admin : usuarios.php modal #ModalUpdateUser
        $('#EditarUsuario').click(function(e)
        {
            e.preventDefault();
            validarDatos("#update_nombres","#update_apellidos","#update_correo","#update_clave","#update_numero_documento","#update_rol","#update_fondo_pension","#update_cargo","#update_tipo_documento","#update_eps");
           
            validateForm();
    
            if( validateForm() == true)
            {
    
            const update_nombres = document.getElementById("update_nombres");
            const update_apellidos = document.getElementById("update_apellidos");
            const update_correo = document.getElementById("update_correo");
            const update_clave = document.getElementById("update_clave");
            const update_tipo_documento = document.getElementById("update_tipo_documento");
            const update_numero_documento = document.getElementById("update_numero_documento");
            const update_cargo = document.getElementById("update_cargo");
            const update_eps = document.getElementById("update_eps");
            const update_fondo_pension = document.getElementById("update_fondo_pension");
            const update_fk_rol = document.getElementById('update_rol');
            const update_updated_at = document.getElementById('updated_at');
            const update_id = document.getElementById("update_id");
    
            // console.log(fk_rol);
            const formData = new FormData();
            formData.append('update_id',update_id.value);
            formData.append('update_nombres',update_nombres.value.toLowerCase());
            formData.append('update_apellidos',update_apellidos.value.toLowerCase());
            formData.append('update_correo',update_correo.value.toLowerCase());
            formData.append('update_clave',update_clave.value);
            formData.append('update_tipo_documento',update_tipo_documento.value);
            formData.append('update_numero_documento',update_numero_documento.value);
            formData.append('update_cargo',update_cargo.value);
            formData.append('update_eps',update_eps.value);
            formData.append('update_fondo_pension',update_fondo_pension.value);
            formData.append('update_rol',update_fk_rol.value);
            formData.append('updated_at',update_updated_at.value);
    
            fetch('?c=Administradores&m=update', 
            {
                method : 'POST',
                body : formData,
               
            })
            .then(resp => (resp.ok) ? Promise.resolve(resp) : Promise.reject(new Error('fallo la actualizacion')))
            // .then(resp => resp.text())
            .then((data)=>{
                $("#ModalUpdateUser").modal('hide');
                let message = 'Usuario Actualizado Correctamente';
                // se llama la funcion de !=error
                msgSuccess(message);
                // se llama a la funcion de mostrar usuarios html
                showAllUsers();
               //  se reinicia a false el objeto formIsValid
                formIsValidReset();
               
            });
           
            }
            
        });
    
        
    });

}

// ! end JS Modulo Administrar Usuarios


//! JS Modulo Administrar Noticias

if(location.search =='?c=Administradores&m=showNews'){
    console.log('Modulo Gestion de Noticias');
    //? Guarda todos los datos de la tabla noticias (DB) 
    let allNewsData = [];

    //? Selecciona el tr donde se mostraran los campos (id,noticia,etc);
    const thBodyNews= document.getElementById('tablaAllNews');

  
    //? Manda la id y muestra los datos por id sin hacer peticion SQL 
    thBodyNews.addEventListener('click', (e) =>{

        const id = e.target;
        
        if( id.getAttribute('id'))
        {
            const newId = id.getAttribute('id');
            // buscar el id que coincida con el id obtenido del evento
            const newIdFilter=allNewsData.filter( noticia => noticia.id_noticia == newId)[0];
            // console.log(newIdFilter);
        
            if(id.getAttribute('data-target') == '#ModalUpdateNews')
            {
                showNewId(newIdFilter);
            }
            else if(id.getAttribute('data-target') == '#ModalDeleteNews')
            {
                const message= `${newIdFilter.titulo_noticia} del autor ${newIdFilter.nombres} ${newIdFilter.apellidos}`
                msgQuestion(message, newIdFilter.id_noticia);
            }
            else if(id.getAttribute('data-target') == '#ModalShowNews'){
                showNewIdCard(newIdFilter);
            }
        
        }
        
    })

        //? funcion de mostrar datos en la #ModalUpdateNews
        const showNewId= (noticia) => {
            console.log(noticia);
            const tituloNoticia= document.getElementById('update_titulo_noticia').value=`${noticia.titulo_noticia}`;
            const descripcionNoticia= document.getElementById('update_descripcion_noticia').textContent=`${noticia.descripcion_noticia}`;
            const fkUsuario= document.getElementById('update_fk_usuario').value=`${noticia.fk_usuario}`;
            const prevImgNoticia= document.getElementById('update_prev-img').src=`${noticia.imagen_noticia}`;
            const idNoticia= document.getElementById('update_id_noticia').value=`${noticia.id_noticia}`;
    
        }

        //? funcion de mostrar datos en la #ModalShowNews
        const showNewIdCard= (noticia) => {
            console.log(noticia);
            const tituloNoticia= document.getElementById('show_titulo_noticia').textContent=`${noticia.titulo_noticia}`;
            const descripcionNoticia= document.getElementById('show_descripcion_noticia').textContent=`${noticia.descripcion_noticia}`;
            const fechaNoticia= document.getElementById('show_fecha_noticia').textContent=`${noticia.nombres} ${noticia.apellidos} ${noticia.fecha_publicado}`;
            const prevImgNoticia= document.getElementById('show_prev_img').src=`${noticia.imagen_noticia}`;
            // const idNoticia= document.getElementById('show_id_noticia').value=`${noticia.id_noticia}`;
    
        }

        const updateImgNew=document.getElementById('update_new_img');
        const updatePrevImgNew=document.getElementById('update_prev-img');

        updateImgNew.addEventListener('change', () =>{
            validarImgNoticiasForm(updateImgNew,updatePrevImgNew,);
        })
        
        const btnSubmitFormUpdateNews = document.getElementById('ActualizarNoticia');

        btnSubmitFormUpdateNews.addEventListener('click',(e) =>{
            e.preventDefault();
            const tituloNoticia= document.getElementById('update_titulo_noticia');
            const descripcionNoticia= document.getElementById('update_descripcion_noticia');
            const fechaNoticia= document.getElementById('update_fecha_noticia');
            const fkUsuario= document.getElementById('update_fk_usuario');
            const idNoticia= document.getElementById('update_id_noticia');

            const img=updateImgNew.files[0];
            let validar =validarFormNews(tituloNoticia,descripcionNoticia,fkUsuario,updatePrevImgNew);

            if(validar == true)
            {
                const data = new FormData();
                data.append('update_id_noticia',idNoticia.value);
                data.append('update_titulo_noticia',tituloNoticia.value);
                data.append('update_descripcion_noticia',descripcionNoticia.value);
                data.append('update_fecha_noticia',fechaNoticia.value);
                data.append('update_fk_usuario',fkUsuario.value);
                data.append('update_new_img',img);
                fetch('?c=Administradores&m=updateNews',
                {
                    method: 'POST',
                    body: data
                })
                .then( response => (response.ok) ? Promise.resolve(response) : Promise.reject(new Error('Error al actualizar noticia')))
                .then(resp => resp.text())
                .then(data => {
                    $("#ModalUpdateNews").modal('hide');
                    const msg ='La noticia se ha actualizado correctamente';
                    msgSuccess(msg);
                    showAllNews();
                })
            }

        })

        //? funcion De Mensaje modal y callback de eliminar(deleteUser(id));
        const msgQuestion = (message, id) => {
            Swal.fire({
                icon: 'warning',
                html: `<p class="text-white h4 mb-3 text-capitalize">Desea borrar la noticia</p><p class="text-danger text-capitalize h6">${message}</p>`,
                focusConfirm:true,
                background : '#343a40',
                confirmButtonText: 'Entendido',
                confirmButtonColor: '#6C63FF',
                showCancelButton: true,
                cancelButtonText: 'Cancelar',
                cancelButtonColor: '#6C63FF'
              }).then((result) => {
                if (result.value) {
                  const msg = "El usuarios ha sido eliminado";
                  msgSuccess(msg);
                  deleteNew(id);
        
                };
            })
        }
    
        //? funcion de eliminar noticia
        const deleteNew = (id) =>{
            fetch(`?c=Administradores&m=destroyNew&id=${id}`,{
            }).then( resp =>  (resp.ok) ? Promise.resolve(resp) : Promise.reject(new Error('fallo el delete')))
            .then( resp => resp.text())
            .then((data) =>{
                // se actualiza la tabla
                showAllNews();
            }).catch(console.log);
        
        }


    //? Funcion del HTML de la tabla ShowNews
    const createAllNewsTable = (datos,count) =>{

        const fragment = document.createDocumentFragment();

        const trTableAllNews = document.createElement('TR');
        trTableAllNews.classList.add('table-light');

        const tdTableAllNews = document.createElement('TD');
        tdTableAllNews.setAttribute('colspan','1');

        tdTableAllNews.textContent = `${count}`;
        trTableAllNews.append(tdTableAllNews);

        const td2TableAllNews =document.createElement('TD');
        td2TableAllNews.setAttribute('colspan', '2');
        td2TableAllNews.textContent = `${datos.titulo_noticia}`;

        trTableAllNews.append(td2TableAllNews);

        const td3TableAllNews =document.createElement('TD');
        td3TableAllNews.setAttribute('colspan', '2');
        td3TableAllNews.textContent = `${datos.fecha_publicado}`;

        trTableAllNews.append(td3TableAllNews);

        const td4TableAllNews =document.createElement('TD');
        td4TableAllNews.textContent = `${datos.nombres} ${datos.apellidos}`;

        trTableAllNews.append(td4TableAllNews);


        const td5TableAllNews =document.createElement('TD');
        td5TableAllNews.classList.add('i-separated');


        let iTd5 =document.createElement('I');
        iTd5.id= `${datos.id_noticia}`;
        iTd5.setAttribute('data-toggle','modal');
        iTd5.setAttribute('data-target','#ModalShowNews');
        iTd5.classList.add('show-svg');
        td5TableAllNews.append(iTd5);

        let i2Td5 =document.createElement('I');
        i2Td5.id= `${datos.id_noticia}`;
        i2Td5.classList.add('edit-svg');
        i2Td5.setAttribute('data-toggle','modal');
        i2Td5.setAttribute('data-target','#ModalUpdateNews');

        td5TableAllNews.append(i2Td5);

        let i3Td5 =document.createElement('I');
        i3Td5.id=`${datos.id_noticia}`;
        i3Td5.classList.add('delete-svg');
        // i3Td5.setAttribute('data-toggle','modal');
        i3Td5.setAttribute('data-target','#ModalDeleteNews');

        td5TableAllNews.append(i3Td5);
        trTableAllNews.append(td5TableAllNews);

        fragment.append(trTableAllNews);
        return fragment;

    }

    const showAllNews = () =>{
        fetch('?c=Administradores&m=allNewsJson')
        .then(response => response.ok ? Promise.resolve(response) : Promise.reject(new Error('Fallo la consulta News')))
        .then(response => response.json())
        .then(data => {
        //Se guardan los datos en el array vacio
        allNewsData = data;
        console.log(allNewsData);
        const fragment = document.createDocumentFragment();
        let count = 0;
        for (const noticia of data) {
        count++;
        fragment.append(createAllNewsTable(noticia, count));
        }
        thBodyNews.innerHTML='';
        thBodyNews.append(fragment);

        }).catch( console.log);
    }


    const imgNew =document.getElementById('new_img');
    const prevImg =document.getElementById('prev-img');


    imgNew.addEventListener('change', () =>{
        validarImgNoticiasForm(imgNew,prevImg);

    })

    //? funcion que previsualiza la img selecciona y valida si es formato adecuado require la el INPUT(FILE) y un img(visualizar)
    const validarImgNoticiasForm= (imgNoticia,prevImgNew) =>{
        const img=imgNoticia.files[0];
        if(img["type"] != "image/jpeg" && img["type"] != "image/png" && img["type"] != "image/jpeg")
        {
            imgNoticia.value="";
            const msg ='la imagen debe ser png o jpeg';
            msgError(msg);
            prevImgNew.src='';
            prevImgNew.alt ='image not found';
            return false;
        }
        else if(img["size"] > 2000000)
        {
            imgNoticia.value="";
            const msg='la imagen debe ser menor a 2mb';
            msgError(msg);
            prevImgNew.src="";
            prevImgNew.alt ='image not found';
            return false;
        
        }
        else{
             prevImgNew.src='';
             const datosImagen = new FileReader; 
             datosImagen.readAsDataURL(img);
             datosImagen.addEventListener('load', (e) =>{
                 //obtiene la img en formato base64
                let rutaImagen = e.target.result;
                prevImgNew.src=rutaImagen;
             });
             return true;         
        }
    }

    //? Resetear valores en #ModalAddNews
    const resetValueForm= (titulo_noticia,descripcion_noticia,fecha_noticia,fk_usuario,img_noticia,prev_img_noticia) =>{
        const tituloNoticia= document.getElementById(titulo_noticia).value="";
        const descripcionNoticia= document.getElementById(descripcion_noticia).value="";
        const fechaNoticia= document.getElementById(fecha_noticia).value="";
        const fkUsuario= document.getElementById(fk_usuario).value="";
        const imgNoticia= document.getElementById(img_noticia).value="";
        const PrevimgNoticia= document.getElementById(prev_img_noticia).src="";
    }


    const btnCancelNew =document.getElementById('CancelarNoticia');
    btnCancelNew.addEventListener('click',() => {
        resetValueForm('titulo_noticia','descripcion_noticia','fecha_noticia','fk_usuario','new_img','prev-img');
    })

    const btnSubmitFormNews=document.getElementById('GuardarNoticia');
    btnSubmitFormNews.addEventListener('click',(e)=>{
        e.preventDefault();
        const tituloNoticia= document.getElementById('titulo_noticia');
        const descripcionNoticia= document.getElementById('descripcion_noticia');
        const fechaNoticia= document.getElementById('fecha_noticia');
        const fkUsuario= document.getElementById('fk_usuario');
        const img=imgNew.files[0];
        //prevImg = es igual a img.src


        let validar =validarFormNews(tituloNoticia,descripcionNoticia,fkUsuario,prevImg);
        if(validar ===  true)
        {
          
            const data = new FormData();
            data.append('titulo_noticia',tituloNoticia.value);
            data.append('descripcion_noticia',descripcionNoticia.value);
            data.append('fecha_noticia',fechaNoticia.value);
            data.append('new_img',img);
            data.append('fk_usuario',fkUsuario.value);

            fetch('?c=Administradores&m=storeNew',{
                method: 'POST',
                body: data
            })
            .then( response => (response.ok) ? Promise.resolve(response) : Promise.reject(new Error('Fallo la insercion')) )
            .then( resp => resp.text())
            .then(data => {

                $("#ModalAddNew").modal('hide');
                // se llama la funcion resetear valores del formulario y se les pasa la id
                resetValueForm('titulo_noticia','descripcion_noticia','fecha_noticia','fk_usuario','new_img','prev-img');
                let message = 'Noticia Agregada Correctamente';
                // se llama la funcion de !=error
                msgSuccess(message);
                // se llama a la funcion de mostrar usuarios html
                showAllNews();
            }).catch(console.log);
        }
     

    })

    const validarFormNews= (title,description,user,img) =>{
   
        if(title.value =="")
        {
            const msg = 'Ingrese el titulo de la Noticia';
            title.focus();
            msgError(msg);
        }else if(description.value ==''){
            const msg = 'Ingrese la descripcion de la Noticia';
            description.focus();
            msgError(msg);
        }else if(user.value ==''){
            const msg = 'Ingrese el autor de la Noticia';
            user.focus();
            msgError(msg);
        }else if(img.src =='' || img.alt == 'image not found'){
            const msg = 'Ingrese la imagen de la Noticia';
            img.focus();
            msgError(msg);
        }else{
            return true;
        }

    }
    

    showAllNews();


}


//! End JS Modulo Administrar Noticias


// ! JS Login Verificacion Modal

    $(document).ready(function()
    {
        //? function para limpiar los campos del modal #loginModal

        $("#btn-login").click(function(){
            $("#nombre_usuario").val("");
            $("#password").val("");
        });
    
        //? function para el login  modal #loginModal
        $("#login_index").click(function(e){
    
            e.preventDefault();
            if($("#nombre_usuario").val() == ""){
                const message = "Ingresar correo";
                msgError(message);
                $("#nombre_usuario").focus();
            }
            else if($("#password").val() == ""){
                const message = "Ingresar clave";
                msgError(message);
                $("#password").focus();
            }
            else{
                const nombre_usuario = $("#nombre_usuario").val();
                const password = $("#password").val();
                const datos = new FormData();
                datos.append('nombre_usuario',nombre_usuario);
                datos.append('password',password);
                console.log(datos.append);
                fetch('?c=Login&m=auth' ,{
                    method : 'POST',
                    body : datos
                }).then(resp => (resp.ok) ? Promise.resolve(resp) : Promise.reject(new Error('fallo el login')))      
                .then(resp => resp.text())
                .then((data) => {
                    if(data == ""){
                                const message = "Datos incorrectos";
                                msgError(message);
                            }
                            else{
                                location.href="?c=All&m=index";
    
                            }
                })
            }
        });
    
    })


// ! End JS Login






