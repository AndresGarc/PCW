'use strict';


function loadArt(){
  let xhr = new XMLHttpRequest(),
      url = 'api/articulos';
  //ABRIR
  xhr.open('GET',url, true);//metodo peticion(GET, COMPUT--POST, DELETE), url, peticion sincrona o ASINCRONA

  //AL LLAMAR
  xhr.onload = function(){ //CUADNO NOSOTROS RECIBAMOS LA RESPUESTA CORRECTAMENTE SE DISPARA ESTE ELEMENTO
    //console.log(xhr.responseText);
    let r = JSON.parse(xhr.responseText);
    console.log(r);
    r.FILAS.forEach(function(e){

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

  //    let li = document.createElement('li');
//      li.innerHTML = `${e.nombre}`;
//      document.getElementById('cat').appendChild(li);
    });

    };
  xhr.send();
};

function crearArticulo(){

};
