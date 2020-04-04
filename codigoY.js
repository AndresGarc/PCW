 // Relacionado con login 
 
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
                location.href = "index.html";
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
    //if si no le pasamos nada

    if (borraesto !='') {
        var local = document.getElementById(borraesto);
        local.parentNode.removeChild(local); //esto es una marranada pero era como estaba en muchos sitios???
    }
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

// Relacionado con login END


// Relacionado con Articulo 

function creaArticulo(e) {
    
    let art = document.createElement('article');
    let titulo = document.createElement('h2');
    let divv = document.createElement('div');
    let carousel = document.createElement('aside');
    let img = document.createElement('img');
    let pp = document.createElement('p');
    let btnatras = document.createElement('button'); let iconatras = document.createElement('i');
    let span = document.createElement('span');
    let btndelante = document.createElement('button'); let icondelante = document.createElement('i');
    let foot = document.createElement('footer');
    let desc = document.createElement('p'); 
    let vend = document.createElement('p'); let iVe = document.createElement('i'); let bVe = document.createElement('b'); let url = document.createElement('a');
    let prc = document.createElement('p'); let iP = document.createElement('i'); let bP = document.createElement('b');
    let nFot = document.createElement('p'); let iF = document.createElement('i'); let bF = document.createElement('b');
    let vis = document.createElement('p') ; let iV = document.createElement('i'); let bV = document.createElement('b');
    let seg  = document.createElement('p'); let iS = document.createElement('i'); let bS = document.createElement('b');
    let preg  = document.createElement('p'); let pregred = document.createElement('a'); let icpreg = document.createElement('i'); let bPre = document.createElement('b');
    let botones  = document.createElement('p'); let follow = document.createElement('button'); let unf = document.createElement('button');
  
    //titulo
    art.id="prod";
    titulo.innerHTML = `${e.nombre}`;
    divv.id="flex-prod";
  
    //foto
    carousel.className="carrusel";
    img.className = "foto";
    img.src=`fotos/articulos/${e.imagen}`;
    img.alt="imagen articulo";
    btnatras.className = "moveFoto";btnatras.name="prevFoto";
        btndelante.className = "moveFoto";btnatras.name="nextFoto"; //tipo button?
    iconatras.className="fas fa-arrow-alt-circle-left";icondelante.className="fas fa-arrow-alt-circle-right";
  
    //cosas footer
   vend.className="attbprod"; iVe.className = "fas fa-user"; bVe.innerHTML = "Vendedor/a:"; url.href="buscar.html";
   prc.className="attbprod"; iF.className = "far fa-images"; bF.innerHTML = "Nº Fotos:";
   nFot.className="attbprod"; iP.className = "fas fa-coins"; bP.innerHTML = "Precio:";
   vis.className="attbprod"; iV.className = "far fa-eye"; bV.innerHTML= "Visitas:";
   seg.className="attbprod"; iS.className= "fas fa-users"; bS.innerHTML= "Seguidores:";
   preg.className="attbprod";   pregred.href= "#preguntas"; pregred.title="Enlace a las preguntas"; //no dirige bien???
        icpreg.className="fas fa-question-circle"; bPre.innerHTML="Preguntas realizadas:";
   botones.className="attbprod"; follow.innerHTML = "seguir"; unf.innerHTML = "dejar de seguir";
  
    //creacion
    desc.className = "descLong";
    desc.innerHTML = `${e.descripcion}`;
    
    //carrusel (dentro de div)
    btnatras.appendChild(iconatras); btndelante.appendChild(icondelante);
    span.innerHTML+='1 de' + ` ${e.nfotos}`; //como saber que foto es
    pp.appendChild(btnatras);pp.appendChild(span); pp.appendChild(btndelante);
    carousel.appendChild(img);carousel.appendChild(pp);

    //footer (dentro de div)
    foot.appendChild(desc);
    vend.appendChild(iVe); vend.appendChild(bVe); url.innerHTML+=` ${e.vendedor}`; vend.appendChild(url);
    foot.appendChild(vend);
    prc.appendChild(iP); prc.appendChild(bP); prc.innerHTML+= ` ${e.precio}`;
    foot.appendChild(prc);
    nFot.appendChild(iF); nFot.appendChild(bF); nFot.innerHTML+= ` ${e.nfotos}`;
    foot.appendChild(nFot);
    vis.appendChild(iV); vis.appendChild(bV); vis.innerHTML+= ` ${e.veces_visto}`;
    foot.appendChild(vis);
    seg.appendChild(iS); seg.appendChild(bS); seg.innerHTML+= ` ${e.nsiguiendo}`;
    foot.appendChild(seg);  
    preg.appendChild(pregred);preg.appendChild(icpreg);preg.appendChild(bPre); preg.innerHTML+=` ${e.npreguntas}`;
    foot.appendChild(preg);
    botones.appendChild(follow);botones.appendChild(unf);
    foot.appendChild(botones);
  
    //insercion en divv
    divv.appendChild(carousel);
    divv.appendChild(foot);

    //creacion del articulo
    art.appendChild(titulo);
    art.appendChild(divv);

    document.getElementById('flex').appendChild(art);
}

