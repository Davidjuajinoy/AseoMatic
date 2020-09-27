// ? Modal for Error and Success
const msgError =(message) => {
    Swal.fire({
        icon: 'error',
        html: `<p class="text-white h4 mb-3 text-capitalize">Error de validacion de datos en</p><p class="text-danger text-capitalize h6">${message}</p>`,
        focusConfirm:true,
        background : '#343a40',
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#6C63FF',
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


//? Funcion de Expresiones Regulares Para Email
const validateEmail = (email) => {
    const emailRegex = /^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(emailRegex.test(email)) return true //console.log('email válido')
    else return false
    // console.log('email incorrecto')
}
const validateName =(name) =>{
    const nameRegex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]{1,25}$/;
    if(nameRegex.test(name)) return true
    else return false
}
const validatePasswordModerate = (password) => {
    // Debe tener 1 letra minúscula, 1 letra mayúscula, 1 número y tener al menos 8 caracteres.
    const passwordRegex = /(?=(.*[0-9]))((?=.*[A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z]))^.{8,}$/;
    if(passwordRegex.test(password)) return true//console.log('password válido')
    else return false //console.log('password incorrecto')
}

const validateDocumentNumber = (documentNumber) => {
    const documentNumberRegex = /^((\d{8})|(\d{10}))?$/;
    if(documentNumberRegex.test(documentNumber)) return true//console.log('documento válido')
    else return false //console.log('documento incorrecto')
}


//! JS Modulo Administrar Usuarios

if(location.search == '?c=Usuarios&m=show' )
// || location.search == 'Usuarios/show' || location.pathname =='/AseoMatic/AseoMatic/Usuarios/show
{
    console.log('usuarios');

    //? Guarda todos los datos de la tabla Usuarios (DB) 
    let allUsersData= [];

    //? Selecciona el tr de la tabla donde se mostraran los campos (id,usuarios,etc);
    const thBody = document.getElementById('tablaAllUser');

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
                msgQuestion(message, userIdFilter.id_usuario, userIdFilter.token);
            }
            else if(id.getAttribute('data-target') == '#ModalShowUser'){
                showUserInfo(userIdFilter);
            }
        
        }


    })


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
        td2TableAllUsers.classList.add('text-capitalize');
        td2TableAllUsers.textContent = `${datos.nombres}`;

        trTableAllUsers.append(td2TableAllUsers);

        const td3TableAllUsers =document.createElement('TD');
        td3TableAllUsers.setAttribute('colspan', '2');
        td3TableAllUsers.classList.add('text-capitalize');
        td3TableAllUsers.textContent = `${datos.apellidos}`;

        trTableAllUsers.append(td3TableAllUsers);

        const td4TableAllUsers =document.createElement('TD');
        td4TableAllUsers.textContent = `${datos.numero_documento}`;

        trTableAllUsers.append(td4TableAllUsers);


        const td5TableAllUsers =document.createElement('TD');
        td5TableAllUsers.textContent = `${datos.correo}`;
        
        trTableAllUsers.append(td5TableAllUsers);

        const td6TableAllUsers =document.createElement('TD');
        td6TableAllUsers.classList.add('text-capitalize');
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

    //? Paginacion 

    let pagina = {
        pagina: 1,
        usuariosFila : 3
    }


    function pagination(pagina,usuariosFila,datos)
    {
        const trimStart =(pagina-1) * usuariosFila;
        const trimEnd =trimStart + usuariosFila;
        const datosRecortados = datos.slice(trimStart,trimEnd);

        const numeroPaginas = Math.ceil(datos.length / usuariosFila);

        renderizarHtml(datosRecortados);

        return{
            datosRecortados : datosRecortados,
            numeroPaginas : numeroPaginas
        }
    }

    const renderizarHtml=(datos )=> {
        const fragment = document.createDocumentFragment();
        let count= 0;
        for (const user of datos) {
            count++;
            fragment.append(createAllUsersTable(user,count));
        }
        thBody.innerHTML='';
        thBody.append(fragment);
    }

    const searchName = document.getElementById('buscador');
    searchName.addEventListener('input', function(e)
    {
        let value=searchName.value.toLowerCase();

        if(value.trim() != '')
        {
            for (const name of allUsersData) {
                let nombre = `${name.nombres} ${name.apellidos}`;
                let documento = `${name.numero_documento}`;
                if(nombre.indexOf(value) != -1 || documento.indexOf(value) != -1)
                {
                    thBody.innerHTML = '';
                    thBody.appendChild(createAllUsersTable(name,1));
                }
        
            }
            
        }

        if( value.trim() == '')
        {
            pagination(pagina.pagina,pagina.usuariosFila,allUsersData);
        }

    })


    function numbersButtoms(page)
    {
        const liMostrar =document.getElementById('pagination_users');
        liMostrar.innerHTML='';

        const liPrev = document.createElement('LI');
        liPrev.id="pagination-prev";
        liPrev.classList.add('page-item');
        const liPrevBtn = document.createElement('BUTTON');
        liPrevBtn.classList.add('page-link');
        liPrevBtn.textContent="Anterior";
        liPrev.append(liPrevBtn);
        liMostrar.append(liPrev)
        
    //   console.log(liMostrar.children[0]);
        for (let i = 1; i <= page; i++) {
            liMostrar.append(paginationHtml(i)); 
        }

        const liNext = document.createElement('LI');
        liNext.id="pagination-next";
        liNext.classList.add('page-item','xd');
        const liNextBtn = document.createElement('BUTTON');
        liNextBtn.classList.add('page-link');
        liNextBtn.textContent="Siguiente";
        liNext.append(liNextBtn);
        liMostrar.append(liNext)


        const classActives = document.querySelectorAll('.page-item ');
        classActives[pagina.pagina].classList.add('active');

        if(pagina.pagina = 1) classActives[0].classList.add('disabled');
        
        
                    

        liMostrar.addEventListener('click',function(e)
        {
            const classActive = document.querySelector('.page-item + .active');
            if(e.target.localName == 'button')
            {
      
                
                if(e.target.textContent != 'Siguiente' && e.target.textContent != 'Anterior')
                {
                    let numero = e.target.textContent;
                    pagina.pagina =(Number(numero));
                    pagination(pagina.pagina,pagina.usuariosFila,allUsersData);
                }
                else if(e.target.textContent == 'Siguiente')
                {
                    if(pagina.pagina < page)
                    {
                        pagina.pagina+=1;
                        pagination(pagina.pagina,pagina.usuariosFila,allUsersData);
                        classActive.classList.remove('active');
                        classActives[pagina.pagina].classList.add('active');
                    }
                    
          
                }
                else if(e.target.textContent == 'Anterior'  && pagina.pagina > 1 )
                {
                    pagina.pagina-=1;
                    pagination(pagina.pagina,pagina.usuariosFila,allUsersData);
                    classActive.classList.remove('active');
                    classActives[pagina.pagina].classList.add('active');
                }

                if(e.target.textContent == pagina.pagina)
                {
                        classActive.classList.remove('active');
                        e.target.parentElement.classList.add('active');
            
                }

                if(pagina.pagina > 1 && classActives[0].classList.contains('disabled')) 
                {
                    classActives[0].classList.remove('disabled');
                }
                else if( pagina.pagina == 1)
                {
                    classActives[0].classList.add('disabled');
                }

                if(pagina.pagina == (page))
                {
                    classActives[(page+1)].classList.add('disabled');

                }else if(pagina.pagina < (page))
                {
                    classActives[(page+1)].classList.remove('disabled');
                }
                
                    
                
            }
         
        })

      
        

    }

    const paginationHtml = (count) =>{

        const fragment = document.createDocumentFragment();

        const liBtnPagination = document.createElement('LI');
        liBtnPagination.classList.add('page-item');

        const liBtnPaginationButtom = document.createElement('BUTTON');
        liBtnPaginationButtom.classList.add('page-link');
        liBtnPaginationButtom.textContent=`${count}`;
        liBtnPagination.append(liBtnPaginationButtom);

        fragment.append(liBtnPagination);

        return fragment;
    }

    //? Peticion Ajax de usuarios de DB Admin.usuarios.php
    const showAllUsers = ()=> {
       
        // fetch( `${url}Usuarios/allUsersJson`)
        fetch( `?c=Usuarios&m=allUsersJson`)
        .then(resp => resp.ok  ? Promise.resolve(resp)  : Promise.reject(new Error('Fallos la consulta')))
        .then(response => response.json())
        .then( data => {
            //? se guardar los datos en el array (esto es para detalles y actualizar)
            allUsersData = data;
            // console.log(allUsersData);
            const paginationC=pagination(pagina.pagina, pagina.usuariosFila,data);

            numbersButtoms(paginationC.numeroPaginas)

           
        })
        .catch( error => console.log(error));
    }

    //? funcion para mostrar los campos en el #ModalUpdate de Administrador.usuarios
    const showUserId= (user) => {
        const nombres = document.getElementById("update_nombres").value=`${user.nombres}`;
        const apellidos = document.getElementById("update_apellidos").value=`${user.apellidos}`;
        const correo = document.getElementById("update_correo").value=`${user.correo}`;
        const rol = document.getElementById("update_rol").value=`${user.fk_rol}`;
        const clave = document.getElementById("update_clave").value=``;
        const tipo_documento = document.getElementById("update_tipo_documento").value=`${user.fk_tipo_documento}`;
        const numero_documento = document.getElementById("update_numero_documento").value=`${user.numero_documento}`;
        const cargo = document.getElementById("update_cargo").value=`${user.fk_cargo}`;
        const eps = document.getElementById("update_eps").value=`${user.fk_eps}`;
        const fondo_pension = document.getElementById("update_fondo_pension").value=`${user.fk_fondo_pension}`;
        const id =document.getElementById('update_id').value=`${user.id_usuario}`;
        const token =document.getElementById('token').value=`${user.token}`;
        const clave_antigua =document.getElementById('clave_antigua').value=`${user.clave}`;
        const updatePrevImgUser=document.getElementById('update_prev_user_img').src=`${user.img_usuario}`;
    
    }

    //? funcion para mostrar los campos en el #ModalShow de Administrador.usuarios
    const showUserInfo = (user)=>{
        const nombres = document.getElementById("show_nombres").textContent=`${user.nombres} ${user.apellidos}`;
        const correo = document.getElementById("show_correo").textContent=`${user.correo}`;
        const rol = document.getElementById("show_rol").value=`${user.fk_rol}`;
        const tipo_documento = document.getElementById("show_tipo_documento").value=`${user.fk_tipo_documento}`;
        const numero_documento = document.getElementById("show_numero_documento").textContent=`${user.numero_documento}`;
        const cargo = document.getElementById("show_cargo").value=`${user.fk_cargo}`;
        const eps = document.getElementById("show_eps").value=`${user.fk_eps}`;
        const fondo_pension = document.getElementById("show_fondo_pension").value=`${user.fk_fondo_pension}`;
        const img_usuario = document.getElementById("show_user_img").src=`${user.img_usuario}`;
    }

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

    //? Resetear valores en #ModalAddNews
    const resetValueFormModal= () =>{
        const nombres = document.getElementById("nombres").value="";
        const apellidos = document.getElementById("apellidos").value="";
        const correo = document.getElementById("correo").value="";
        const clave = document.getElementById("clave").value="";
        const tipo_documento = document.getElementById("tipo_documento").value="";
        const numero_documento = document.getElementById("numero_documento").value="";
        const cargo = document.getElementById("cargo").value="";
        const eps = document.getElementById("eps").value="";
        const fondo_pension = document.getElementById("fondo_pension").value="";
        const fk_rol = document.getElementById('rol').value="";
        const prev_user_img = document.getElementById('prev_user_img').src ="";
        const user_img = document.getElementById('user_img').value="";
    }


    //? Funcion de Seguridad verificar el estado de la funcion formIsValid() 
    const validateForm = () => {
        //?  primero convierto a array el objeto formIsValid
        const formValues = Object.values(formIsValid);
        //? una vez hecho array busco con el metodo findIndex que el valor este en false
        const valid = formValues.findIndex(value => value == false);
        //? si el valor esta en false retorna el numero del array (0,1,2,3) etc pero si no encuentra ningun false retorna -1
        if(valid == -1) return true;
        else return false;
    }

     //? Validacion de alertas de Error de Formulario de Usuarios
     const validarFormUsers = (paramNombre,paramApellido,paramCorreo,paramNumeroDocumento,paramFkRol,paramFondoPension,paramCargo,paramTipoDocumento,paramEps) =>
     {
         // tiene que ser parametro id "#ejemplo"
         if(paramNombre.value == ""){
             paramNombre.focus();
             const message = "Ingresar nombres del usuario";
             msgError(message);
         }
         else if(validateName(paramNombre.value) == false)
         {
            paramNombre.focus();
            const message = "El nombre ingresado no es valido";
            msgError(message);
         }
         else if(paramApellido.value == ""){
             paramApellido.focus();
             const message = "Ingresar apellidos del usuario";
             msgError(message);
         }
         else if(validateName(paramApellido.value) == false){
            paramApellido.focus();
            const message = "El apellido ingresado no es valido";
            msgError(message);
        }
         else if(paramCorreo.value == ""){
             paramCorreo.focus();
             const message = "Ingresar correo del usuario";
             msgError(message);
         }
         else if(validateEmail(paramCorreo.value) == false)
         {
             paramCorreo.focus();
             const message = "El Correo Ingresado No es Valido";
             msgError(message);
         }   
         else if(paramNumeroDocumento.value == ""){
             paramNumeroDocumento.focus();
             const message = "Ingresar numero documento";
             msgError(message);
         }
         else if(validateDocumentNumber(paramNumeroDocumento.value) != true)
         {
            paramNumeroDocumento.focus();
            const message = "Numero documento no valido";
            msgError(message);
         }    
         else if(paramTipoDocumento.value == ""){
             paramTipoDocumento.focus();    
             const message = "Seleccionar el tipo de documento";
             msgError(message);
         }
         else if(paramCargo.value == ""){
            paramCargo.focus();     
            const message = "Seleccionar el cargo";
            msgError(message);
        }
        else if(paramEps.value == ""){
            paramEps.focus();
            const message = "Seleccionar la eps";
            msgError(message);
        }
        else if(paramFondoPension.value == ""){
            paramFondoPension.focus();            
            const message = "Seleccionar el fondo de pensiones";
            msgError(message);
        }
        else if(paramFkRol.value == ""){
            paramFkRol.focus();          
            const message = "Seleccionar el tipo de Rol";
            msgError(message);
        }
        else{
             formIsValid.nombre = true;
             formIsValid.apellido= true;
             formIsValid.correo= true;
             formIsValid.numeroDocumento= true;
             formIsValid.fkRol= true;
             formIsValid.fondoPension= true;
             formIsValid.fondoPension= true;
             formIsValid.cargo = true;
             formIsValid.tipoDocumento = true;
             formIsValid.eps = true;
             return true;
         }
     };

     const validarFormUsersPass= (paramClave) =>
     {
        if(paramClave.value == ""){
            paramClave.focus();
            const message = "Ingresar clave del usuario";
            msgError(message);
        }
        else if(validatePasswordModerate(paramClave.value) == false)
        {
            paramClave.focus();
            const message = "Clave no valida Debe tener 1 letra minúscula, 1 letra mayúscula, 1 número y tener al menos 8 caracteres.";
            msgError(message);
        }else{
            formIsValid.clave= true;
            return true;
        }    
     }

         //? DOM de visualizar de img  y input file
    const userImg =document.getElementById('user_img');
    const prevUserImg =document.getElementById('prev_user_img');
    const updateImgUser=document.getElementById('update_user_img');
    const updatePrevImgUser=document.getElementById('update_prev_user_img');

    //? funcion que previsualiza la img selecciona y valida si es formato adecuado require la el INPUT(FILE) y un img(visualizar)
    const validarImgUsuariosForm= (imgNoticia,prevImgNew) =>{
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
            //  cuando cargue el archivo que lo muestre
                datosImagen.addEventListener('load', (e) =>{
                    //obtiene la img en formato base64
                prevImgNew.src=e.target.result;
                });
                return true;         
        }
    }

    //? Ejecutar validarImgEventosForm() cuando se cambie de imagen en insertar Evento en #ModalAddEvents 
    userImg.addEventListener('change', () =>{
        validarImgUsuariosForm(userImg,prevUserImg);

    })

    //? Ejecutar validarImgEventosForm() cuando se cambie de imagen en actualizar Evento en #ModalUpdateEvents
    updateImgUser.addEventListener('change', () =>{
        validarImgUsuariosForm(updateImgUser,updatePrevImgUser,);
    })

    //? funcion para guardar el usuario en DB en dashboard-admin : usuarios.php modal #ModalAddUser
    const btnSubmitFormUsers = document.getElementById('GuardarUsuario');
    btnSubmitFormUsers.addEventListener('click',(e)=>{
        e.preventDefault();
        const nombres = document.getElementById("nombres");
        const apellidos = document.getElementById("apellidos");
        const correo = document.getElementById("correo");
        const tipo_documento = document.getElementById("tipo_documento");
        const clave = document.getElementById("clave");
        const numero_documento = document.getElementById("numero_documento");
        const cargo = document.getElementById("cargo");
        const eps = document.getElementById("eps");
        const fondo_pension = document.getElementById("fondo_pension");
        const fk_rol = document.getElementById('rol');
        const img = userImg.files[0];
        
         const validarForm =  validarFormUsers(nombres,apellidos,correo,numero_documento,fk_rol,fondo_pension,cargo,tipo_documento,eps);

         
         if(validarForm == true )
         {   
             const validarClave = validarFormUsersPass(clave);
             if(validarClave == true && validateForm() == true){
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
                formData.append('user_img',img);
                

                fetch('?c=Usuarios&m=store' , 
                {
                    method : 'POST',
                    body : formData,

                })
                .then(resp => (resp.ok) ? Promise.resolve(resp) : Promise.reject(new Error('fallo la insercion')))
                .then(resp => resp.json())
                .then((data)=>{
                    if(data.error == 'correoExistente')
                    {
                        correo.focus();
                        const msg ='Ya hay otra persona que tiene esta dirección de correo electrónico.';
                        msgError(msg);
                    }
                    else if(data.error == 'errorAgregarUsuario')
                    {
                        const msg ='Fallo la creacion de usuario';
                        msgError(msg);
                    }
                    else if(data.ok){

                        $("#ModalAddUser").modal('hide');
                        let message = 'Usuario Agregado Correctamente';
                        // se llama la funcion de !=error
                        msgSuccess(message);
                        // se llama a la funcion de mostrar usuarios html
                        showAllUsers();
                    //  se reinicia a false el objeto formIsValid
                        formIsValidReset();
                    //  se reinician los  valores de los input solicitados 
                        resetValueFormModal();
                    }

                }).catch(console.log);
            }
        }
    })

    //? funcion para limpiar los input en cancelar ModalAddUser
    const btnCancelUser= document.getElementById('CancelarUsuario');
    btnCancelUser.addEventListener('click',() => {
        resetValueFormModal();
    })

    //? funcion para actualizar el usuario en DB en dashboard-admin : usuarios.php modal #ModalUpdateUser
    const btnSubmitFormUpdateUsers = document.getElementById('EditarUsuario');
    btnSubmitFormUpdateUsers.addEventListener('click',(e)=>
    {
        e.preventDefault();
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
        const token = document.getElementById("token");
        const clave_antigua = document.getElementById("clave_antigua");
        const img = updateImgUser.files[0];

        let validar = validarFormUsers(update_nombres,update_apellidos,update_correo,update_numero_documento,update_fk_rol,update_fondo_pension,update_cargo,update_tipo_documento,update_eps);

        if(update_clave.value == '')
        {
            formIsValid.clave = true;
        }else{
            validarFormUsersPass(update_clave);
        }

        if(validar == true && validateForm() == true)
        {
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
            formData.append('token',token.value);
            formData.append('clave_antigua',clave_antigua.value);
            formData.append('update_user_img',img);
    
            fetch('?c=Usuarios&m=update', 
            {
                method : 'POST',
                body : formData,
               
            })
            .then(resp => (resp.ok) ? Promise.resolve(resp) : Promise.reject(new Error('fallo la actualizacion')))
            .then(resp => resp.json())
            .then((data)=>{

                if(data.error == 'correoExistente')
                {
                    correo.focus();
                    const msg ='Ya hay otra persona que tiene esta dirección de correo electrónico.';
                    msgError(msg);
                }
                else if(data.error){ 
                    const msg ='Fallo la actualizacion del usuario';
                    msgError(msg);
                }
                else if(data.ok){
                    $("#ModalUpdateUser").modal('hide');
                    let message = 'Usuario Actualizado Correctamente';
                    // se llama la funcion de !=error
                    msgSuccess(message);
                    // se llama a la funcion de mostrar usuarios html
                    showAllUsers();
                //  se reinicia a false el objeto formIsValid
                    formIsValidReset();  
                }  
            })
            .catch(console.log);
        }

    })

    //? funcion De Mensaje modal y callback de eliminar(deleteUser(id));
    const msgQuestion = (message, id, token) => {
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
                deleteUser(id,token);
    
            };
        })
    }

    //? peticion para eliminar usuario mediante id
    const deleteUser = (id,token) =>{
        fetch(`?c=Usuarios&m=destroy&delete_id=${id}&token=${token}`,{
        }).then( resp =>  (resp.ok) ? Promise.resolve(resp) : Promise.reject(new Error('fallo el delete')))
        .then( resp => resp.text())
        .then((data) =>{
            // se actualiza la tabla
            showAllUsers();
        })
    
    }

    //? Se ejecuta la para la creacion de los datos cuando acceda a Modulo Usuarios
    showAllUsers()

}

