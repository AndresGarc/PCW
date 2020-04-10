'use strict';

//GLOBAL
function crearArticulo(e){
  let art = document.createElement('article');
  let titulo = document.createElement('h4');
  let desc = document.createElement('p');
  let at = document.createElement('a');
  let af = document.createElement('a');
  let img = document.createElement('img');
  let foot = document.createElement('footer');
  let nFot = document.createElement('p'); let iF = document.createElement('i'); let bF = document.createElement('b');
  let prc = document.createElement('p'); let iP = document.createElement('i'); let bP = document.createElement('b');
  let vis = document.createElement('p') ; let iV = document.createElement('i'); let bV = document.createElement('b');
  let seg  = document.createElement('p'); let iS = document.createElement('i'); let bS = document.createElement('b');

  //enlace titulo
  at.innerHTML = `${e.nombre}`;
  at.href=`articulo.html?id=${e.id}`;
  at.id = `${e.id}`;

  //enlace foto
  img.className = "ftoArt";
  img.src=`fotos/articulos/${e.imagen}`;
  img.alt="imagen articulo";

  //cosas footer
  iF.className = "far fa-images"; bF.innerHTML = "Nº Fotos:";
  iP.className = "fas fa-coins"; bP.innerHTML = "Precio:";
  iV.className = "far fa-eye"; bV.innerHTML= "Visitas:";
  iS.className= "fas fa-users"; bS.innerHTML= "Seguidores:";

  //creacion
  af.appendChild(img);
  af.href=`articulo.html?id=${e.id}`;
  af.id = `${e.id}`;
  titulo.appendChild(at);
  art.className="boxProd";
  desc.className = "desc";
  desc.innerHTML = `${e.descripcion}`;
  nFot.appendChild(iF); nFot.appendChild(bF); nFot.innerHTML+= ` ${e.nfotos}`;
  foot.appendChild(nFot);
  prc.appendChild(iP); prc.appendChild(bP); prc.innerHTML+= ` ${e.precio}`;
  foot.appendChild(prc);
  vis.appendChild(iV); vis.appendChild(bV); vis.innerHTML+= ` ${e.veces_visto}`;
  foot.appendChild(vis);
  seg.appendChild(iS); seg.appendChild(bS); seg.innerHTML+= ` ${e.nsiguiendo}`;
  foot.appendChild(seg);

  //creacion del articulo
  art.appendChild(titulo);
  art.appendChild(af);
  art.appendChild(desc);
  art.appendChild(foot);

  document.getElementById('flex').appendChild(art);
};

function cargarCats(){
  let xhr = new XMLHttpRequest(),
      url = 'api/categorias';
  xhr.open('GET', url, true);
  xhr.onload = function(){
    let r = JSON.parse(xhr.responseText);
    r.FILAS.forEach(function(e){
      let op =document.createElement('option');
      op.value=e.id;
      op.innerHTML = e.nombre;
      document.getElementById('opciones').appendChild(op);
    });

  };
  xhr.send();
}


//INDEX-----------------------------------------------------------------------------------------
function loadArt(){
  let xhr = new XMLHttpRequest(),
      url = 'api/articulos';
  //ABRIR
  xhr.open('GET',url, true);//metodo peticion(GET, COMPUT--POST, DELETE), url, peticion sincrona o ASINCRONA

  //AL LLAMAR
  xhr.onload = function(){ //CUADNO NOSOTROS RECIBAMOS LA RESPUESTA CORRECTAMENTE SE DISPARA ESTE ELEMENTO
    //console.log(xhr.responseText);
    let r = JSON.parse(xhr.responseText);
    r.FILAS.forEach(function(e){
      crearArticulo(e);
    });

    };
  xhr.send();
};

//-------------------------------------------------------------------------------------

//BUSQUEDA ------------------------------------------------------------------------------------