function infoArticulo(){  
    const queryString = window.location.search; //aqui podemos hacer un metodo para sacar parametros de la URL
    const urlParams = new URLSearchParams(queryString); //aqui podemos hacer un metodo para sacar parametros de la URL
    const id = urlParams.get('id'); //aqui podemos hacer un metodo para sacar parametros de la URL

    var comprobar = false;
    let autorizacion = 'usuario:token';
    if(sessionStorage.usuario != undefined) {
         let usu =   JSON.parse(sessionStorage['usuario']);
            autorizacion = usu.login + ":" + usu.token  ;
    }

    let xhr = new XMLHttpRequest(),
    url= 'api/articulos/'+id; //tomando la info del sessionstorage

    xhr.open('GET',url,true);

    xhr.onload = function(){
        console.log(xhr.responseText);
        let r = JSON.parse(xhr.responseText);
        console.log(r.FILAS[0] );
        creaArticulo(r.FILAS[0]);
    }

    xhr.setRequestHeader('Authorization',autorizacion);
    xhr.send();
    return comprobar;
}

/*function pregunta(form) { //esto es para enviar y GUARDAR preguntas
    let url = 'api/articulos/ID/pregunta', //editar ID en base al articulo
    fd = new FormData(form),
    usu =   JSON.parse(sessionStorage['usuario']);

     fetch(url, {method:'POST',
             body:fd,
             headers:{'Authorization':usu.login+':'+usu.token}}).then(function(respuesta){
        if( respuesta.ok){
            respuesta.json().then(function(datos)){
                console.log(datos);
            }
        }
        else {
            console.log('error en peticion fetch de pregunta');
        }
    });
    return false;
} */ //Tras esto se debe hacer peticion, recargar, y mostrar otra vez las preguntas 1:19 en el video  
//para las respuestas es IGUAL pero con let url ID/pregunta/IDPREGUNTA/respuesta
//seguir y dejar de seguir igual pero con true y false y sin body 1:20 en video 


function cerrarmodal(HREF){ //a donde redirige tras cerrar
    document.querySelector('#capafondo').remove();
    //location href
}

function mensajeemergente(TITULO, MENSAJE){ // mensaje(mensaje)? pasarle cabecera y titulos
    let div = document.createElement('div'); //aqui un div o que lo que
    
     // div.id = 'fondo'; //se puede hacer asi para asignar atributos o 
    div.setAttribute('id','capafondo') //diapositiva 17 tema 5


    //ejemplo de un html que le pasamos, hablar con bebé guapo si lo generamos aqui siempre o qué
    let html = '';
    html += '<article>';
    html += '<h2>EJEMPLO  login correcto<h2>';
    html += '<p>mensaje texto etc etc etc etc</p>'
    html += '</article>';
    html += '<footer><button onclick="cerrarmodal();"> Textoboton </button> </footer>'  //para el css ejemplo min 53 video semana 23-29

    div.innerHTML = html;
    document.body.appendChild(div);


}

// Articulo END


// foto

function cargarFoto(foto){
    let fr = new FileReader();
    fr.onload = function(){ 
        foto.parentNode.querySelector('img').src = fr.result; //hay que cambiar esto para que se meta en el IMG 
        //fr.result //donde esta la img
    };

    fr.readAsDataURL(foto.files[0]); //comprobar que no esta vacio
}

function enviarFoto(button){ // 1:50 del video 
    //peticion tipo fetch
    function loginn(form) {
        let url = 'api/articulos/IDARTICULO/foto', //primero se envia el formulario, se da de alta el articulo y nos devuelve el ID que usamos AQUI
        usu = JSON.parse(sessionStorage['usuario']), //al estar en nuevo.html, solo va a entrar al estar logueado
        fd = new FormData(form);
    
        fetch(url, {method:'POST',
                 body:fd,
                headers:{'Authorization':usu.login+':'+usu.token}}).then(function(respuesta){
            if( respuesta.ok){
                respuesta.json().then(function(datos){
                    console.log(datos);
                });
            }
            else {
                console.log('Error al dar de alta foto');
            }
        });
        return false;
    
    }
}

//foto END