// ! end JS Modulo Administrar Usuarios


//! JS Modulo Administrar Noticias

if(location.search =='?c=Noticias&m=showNews'){
    console.log('news');


    //? Guarda todos los datos de la tabla noticias (DB) 
    let allNewsData = [];

    //? Selecciona el tr de la tabla donde se mostraran los campos (id,noticia,etc);
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

    
    //? Funcion del html de td para mostrar en tabla en Admin.noticias.php
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

    //? Funcion AJAX de datos DB NoticiasController.php
    const showAllNews = () =>{
        fetch('?c=Noticias&m=allNewsJson')
        .then(response => response.ok ? Promise.resolve(response) : Promise.reject(new Error('Fallo la consulta News')))
        .then(response => response.json())
        .then(data => {
        //Se guardan los datos en el array vacio
        allNewsData = data;
        // console.log(allNewsData);
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
    //? DOM de visualizar de img  y input file
    const imgNew =document.getElementById('new_img');
    const prevImg =document.getElementById('prev-img');
    const updateImgNew=document.getElementById('update_new_img');
    const updatePrevImgNew=document.getElementById('update_prev-img');
    
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
            //  cuando cargue el archivo que lo muestre
             datosImagen.addEventListener('load', (e) =>{
                 //obtiene la img en formato base64
                prevImgNew.src=e.target.result;
             });
             return true;         
        }
    }

    //? Ejecutar validarImgNoticiasFomr() cuando se cambie de imagen en insertar Noticia.
    imgNew.addEventListener('change', () =>{
        validarImgNoticiasForm(imgNew,prevImg);
    })

    //? Ejecutar validarImgNoticiasFomr() cuando se cambie de imagen en Actualizar Noticia.
    updateImgNew.addEventListener('change', () =>{
        validarImgNoticiasForm(updateImgNew,updatePrevImgNew,);
    })

    //? Validacion de alertar de Error de Formulario de Noticias
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

    //? Resetear valores en #ModalAddNews
    const resetValueForm= (titulo_noticia,descripcion_noticia,fecha_noticia,fk_usuario,img_noticia,prev_img_noticia) =>{
        const tituloNoticia= document.getElementById(titulo_noticia).value="";
        const descripcionNoticia= document.getElementById(descripcion_noticia).value="";
        const fechaNoticia= document.getElementById(fecha_noticia).value="";
        const fkUsuario= document.getElementById(fk_usuario).value="";
        const imgNoticia= document.getElementById(img_noticia).value="";
        const PrevimgNoticia= document.getElementById(prev_img_noticia).src="";
    }
        
    //? funcion para guardar la noticia en DB en noticias.php modal #ModalAddNew
    const btnSubmitFormNews=document.getElementById('GuardarNoticia');
    btnSubmitFormNews.addEventListener('click',(e)=>{
           e.preventDefault();
           const tituloNoticia= document.getElementById('titulo_noticia');
           const descripcionNoticia= document.getElementById('descripcion_noticia');
           const fechaNoticia= document.getElementById('fecha_noticia');
           const fkUsuario= document.getElementById('fk_usuario');
           const img=imgNew.files[0];
   
           let validar =validarFormNews(tituloNoticia,descripcionNoticia,fkUsuario,prevImg);
           if(validar ===  true)
           {
               const data = new FormData();
               data.append('titulo_noticia',tituloNoticia.value);
               data.append('descripcion_noticia',descripcionNoticia.value);
               data.append('fecha_noticia',fechaNoticia.value);
               data.append('new_img',img);
               data.append('fk_usuario',fkUsuario.value);
   
               fetch('?c=Noticias&m=storeNew',{
                   method: 'POST',
                   body: data
               })
               .then( response => (response.ok) ? Promise.resolve(response) : Promise.reject(new Error('Fallo la insercion')) )
               .then( resp => resp.json())
               .then(data => {
                   if(data.ok)
                   {
                        $("#ModalAddNew").modal('hide');
                        // se llama la funcion resetear valores del formulario y se les pasa la id
                        resetValueForm('titulo_noticia','descripcion_noticia','fecha_noticia','fk_usuario','new_img','prev-img');
                        let message = 'Noticia Agregada Correctamente';
                        // se llama la funcion de !=error
                        msgSuccess(message);
                        // se llama a la funcion de mostrar usuarios html
                        showAllNews();
                   }else{
                        const msg ='Error ha modificado el html';
                        msgError(msg)
                        setTimeout(() => {
                            location="?c=All&m=index";
                        }, 1500);
                   }
          
               }).catch(console.log);
   
           }
        
   
       })
   
    //? funcion para resetear valores de modal #ModalAddNew
    const btnCancelNew =document.getElementById('CancelarNoticia');
    btnCancelNew.addEventListener('click',() => {
        resetValueForm('titulo_noticia','descripcion_noticia','fecha_noticia','fk_usuario','new_img','prev-img');
    })

    //? funcion para Actualizar la noticia en DB en noticias.php modal #ModalAddNew
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
            fetch('?c=Noticias&m=updateNews',
            {
                method: 'POST',
                body: data
            })
            .then( response => (response.ok) ? Promise.resolve(response) : Promise.reject(new Error('Error al actualizar noticia')))
            .then(resp => resp.json())
            .then(data => {
                if(data.ok)
                {
                    $("#ModalUpdateNews").modal('hide');
                    const msg ='La noticia se ha actualizado correctamente';
                    msgSuccess(msg);
                    showAllNews();
                }else{
                    const msg ='Error ha modificado el html';
                    msgError(msg)
                    setTimeout(() => {
                        location="?c=All&m=index";
                    }, 1500);
                }
            }).catch(console.log);
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
        fetch(`?c=Noticias&m=destroyNew&id=${id}`,{
        }).then( resp =>  (resp.ok) ? Promise.resolve(resp) : Promise.reject(new Error('fallo el delete')))
        .then( resp => resp.text())
        .then((data) =>{
            // se actualiza la tabla
            showAllNews();
        }).catch(console.log);
    
    }

    //? Se ejecuta la para la creacion de los datos cuando acceda a Modulo Noticias
    showAllNews();


}

