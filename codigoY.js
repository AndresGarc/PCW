function login(form) {
    let xhr = new XMLHttpRequest(),
    url = 'api/usuarios/login',
    fd = new FormData(form);
    xhr.open('POST',url, true);
    
    xhr.onload = function(){ //coger llamada servidor y comparar
        console.log(xhr.responseText);
        sessionStorage.setItem("name",varnomb);
        sessionStorage.setItem("password",varpas);
    };
    xhr.send(fd);
    //si el login esta en la bbdd
}

function mostrarsesion() {
    if ((sessionStorage.name != undefined) && (sessionStorage.password != undefined)) {
        window.alert("Nombre: " + sessionStorage.name + " Password: " + sessionStorage.password);
    } else {
        window.alert("no has abierto sesion");
    }   
}

function enviarindex() { // pa esto usar un onload o algo asi en el login
    if ((sessionStorage.name != undefined) && (sessionStorage.password != undefined)) {
        location.href ="http://www.pagina1.com";
    }
    else {
        window.alert("Esta linea no hace nada porque te debe dejar entrar a login si no hs abierto sesion");
    }
}

function cerrarsesion() {
    if ((sessionStorage.name != undefined) && (sessionStorage.password != undefined)) {
        sessionStorage.clear();
        window.alert("detecta datos, borra. Has cerrado sesion");
    }
    else {  
    window.alert("No has abierto sesion");
    }
}