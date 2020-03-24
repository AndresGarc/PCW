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
  at.href="articulo.html";

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
  af.href="articulo.html";
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
      document.getElementById('categoria').appendChild(op);
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
  document.getElementById('nombre').value = param;

  if(param){
    param = "?t=" + param;
    buscar(param);
  }
}
function urlBusq(){

  deleteHijosBusq();
  let param="?";

  let nom = document.getElementById('nombre').value;
  let ven = document.getElementById('vendedor').value;
  let prMx = document.getElementById('preciomax').value;
  let prMn = document.getElementById('precio').value;
  let cat = document.getElementById('categoria').value;

  if(nom){ param+="t="+nom+"&"; }
  if(ven){ param+="v="+ven+"&"; }
  if(prMx){ param+="ph="+prMx+"&"; }
  if(prMn){ param+="pd="+prMn+"&";}
  if(cat){ param+="c="+cat; }

  buscar(param);
}
function buscar(paramBus){
  let url = 'api/articulos'+paramBus;

  if(paramBus!="?"){
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
}
// -------------------------------------------------------------------------------