//FUNCION SI ESTAS LOGEADO PARA CARGAR LOS CHECKBOX PARA LA BUSQUEDA DE ARTICULOS QUE SIGUES O VENDES
function checkLogin(){
  if(sessionStorage.usuario !=undefined){ //si existe usuario
      crearCB();
  }
}
function crearCB(){

  let labS = document.createElement('label');
  let labV = document.createElement('label');
  let inpS = document.createElement('input');
  let inpV = document.createElement('input');

  labS.for = "seguidos"; labS.innerHTML="Articulos que sigues";
  labV.for="venta"; labV.innerHTML="Articulos que vendes";
  inpS.type="checkbox"; inpS.name="seguidos"; inpS.id="seguidos";
  inpV.type="checkbox"; inpV.name="venta"; inpV.id="venta";

  document.getElementById('as').appendChild(labS); document.getElementById('as').appendChild(inpS);
  document.getElementById('av').appendChild(labV); document.getElementById('av').appendChild(inpV);

}
function deleteHijosBusq(){
  let doc = document.getElementById('flex');
  if(doc.firstChild){
    while (doc.firstChild) {
        doc.removeChild(doc.firstChild);
    }
  }
}

function imprimirDatoUrl(){
  let url = window.location.search;

  const urlParams = new URLSearchParams(url);
  let param = urlParams.get('busqR');
  let paramV = urlParams.get('vendedor');
  document.getElementById('nombre').value = param;
  document.getElementById('vendedor').value=paramV;
  let paramBusqueda;
  if(param){
    paramBusqueda = "?t=" + param;
  } else {
    paramBusqueda = "?v=" + paramV;
  }
  buscar(paramBusqueda);
}

function urlBusq(){

  deleteHijosBusq();
  let param="?";

  let nom = document.getElementById('nombre').value;
  let ven = document.getElementById('vendedor').value;
  let prMx = document.getElementById('preciomax').value;
  let prMn = document.getElementById('precio').value;
  let cat = document.getElementById('categoria').option;



  if(nom){ param+="t="+nom+"&"; }
  if(ven){ param+="v="+ven+"&"; }
  if(prMx){ param+="ph="+prMx+"&"; }
  if(prMn){ param+="pd="+prMn+"&";}
  if(cat){ param+="c="+cat+"&"; }
  if(sessionStorage.usuario !=undefined){
    if(document.getElementById('seguidos').checked){
      param+="siguiendo&";
    }
    if(document.getElementById('venta').checked){
      param+="mios"
    }
  }

  buscar(param);
}
function buscar(paramBus){
  let url = 'api/articulos'+paramBus;

  if(paramBus!="?"){
    if(sessionStorage.usuario !=undefined){
      busquedaR(url);
    } else{
      busquedaNR(url);
    }
  }
}
function busquedaR(url){
  let usu = JSON.parse(sessionStorage['usuario']);
  let header = { method:'get', headers:{'Authorization':`${usu.login}:${usu.token}`} };
  fetch(url, header).then(function(response){
    if(!response.ok){
         return false;
         console.log('Error en la respuesta');
    }
    response.json().then(function(datos){

      datos.FILAS.forEach(function(e){
        crearArticulo(e);
      });


    });
  }, function(error){ console.log('ERROR CON EL FETCH') });
}
function busquedaNR(url){
  fetch(url).then(function(response){
    if(!response.ok){
         return false;
         console.log('Error en la respuesta');
    }
    response.json().then(function(datos){

      datos.FILAS.forEach(function(e){
        crearArticulo(e);
      });


    });
  }, function(error){ console.log('ERROR CON EL FETCH') });
}
// -------------------------------------------------------------------------------

//REGISTRO---------------------------------------------------------------------------------------------------

function checkLgNm(){
  let log = document.getElementById('loginR').value;
  let spn = document.getElementById('mensj');
  if(log!=""){
    let xhr = new XMLHttpRequest(),
        url = `api/usuarios/${log}`;

    xhr.open('GET',url,true);
    xhr.onload= function(){
        let inf = JSON.parse(xhr.responseText);
        if(inf.DISPONIBLE==true){
          spn.className="mensjLog mensjLogok";
          spn.innerHTML="Sin coincidencias, usuario correcto";
        } else {
          spn.className="mensjLog mensjLogno";
          spn.innerHTML="Nombre de usuario incorrecto";
        }
    }
    xhr.send();
  } else {
    spn.innerHTML="";
  }
}

function loginBien(){
  let good = false;
  let span = document.getElementById('mensj').className;
  if(span=="mensjLog mensjLogok"){
    good = true;
  }
  return good;
}