//! End JS Modulo Administrar Noticias





//! JS Modulo Administrar Eventos
if(location.search == '?c=Eventos&m=showEvents')
{
    console.log('eventos');

    //? Guarda todos los datos de la tabla Eventos (DB) 
    let allEventsData = [];

    //? Selecciona el tr donde se mostraran los campos (id,noticia,etc);
    const thBodyEvents= document.getElementById('tablaAllEvents');

    //? Funcion del HTML de la tabla ShowNews
    const createAllEventsTable = (datos,count) =>{

        const fragment = document.createDocumentFragment();

        const trTableAllEvents = document.createElement('TR');
        trTableAllEvents.classList.add('table-light');

        const tdTableAllEvents = document.createElement('TD');
        tdTableAllEvents.setAttribute('colspan','1');

        tdTableAllEvents.textContent = `${count}`;
        trTableAllEvents.append(tdTableAllEvents);

        const td2TableAllEvents =document.createElement('TD');
        td2TableAllEvents.setAttribute('colspan', '2');
        td2TableAllEvents.textContent = `${datos.titulo_evento}`;

        trTableAllEvents.append(td2TableAllEvents);

        const td3TableAllEvents =document.createElement('TD');
        td3TableAllEvents.setAttribute('colspan', '2');
        td3TableAllEvents.textContent = `${datos.fecha_publicado}`;

        trTableAllEvents.append(td3TableAllEvents);

        const td4TableAllEvents =document.createElement('TD');
        td4TableAllEvents.textContent = `${datos.nombres} ${datos.apellidos}`;

        trTableAllEvents.append(td4TableAllEvents);


        const td5TableAllEvents =document.createElement('TD');
        td5TableAllEvents.classList.add('i-separated');


        let iTd5 =document.createElement('I');
        iTd5.id= `${datos.id_evento}`;
        iTd5.setAttribute('data-toggle','modal');
        iTd5.setAttribute('data-target','#ModalShowEvents');
        iTd5.classList.add('show-svg');
        td5TableAllEvents.append(iTd5);

        let i2Td5 =document.createElement('I');
        i2Td5.id= `${datos.id_evento}`;
        i2Td5.classList.add('edit-svg');
        i2Td5.setAttribute('data-toggle','modal');
        i2Td5.setAttribute('data-target','#ModalUpdateEvents');

        td5TableAllEvents.append(i2Td5);

        let i3Td5 =document.createElement('I');
        i3Td5.id=`${datos.id_evento}`;
        i3Td5.classList.add('delete-svg');
        // i3Td5.setAttribute('data-toggle','modal');
        i3Td5.setAttribute('data-target','#ModalDeleteEvents');

        td5TableAllEvents.append(i3Td5);
        trTableAllEvents.append(td5TableAllEvents);

        fragment.append(trTableAllEvents);
        return fragment;

    }
    
    //? Muestra los registros de Eventos de la DB en la tabla  Ajax
    const showAllEvents = ()=> {

        fetch('?c=Eventos&m=allEventsJson')
        .then(resp => resp.ok  ? Promise.resolve(resp)  : Promise.reject(new Error('Fallos la consulta')))
        .then(response => response.json())
        .then( data => {
            //? se guardar los datos en el array (esto es para detalles y actualizar)
            allEventsData = data;
            // console.log(allEventsData);
            const fragment = document.createDocumentFragment();
            let count= 0;
            for (const user of data) {
                count++;
                fragment.append(createAllEventsTable(user,count));
            }
            thBodyEvents.innerHTML='';
            thBodyEvents.append(fragment);
        })
        .catch( error => console.log(error));
    }

    //? funcion de mostrar datos en la #ModalUpdateEvents
     const showEventId= (evento) => {
        // console.log(evento);
        const tituloEvento= document.getElementById('update_titulo_evento').value=`${evento.titulo_evento}`;
        const descripcionEvento= document.getElementById('update_descripcion_evento').textContent=`${evento.descripcion_evento}`;
        const fkUsuario= document.getElementById('update_fk_usuario').value=`${evento.fk_usuario}`;
        const prevImgEvento= document.getElementById('update_prev-img').src=`${evento.imagen_evento}`;
        const idEvento= document.getElementById('update_id_evento').value=`${evento.id_evento}`;

    }

    //? funcion de mostrar datos en la #ModalShowEvents
    const showEventIdCard= (evento) => {
        // console.log(evento);
        const tituloEvento= document.getElementById('show_titulo_evento').textContent=`${evento.titulo_evento}`;
        const descripcionEvento= document.getElementById('show_descripcion_evento').textContent=`${evento.descripcion_evento}`;
        const fechaEvento= document.getElementById('show_fecha_evento').textContent=`${evento.nombres} ${evento.apellidos} ${evento.fecha_publicado}`;
        const prevImgEvento= document.getElementById('show_prev_img').src=`${evento.imagen_evento}`;
        // const idevento= document.getElementById('show_id_evento').value=`${evento.id_evento}`;

    }


    //? Validacion de alertas de Error de Formulario de Eventos
    const validarFormEvents= (title,description,user,img) =>{
   
        if(title.value =="")
        {
            const msg = 'Ingrese el titulo del Evento';
            title.focus();
            msgError(msg);
        }else if(description.value ==''){
            const msg = 'Ingrese la descripcion del Evento';
            description.focus();
            msgError(msg);
        }else if(user.value ==''){
            const msg = 'Ingrese el autor del Evento';
            user.focus();
            msgError(msg);
        }else if(img.src =='' || img.alt == 'image not found'){
            const msg = 'Ingrese la imagen del Evento';
            img.focus();
            msgError(msg);
        }else{
            return true;
        }

    }

    //? Resetear valores en #ModalAddEvents
    const resetValueForm= (titulo_evento,descripcion_evento,fecha_evento,fk_usuario,img_evento,prev_img_evento) =>{
        const tituloEvento= document.getElementById(titulo_evento).value="";
        const descripcionEvento= document.getElementById(descripcion_evento).value="";
        const fechaEvento= document.getElementById(fecha_evento).value="";
        const fkUsuario= document.getElementById(fk_usuario).value="";
        const imgEvento= document.getElementById(img_evento).value="";
        const PrevimgEvento= document.getElementById(prev_img_evento).src="";
    }

    //? DOM de visualizar de img  y input file
    const imgNew =document.getElementById('event_img');
    const prevImg =document.getElementById('prev-img');
    const updateImgEvent=document.getElementById('update_event_img');
    const updatePrevImgEvent=document.getElementById('update_prev-img');

    //? funcion que previsualiza la img selecciona y valida si es formato adecuado require la el INPUT(FILE) y un img(visualizar)
    const validarImgEventosForm= (imgNoticia,prevImgNew) =>{
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
            //  cuando cargue el archivo que lo muestre
                datosImagen.addEventListener('load', (e) =>{
                    //obtiene la img en formato base64
                prevImgNew.src=e.target.result;
                });
                return true;         
        }
    }

    //? Ejecutar validarImgEventosForm() cuando se cambie de imagen en insertar Evento en #ModalAddEvents 
    imgNew.addEventListener('change', () =>{
        validarImgEventosForm(imgNew,prevImg);

    })

    //? Ejecutar validarImgEventosForm() cuando se cambie de imagen en actualizar Evento en #ModalUpdateEvents
    updateImgEvent.addEventListener('change', () =>{
        validarImgEventosForm(updateImgEvent,updatePrevImgEvent,);
    })



   //? Obtener ID y ejecutar metodos POST para edit y delete
    thBodyEvents.addEventListener('click', (e) =>{
        const id = e.target;
        // console.log(id);
        if( id.getAttribute('id'))
        {
            const eventId = id.getAttribute('id');
            // buscar el id que coincida con el id obtenido del evento
            const eventIdFilter=allEventsData.filter( evento => evento.id_evento == eventId)[0];
            // console.log(eventIdFilter);
        
            if(id.getAttribute('data-target') == '#ModalUpdateEvents')
            {
                showEventId(eventIdFilter);
            }
            else if(id.getAttribute('data-target') == '#ModalDeleteEvents')
            {
                const message= `${eventIdFilter.titulo_evento} del autor ${eventIdFilter.nombres} ${eventIdFilter.apellidos}`
                msgQuestion(message, eventIdFilter.id_evento);
            }
            else if(id.getAttribute('data-target') == '#ModalShowEvents'){
                showEventIdCard(eventIdFilter);
            }
        
        }
        
    })

    

    //? Peticion AJAX de Agregar Evento 
    const btnSubmitFormEvent=document.getElementById('GuardarEvento');
    btnSubmitFormEvent.addEventListener('click',(e)=>{
        e.preventDefault();
        const tituloEvento= document.getElementById('titulo_evento');
        const descripcionEvento= document.getElementById('descripcion_evento');
        const fechaEvento= document.getElementById('fecha_evento');
        const fkUsuario= document.getElementById('fk_usuario');
        const img=imgNew.files[0];
        //prevImg = es igual a img.src

        let validar =validarFormEvents(tituloEvento,descripcionEvento,fkUsuario,prevImg);
        if(validar ===  true)
        {
          
            const data = new FormData();
            data.append('titulo_evento',tituloEvento.value);
            data.append('descripcion_evento',descripcionEvento.value);
            data.append('fecha_evento',fechaEvento.value);
            data.append('event_img',img);
            data.append('fk_usuario',fkUsuario.value);

            fetch('?c=Eventos&m=storeEvents',{
                method: 'POST',
                body: data
            })
            .then( response => (response.ok) ? Promise.resolve(response) : Promise.reject(new Error('Fallo la insercion')) )
            .then( resp => resp.json())
            .then(data => {

                if(data.ok)
                {
                    $("#ModalAddEvents").modal('hide');
                    // se llama la funcion resetear valores del formulario y se les pasa la id
                    resetValueForm('titulo_evento','descripcion_evento','fecha_evento','fk_usuario','event_img','prev-img');
                    let message = 'Evento Agregada Correctamente';
                    // se llama la funcion de !=error
                    msgSuccess(message);
                    // se llama a la funcion de mostrar usuarios html
                    showAllEvents();
                }else{
                    const msg ='Error ha modificado el html';
                    msgError(msg)
                    setTimeout(() => {
                        location="?c=All&m=index";
                    }, 1500);
                }
            }).catch(console.log);
        }
     

    })

    const btnCancelNew =document.getElementById('CancelarEvento');
    btnCancelNew.addEventListener('click',() => {
        resetValueForm('titulo_evento','descripcion_evento','fecha_evento','fk_usuario','event_img','prev-img');
    })

    //? Peticion AJAX para Actualizar Evento 
    const btnSubmitFormUpdateEvents = document.getElementById('ActualizarEvento');
    btnSubmitFormUpdateEvents.addEventListener('click',(e) =>{
        e.preventDefault();
        const tituloEvento= document.getElementById('update_titulo_evento');
        const descripcionEvento= document.getElementById('update_descripcion_evento');
        const fechaEvento= document.getElementById('update_fecha_evento');
        const fkUsuario= document.getElementById('update_fk_usuario');
        const idEvento= document.getElementById('update_id_evento');

        const img=updateImgEvent.files[0];
        let validar =validarFormEvents(tituloEvento,descripcionEvento,fkUsuario,updatePrevImgEvent);

        if(validar == true)
        {
            const data = new FormData();
            data.append('update_id_evento',idEvento.value);
            data.append('update_titulo_evento',tituloEvento.value);
            data.append('update_descripcion_evento',descripcionEvento.value);
            data.append('update_fecha_evento',fechaEvento.value);
            data.append('update_fk_usuario',fkUsuario.value);
            data.append('update_event_img',img);
            fetch('?c=Eventos&m=updateEvents',
            {
                method: 'POST',
                body: data
            })
            .then( response => (response.ok) ? Promise.resolve(response) : Promise.reject(new Error('Error al actualizar noticia')))
            .then(resp => resp.json())
            .then(data => {
                if(data.ok)
                {
                    $("#ModalUpdateEvents").modal('hide');
                    const msg ='El Evento se ha actualizado correctamente';
                    msgSuccess(msg);
                    showAllEvents();
                }else{
                    const msg ='Error ha modificado el html';
                    msgError(msg)
                    setTimeout(() => {
                        location="?c=All&m=index";
                    }, 1500);
                }

                
            })
        }

    })


    //? funcion De Mensaje modal y callback de eliminar(deleteUser(id));
    const msgQuestion = (message, id) => {
        Swal.fire({
            icon: 'warning',
            html: `<p class="text-white h4 mb-3 text-capitalize">Desea borrar el Evento</p><p class="text-danger text-capitalize h6">${message}</p>`,
            focusConfirm:true,
            background : '#343a40',
            confirmButtonText: 'Entendido',
            confirmButtonColor: '#6C63FF',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            cancelButtonColor: '#6C63FF'
            }).then((result) => {
            if (result.value) {
                const msg = "El Evento ha sido eliminado";
                msgSuccess(msg);
                deleteEvent(id);
            };
        })
    }

    //? Peticion AJAX para Eliminar un Evento 
    const deleteEvent = (id) =>{
        fetch(`?c=Eventos&m=destroyEvents&id=${id}`,{
        }).then( resp =>  (resp.ok) ? Promise.resolve(resp) : Promise.reject(new Error('fallo el delete')))
        .then( resp => resp.text())
        .then((data) =>{
            // se actualiza la tabla
            showAllEvents();
        }).catch(console.log);
    
    }

    //? Se ejecuta la para la creacion de los datos cuando acceda a Modulo Eventos
    showAllEvents();
}

