                   function loginn(form) {
    let url = 'api/usuarios/login',
    fd = new FormData(form);

    fetch(url, {method:'POST',
             body:fd}).then(function(respuesta){
        if( respuesta.ok){
            respuesta.json().then(function(datos){
                console.log(datos);
                console.log(JSON.stringify(datos));
                sessionStorage['usuario'] = JSON.stringify(datos);
            });
        }
        else {
            console.log('ERROR');
        }
    });
    return false;
}


function logueadoIndex() { // te envia a index si estas logueado
    if (sessionStorage.usuario != undefined) {
        location.href ="index.html";
    }
}

function noLogueadoIndex() { // lo contrario de arriba vaya
    if (sessionStorage.usuario == undefined) {
        location.href ="index.html";
    }
}

function cerrarSesion() {
    if ((sessionStorage.usuario !=undefined)) {
        sessionStorage.clear();
        window.alert("Borramos sesion. Has cerrado sesion");
    }
    else {
        window.alert("No has abierto sesion");
    }
}

function borraNavbar(borraesto) { //le pasamos por string la pag actual, tras eso comprobamos si esta logeado o no para borrar cosis
    //ejemplo
    var local = document.getElementById(borraesto);
        local.parentNode.removeChild(local); //esto es una marranada pero era como estaba en muchos sitios???

    if((sessionStorage.usuario !=undefined)) { //si esta logueado, quitamos login y registro
        var element = document.getElementById('login');
        element.parentNode.removeChild(element);
        var element2 = document.getElementById('registro');
        element2.parentNode.removeChild(element2);

        let usu =   JSON.parse(sessionStorage['usuario']);
        document.getElementById("logname").innerHTML ="Logout (" + usu.login + ")";
        // window.alert(usu.login);
    }
    else { //si no esta logueado quitamos logout y nuevo producto
        var element = document.getElementById('logout');
        element.parentNode.removeChild(element);
        var element2 = document.getElementById('nuevo');
        element2.parentNode.removeChild(element2);
    }
}



function infoArticulo(){
    var comprobar = false;

    let xhr = new XMLHttpRequest(),
    url= 'api/articulos/1',
    autorizacion = 'usuario:token'; //tomando la info del sessionstorage

    xhr.open('GET',url,true);

    xhr.onload = function(){
        console.log(xhr.responseText);
        let r = JSON.parse(xhr.responseText);
        console.log(r);
    }

    xhr.setRequestHeader('Authorization',autorizacion);
    xhr.send();
    return comprobar;
}
