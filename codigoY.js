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
                location.href ="index.html";
            });
        }
        else {
            console.log('ERROR');
        }
    });
    return false;
}

function mostrarsesion() {
    if ((sessionStorage.name != undefined) && (sessionStorage.password != undefined)) {
        window.alert("Nombre: " + sessionStorage.name + " Password: " + sessionStorage.password);
    } else {
        window.alert("no has abierto sesion");
    }   
}

function enviarindex() { // pa esto usar un onload o algo asi en el login
    if (sessionStorage.usuario != undefined) {
        location.href ="index.html";
    }
    else {
        window.alert("Esta linea no hace nada porque te debe dejar entrar a login si no hs abierto sesion");
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