function pwdcheck(){
  let p1 = document.getElementById('pwd').value;
  let p2 = document.getElementById('pwd2').value;
  let spn = document.getElementById('mensjPW');
  let good = false;
  if(p1==p2){
    spn.className="mensjLog mensjLogok";
    spn.innerHTML="Las dos contraseñas son iguales";
    good = true;
  } else {
    spn.className="mensjLog mensjLogno";
    spn.innerHTML="No coinciden las contraseñas";
  }
  return good;
}

function registrar(form){
    if(loginBien() && pwdcheck()){ //todo ok



      let url = "api/usuarios/registro",
          fd = new FormData(form),
          init = {method: 'post', body:fd};

      fetch(url, init).then(function(response){
        if(!response.ok){
          console.log("Error con la subida");
          response.json().then(function(datos){
              console.log(datos);
          });
        } else {
          console.log("Registro completado");
          document.getElementById("formu").reset();
          mensajeemergente("Registro correcto","Haz click en el botón para poder loggearte y empezar a comprar!");
        }
      });

    } else {//si no ok
      console.log("no epico");
    }
    return false;
}

//----------------------------------------------------------------------------------------------
// ARTICULO --- PREGUNTAS

function cargarPreguntas(){
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get('id');

  let xhr = new XMLHttpRequest(),
      url = `api/articulos/${id}/preguntas`;

  xhr.open("GET", url, true);
  xhr.onload= function(){
    let inf = JSON.parse(xhr.responseText);
    console.log(inf);
    inf.FILAS.forEach(function(e){
      crearPreguntas(e);
    });
  };
  xhr.send();

}

function crearPreguntas(p){
  let art = document.createElement("article"),
      h3 = document.createElement("h3"),
      anyo = document.createElement("time"),
      hora = document.createElement("time"),
      preg = document.createElement("p"),
      tieneRes = 0;

  if(p.respuesta){
    art.className = "mainpreconres";
    tieneRes=1;
  } else {
    art.className = "mainpre";
  }
  art.id=`${p.id}`;
  let tiempo = p.fecha_hora.split(" ");
  h3.className = "titpre";
  h3.innerHTML =`${p.login} `; h3.innerHTML+=`<time datetime="${tiempo[0]}">${tiempo[0]}</time> / <time datetime"=${tiempo[1]}">${tiempo[1]}</time>`;
//  h3.innerHTML+=`<time datetime"=${tiempo[1]}">`; h3.innerHTML+=`${tiempo[1]}</time>`;

//  anyo.datetime = `${tiempo[0]}`; anyo.innerHTML = `${tiempo[0]}  / `;
//  hora.datetime =  `${tiempo[1]}`; hora.innerHTML = `${tiempo[1]}`;
  preg.className = "text";
  preg.innerHTML = `${p.pregunta}`;

  //h3.appendChild(anyo); h3.appendChild(hora);
  art.appendChild(h3);
  art.appendChild(preg);

  if(sessionStorage.usuario!=undefined){
    let usu = JSON.parse(sessionStorage['usuario']);
    let xhr2 = new XMLHttpRequest(),
        url = `api/articulos/${p.id_articulo}`;

    xhr2.open('GET', url, true);
    xhr2.onload = function(e){

      let resp = JSON.parse(xhr2.responseText);
      if(usu.login==resp.FILAS[0].vendedor){
        let botonHTML = '<button onclick="responderPregunta()">Responder</button>';
        let boton = document.createElement('p'); boton.innerHTML = botonHTML;
        art.appendChild(boton);
      }
    };
    xhr2.send();
  }
  document.getElementById('preguntas').appendChild(art);
  if(tieneRes==1){ crearRespuesta(`${p.respuesta}`); }


}

function crearRespuesta(r){
  let art = document.createElement("article"),
      res = document.createElement("p"),
      h4 = document.createElement("h4");

  h4.className="titRes"; h4.innerHTML= "Respuesta del vendedor: ";
  res.className = "text"; res.innerHTML = `${r}`;
  art.className = "respuesta";
  art.appendChild(h4);
  art.appendChild(res);
  document.getElementById("preguntas").appendChild(art);

}

function responderPregunta(){
  console.log("ESTOY RESPONDIENDO A UNA PREGUNTA");
}