//! End JS Modulo Administrar Eventos




// ! JS Login Verificacion Modal

if(  location.search == '' || location.search == '?c=All&m=index')

{ 

    
    //? function para limpiar los campos del modal #loginModal
    const btnOpenLoginModal= document.getElementById('btn-login');
    btnOpenLoginModal.addEventListener('click',()=>{
        const nombre_usuario = document.getElementById('nombre_usuario');
        const password = document.getElementById('password');
        nombre_usuario.value="";
        password.value="";
    })


    //? Funcion para validar inputs del LoginModal
    const validateFormLogin= (user,pass) =>{
        if(user.value == "")
        {
            user.focus();
            const message = "Ingresar correo";
            msgError(message);
        }
        else if(validateEmail(user.value) != true)
        {
            pass.focus();
            const message = "El Correo ingresado no es valido";
            msgError(message);
        }
        else if(pass.value == "")
        {
            pass.focus();
            const message = "Ingresar clave";
            msgError(message);
        }
        else{
            return true;
        }
    }

    //? function para el login  modal #loginModal
    const  btnSubmitFormLogin = document.getElementById('loginBtn');
    btnSubmitFormLogin.addEventListener('click', (e)=>{
        e.preventDefault();
        const nombre_usuario = document.getElementById('nombre_usuario');
        const password = document.getElementById('password');
        let validar = validateFormLogin(nombre_usuario,password);
        if(validar == true)
        {
            const datos = new FormData();
            datos.append('nombre_usuario',nombre_usuario.value);
            datos.append('password',password.value);
            fetch('?c=Login&m=auth' ,{
                method : 'POST',
                body : datos
            }).then( response => (response.ok) ? Promise.resolve(response) : Promise.reject(new Error('Error al Login')))
            .then(resp => resp.json())
            .then((data) => {
                console.log(data);
                if(data == "")
                {
                    const message = "Datos incorrectos";
                    msgError(message);
                }
                else if(data.error == 'incorrectoP')
                {
                    password.focus();
                    const message = "Contraseña incorrecta";
                    msgError(message);
                }
                else if(data.error =='incorrectoU&P'){
                    nombre_usuario.focus();
                    const message = "El usuario no existe";
                    msgError(message);
                }
                else if(data.fk_rol)
                {
                    if(data.fk_rol == '1')
                    {
                        location.href="?c=Administradores&m=index";
                    }
                    else if(data.fk_rol =='2')
                    {
                        location.href="?c=Empleados&m=index";
                    }
                }
                else{
                    location.href="?c=All&m=index";
                }
            });
        }
        
    })

}

// ! End JS Login





