 // Relacionado con login
 //foto del vendedor
var fotosasubir=new Array;
var slideindex=1;
var slidemax=5;
var seguidores=1;
 function loginn(form) {
    let url = 'api/usuarios/login',
    fd = new FormData(form);

    fetch(url, {method:'POST',
             body:fd}).then(function(respuesta){
        if( respuesta.ok){
            
            respuesta.json().then(function(datos){
                //console.log(datos);
                //console.log(JSON.stringify(datos));
                sessionStorage['usuario'] = JSON.stringify(datos);
                mensajeemergente("Login correcto","",1);
            });
        }
        else {
            mensajeemergente("Login incorrecto","Alguno de los datos introducidos no es correcto",2);
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
        mensajeemergente("Has cerrado sesion","",1);
    }
    else {
        mensajeemergente("No habias iniciado sesion","No sé ni como has llegado aquí",1);
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
    slideindex=1;
    slidemax=e.nfotos;
    seguidores=e.nsiguiendo;
    let art = document.createElement('article');
    let titulo = document.createElement('h2');
    let divv = document.createElement('div');
    let carousel = document.createElement('aside');
    let img = document.createElement('img');
    let imgVendedor = document.createElement('img');
    let aVendedorFoto = document.createElement('a');
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
    //cambiar estan dentro del A en el HREF etc para #preguntas

    //titulo
    art.id="prod";
    titulo.innerHTML = `${e.nombre}`;
    divv.id="flex-prod";

    //foto
    carousel.className="carrusel";
    img.id="fotocarusel";
    img.className = "foto";
    if(e.imagen==null){
        img.src="img/No-image-available.png";
        slidemax=1;
    }
    else {
        img.src=`fotos/articulos/${e.imagen}`;
    }
    img.alt="imagen articulo";

    imgVendedor.className = "fotoPerfil";
    let checkImg = e.foto_vendedor.split(".");
    if(checkImg[1]!=""){
      imgVendedor.src =`fotos/usuarios/${e.foto_vendedor}`;
    } else {
      imgVendedor.src =`img/No-image-available.png`;
    }
    imgVendedor.alt= "foto del vendedor";

    aVendedorFoto.href="buscar.html?vendedor="+`${e.vendedor}`;
    aVendedorFoto.appendChild(imgVendedor);


    btnatras.className = "moveFoto";btnatras.name="prevFoto";
        btndelante.className = "moveFoto";btnatras.name="nextFoto"; //tipo button?
    iconatras.className="fas fa-arrow-alt-circle-left";icondelante.className="fas fa-arrow-alt-circle-right";

    //cosas footer
   vend.className="attbprod"; iVe.className = "fas fa-user"; bVe.innerHTML = "Vendedor/a:"; url.href="buscar.html?vendedor="+`${e.vendedor}`;
   prc.className="attbprod"; iF.className = "far fa-images"; bF.innerHTML = "Nº Fotos:";
   nFot.className="attbprod"; iP.className = "fas fa-coins"; bP.innerHTML = "Precio:";
   vis.className="attbprod"; iV.className = "far fa-eye"; bV.innerHTML= "Visitas:";
   seg.className="attbprod";seg.id="seguidores"; iS.className= "fas fa-users"; bS.innerHTML= "Seguidores:";
   preg.className="attbprod"; pregred.href= "#preguntas"; pregred.title="Enlace a las preguntas";//no dirige bien???
        icpreg.className="fas fa-question-circle"; bPre.innerHTML="Preguntas realizadas:";

    //creacion
    desc.className = "descLong";
    desc.innerHTML = `${e.descripcion}`;

    //carrusel (dentro de div)
    btnatras.onclick= function() {btnizqcarousel()};
    btndelante.onclick= function() {btndchcarousel()};
    btnatras.appendChild(iconatras); btndelante.appendChild(icondelante);
    span.id="xdey";
    span.innerHTML+= slideindex + ' de ' +  slidemax; //como saber que foto es
    pp.appendChild(btnatras);pp.appendChild(span); pp.appendChild(btndelante);
    carousel.appendChild(img);carousel.appendChild(pp);

    //footer (dentro de div)
    foot.appendChild(desc);
    foot.appendChild(aVendedorFoto);
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
    preg.appendChild(icpreg);preg.appendChild(bPre); pregred.innerHTML+=` ${e.npreguntas}`; preg.appendChild(pregred);
    foot.appendChild(preg);

    if(sessionStorage.usuario !=undefined){
       let usu =   JSON.parse(sessionStorage['usuario']);

        let botones  = document.createElement('p'); let follow = document.createElement('button');
        botones.className="attbprod"; follow.id="btnfollow";
        if(`${e.estoy_siguiendo}`==1) {follow.innerHTML = "dejar de seguir";} else {follow.innerHTML = "seguir";}
        follow.onclick= function() {botonSeguir()};
        botones.appendChild(follow);
        if(usu.login ==`${e.vendedor}` ) {
            let borrar = document.createElement('button'); borrar.id="btnborrar";
            let modif = document.createElement('button'); modif.id="btnmodif";
            borrar.onclick= function() {botonBorrar(e)}; borrar.innerHTML="borrar articulo";
            modif.onclick= function() {botonModif(e)}; modif.innerHTML="modificar";
            botones.appendChild(borrar); botones.appendChild(modif);
        }
        foot.appendChild(botones);
    }

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

    let xhr = new XMLHttpRequest(),
    url= 'api/articulos/'+id; //tomando la info del sessionstorage

    xhr.open('GET',url,true);

    xhr.onload = function(){
       // console.log(xhr.responseText);
        let r = JSON.parse(xhr.responseText);
        // console.log(r.FILAS[0]);
        creaArticulo(r.FILAS[0]);
    }
    if(sessionStorage.usuario != undefined) {
        let autorizacion = 'usuario:token';
         let usu =   JSON.parse(sessionStorage['usuario']);
            autorizacion = usu.login + ":" + usu.token  ;
        comprobar=true;
        xhr.setRequestHeader('Authorization',autorizacion);
    }
    xhr.send();



    return comprobar;
}

function fotosArticulo(){
    
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get('id');

  let xhr = new XMLHttpRequest(),
      url = `api/articulos/${id}/fotos`;

  xhr.open("GET", url, true);
  xhr.onload= function(){
    let inf = JSON.parse(xhr.responseText);
    //console.log(inf);
    if(slideindex!=1 && slidemax!=1){
      //  console.log("pasamos a la foto");
        //console.log( inf.FILAS[slideindex-1].fichero);
        document.getElementById("fotocarusel").src='fotos/articulos/'+inf.FILAS[slideindex-1].fichero;
    }
  };
  xhr.send();

}

function btnizqcarousel(){
    if(slideindex==1){
        slideindex=slidemax;
    }
    else{
        slideindex=slideindex-1;
    }
    document.getElementById("xdey").innerHTML= slideindex+' de '+slidemax;
    fotosArticulo();
}
function btndchcarousel(){
    if(slideindex==slidemax){
        slideindex=1;
    }
    else{
        slideindex=slideindex+1;
    }
    document.getElementById("xdey").innerHTML= slideindex+' de '+slidemax;
    fotosArticulo();
}


function botonSeguir() {
   var bot = document.getElementById('btnfollow');
   var segui = document.getElementById('seguidores');
   if(bot.innerHTML=="dejar de seguir") {
      seguidores=seguidores-1;
    bot.innerHTML="seguir";
    document.getElementById("seguidores").innerHTML='<i class="fas fa-users" aria-hidden="true"></i><b>Seguidores:</b> ' + seguidores;
    //console.log(segui.innerHTML);
    //console.log(seguidores);
    unfollow();
   }
   else{
    seguidores=seguidores+1;
   bot.innerHTML="dejar de seguir";
   follow();
   document.getElementById("seguidores").innerHTML='<i class="fas fa-users" aria-hidden="true"></i><b>Seguidores:</b> ' + seguidores;
   //console.log(segui.innerHTML);
   //console.log(seguidores);
   }  //como editar los seguidores

}

function follow(){
    var si=false;
    const queryString = window.location.search; //aqui podemos hacer un metodo para sacar parametros de la URL
    const urlParams = new URLSearchParams(queryString); //aqui podemos hacer un metodo para sacar parametros de la URL
    const id = urlParams.get('id'); //aqui podemos hacer un metodo para sacar parametros de la URL

    let url = 'api/articulos/'+id+'/seguir/true', //true porque sigue
    usu =   JSON.parse(sessionStorage['usuario']);

     fetch(url, {method:'POST',
             headers:{'Authorization':usu.login+':'+usu.token}}).then(function(respuesta){
        if( respuesta.ok){
            respuesta.json().then(function(datos){
                //console.log(datos);
                return true;
            });
        }
        else {
            //console.log('error en peticion fetch de seguir');
            mensajeemergente("Error desconocido al seguir","",3);
        }
    });
    return si;
}

function unfollow(){
    var si=false;
    const queryString = window.location.search; //aqui podemos hacer un metodo para sacar parametros de la URL
    const urlParams = new URLSearchParams(queryString); //aqui podemos hacer un metodo para sacar parametros de la URL
    const id = urlParams.get('id'); //aqui podemos hacer un metodo para sacar parametros de la URL

    let url = 'api/articulos/'+id+'/seguir/false', //true porque sigue
    usu =   JSON.parse(sessionStorage['usuario']);

     fetch(url, {method:'POST',
             headers:{'Authorization':usu.login+':'+usu.token}}).then(function(respuesta){
        if( respuesta.ok){
            respuesta.json().then(function(datos){
                //console.log(datos);
                return true;
            });
        }
        else {
            //console.log('error en peticion fetch de dejar de seguir');
            mensajeemergente("Error desconocido al dejar de seguir","",3);
        }
    });
    return si;

}

function botonBorrar(e){
let div = document.createElement('div');

// div.id = 'fondo'; //se puede hacer asi para asignar atributos o
div.setAttribute('id','capafondo'); //diapositiva 17 tema 5
let html = '';
html += '<article>';
html += '<h2>Mensaje confirmacion</h2>';
html += '<p>Estas seguro de que quieres borrar el articulo?</p>';
html += '<footer><button onclick="cerrarmodal(6);"> Borrar</button>';  //para el css ejemplo min 53 video semana 23-29
html += '<button onclick="cerrarmodal(4);"> Cancelar</button> </footer>';
html += '</article>';
div.innerHTML = html;
document.body.appendChild(div);
}

function botonModif(e){ //locationhrefs
let div = document.createElement('div');

// div.id = 'fondo'; //se puede hacer asi para asignar atributos o
div.setAttribute('id','capafondo'); //diapositiva 17 tema 5
let html = '';
html += '<article>';
html += '<h2>Modificar articulo</h2>';
html += '<p>Puedes modificar precio y descripción</p>';
html += '<form id="formu" action="index.html" enctype="multipart/form-data" method="post" onsubmit="return modificar(this)"'
html+='<label for="precio">Precio(*)</label>'
html += ' <input type="number" name="precio" id="precio" min="0" step=".01" placeholder="'+e.precio+'" required>'
html += '<label for="descripcion">Descripcion(*)</label>'
html += '<textarea name="descripcion" id="descripcion" rows=4 cols=20 maxlength="300" placeholder="'+e.descripcion+'" required></textarea>'
html += '<footer><button type="submit" onclick="modificar();"> Cambiar</button>';  //para el css ejemplo min 53 video semana 23-29
html += '<button onclick="cerrarmodal(4);"> Cancelar</button> </footer>';
html += '</form>'
html += '</article>';
div.innerHTML = html;
document.body.appendChild(div);
}
function modificar(form){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');
    let usu = JSON.parse(sessionStorage['usuario']);
    let url = 'api/articulos/'+id,
    fd = new FormData(form),
    init = {method: 'POST', body:fd, headers:{'Authorization':`${usu.login}:${usu.token}`} };

          fetch(url, init).then(function(response){
            if(!response.ok){
              //console.log("Error con la subida");
              response.json().then(function(datos){
                 // console.log(datos);
                 location.reload();
              });
            } else {
              //console.log(response);
              //console.log("Cambio completado");
              location.reload();
            }
          });
        return false;

     // 1:50 del video
    //peticion tipo fetch
}

function borraArt(){ //redirigir si esta borrado?
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');
    let usu = JSON.parse(sessionStorage['usuario']);
    let url = 'api/articulos/'+id;
    //console.log(id);
    init = {method: 'DELETE', headers:{'Authorization':`${usu.login}:${usu.token}`} };

          fetch(url, init).then(function(response){
            if(!response.ok){
              //console.log("Error con la subida");
              response.json().then(function(datos){
                location.href= "index.html";
                  //console.log(datos);
              });
            } else {
                location.href= "index.html";
              //console.log(response);
              //console.log("Borrado completado");

            }
          });
        return false;

     // 1:50 del video
    //peticion tipo fetch
}

//END ARTICULO

function cerrarmodal(num){ //en base a donde estamo  //en login falta devolver el foco si sale mal //mesnaje para articulo guardado
    document.querySelector('#capafondo').remove();
    if(num==2){ // la de andrés - registro
        location.href="login.html";
    }
    else if(num==3){ //error inesperado, no hacer nada
        //console.log("nada");

    }

    else if(num==4){ //foto de mayor tamaño
        //console.log("nada y borra");

    } else if(num==5){ //pregunta gucci
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const id = urlParams.get('id');
      location.href=`articulo.html?id=${id}`;
    }
else if(num==6){ //borra art
    borraArt();
    

}
else if(num==7){ //modifica art

}

    else { // 1, te redirige a index
        location.href= "index.html";
    }
}

function mensajeemergente(titulo, mensaje,num){ // mensaje(mensaje)? pasarle cabecera y titulos
    let div = document.createElement('div');

     // div.id = 'fondo'; //se puede hacer asi para asignar atributos o
    div.setAttribute('id','capafondo'); //diapositiva 17 tema 5
    let html = '';
    html += '<article>';
    html += '<h2>'+titulo+'</h2>';
    html += '<p>'+mensaje+'</p>';
    html += '<footer><button onclick="cerrarmodal('+num+');"> Aceptar </button> </footer>';  //para el css ejemplo min 53 video semana 23-29
    html += '</article>';


    div.innerHTML = html;
    document.body.appendChild(div);


}

// Articulo END


// foto

function cargarFoto(foto){
    if(foto.className!="reg"){
      if(foto.files[0].size/1024 > 300) {
          mensajeemergente("Imagen muy grande","El peso de la imagen no debe exceder los 300KB",4);
          return false;
      }

      if(document.getElementById('fotito').alt!="foto 1") {
        let otraimg = document.createElement('img');
        otraimg.src="img/No-image-available.png";
        otraimg.className="fotito";
        document.getElementById('lasfotos').appendChild(otraimg);
     } else {document.getElementById('fotito').alt="foto 2";}
    }
    let fr = new FileReader();
    fr.onload = function(){
        foto.parentNode.querySelector("img[src='img/No-image-available.png']").src = fr.result; //hay que cambiar esto para que se meta en el IMG
        //fr.result //donde esta la img
        fotosasubir.push(foto.files[0]);
    };

    fr.readAsDataURL(foto.files[0]); //comprobar que no esta vacio
}

function enviarFoto(img,id){ // 1:50 del video
    //peticion tipo fetch
        //console.log("entro a enviar foto");
        //console.log(img);
       
        let url = 'api/articulos/'+id+'/foto', //primero se envia el formulario, se da de alta el articulo y nos devuelve el ID que usamos AQUI
        usu = JSON.parse(sessionStorage['usuario']), //al estar en nuevo.html, solo va a entrar al estar logueado
        fd = new FormData();
        fd.append('fichero',img);

        fetch(url, {method:'POST',
                 body:fd,
                headers:{'Authorization':usu.login+':'+usu.token}}).then(function(respuesta){
            if( respuesta.ok){
                //console.log(respuesta);
                respuesta.json().then(function(datos){
                    //console.log(datos);
                    //console.log("se ha subido bien la foto");
                });
            }
            else {
                //console.log('Error al dar de alta foto');
            }
        });
        return false;
}

//foto END


// nuevo START

function nuevoArticulo(form) {
    let usu = JSON.parse(sessionStorage['usuario']);
    let url = "api/articulos",
    fd = new FormData(form),
    init = {method: 'POST', body:fd, headers:{'Authorization':`${usu.login}:${usu.token}`} };

          fetch(url, init).then(function(response){
            if(!response.ok){
              //console.log("Error con la subida");
              response.json().then(function(datos){
                  //console.log(datos);
              });
            } else {
              //console.log(response);
              
              response.json().then(function(datos){
                //console.log(datos);
                //console.log(fotosasubir);
                for(i=0;i<fotosasubir.length;i++) {
                    enviarFoto(fotosasubir[i],datos.ID);
                }
                
            });
              //console.log("Registro completado");
              
            mensajeemergente("se ha guardado correctamente el articulo","",1)
              document.getElementById("formu").reset();

            }
          });
        return false;

     // 1:50 del video
    //peticion tipo fetch
}

function borraImg(){
    if( document.getElementById("lasfotos").lastChild==document.getElementById("lasfotos").firstChild) {
        var x = document.getElementById("lasfotos").lastChild.remove();
        let otraimg = document.createElement('img');
        otraimg.src="img/No-image-available.png";
        otraimg.className="fotito";
        otraimg.id="fotito";
        otraimg.alt="foto 1";
        document.getElementById("lasfotos").appendChild(otraimg);
    }
    else {var x = document.getElementById("lasfotos").lastChild.remove();}

}

function getBase64Image(img) {
    // Create an empty canvas element
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    // Copy the image contents to the canvas
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    // Get the data-URL formatted image
    // Firefox supports PNG and JPEG. You could check img.src to
    // guess the original format, but be aware the using "image/jpg"
    // will re-encode the image.
    var dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  }
