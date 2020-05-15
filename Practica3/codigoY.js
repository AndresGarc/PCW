var cosa = 0;
var region = 4;
var misudoku = [];
var filact =-1;
var colact =-1;
var nopintar = 1;
// PETICIONES
function cargasudoku(){ //el boton de empezar
    //desactiva elemento cambio tamaño
    //hacer peticion cargarsudoku
    let url = 'api/sudoku/generar/' + region;
    console.log(url);
    fetch(url,{method:'POST'}).then(function(respuesta){
        if( respuesta.ok){
            respuesta.json().then(function(datos){
                //console.log(JSON.stringify(datos));
                sessionStorage['sudoku'] = JSON.stringify(datos); //guarda el sudoku y un token que se usa de auth
                // tras eso pintar en el canvas siguiendo la paleta
                //sustituir boton empezar por temporizador+comprobar+finalizar
                prepararInterfaz();
                sudo =   JSON.parse(sessionStorage['sudoku']);

                for(let i=0;i<sudo.SUDOKU.length;i++){
                    let falsudoku = [];
                    for(let j=0;j<sudo.SUDOKU[i].length;j++){
                        falsudoku[j]=sudo.SUDOKU[i][j];

                    }
                    misudoku[i]=falsudoku;

                }

                recorresudoku();
                document.getElementById('categoria').disabled = true; //RECORDAR AL TERMINAR PONERLO A FALSE
                iniciarTemporizador();
            });
        }
        else {

        }
    });
    return false;
}
function compruebaerrores(){

    let sudo =   JSON.parse(sessionStorage['sudoku']);
    let  autorizacion = sudo.TOKEN ;
    let args = JSON.stringify(misudoku);
    let xhr = new XMLHttpRequest(),
    url = 'api/sudoku/'+ sudo.ID+'/comprobar', //tomando la info del sessionstorage
    fd = new FormData();

    fd.append("juego", args);


fetch(url, {method:'POST',
  body:fd, headers:{'Authorization':autorizacion}}).then(function(respuesta){
    if(respuesta.ok){
      respuesta.json().then(function(datos){
        console.log(datos);
        console.log(datos.FALLOS.length);
        cosa = datos.FALLOS.length;
        console.log(cosa + 'en compruebaerror');
        for(let i=0;i<datos.FALLOS.length;i++){
            f=datos.FALLOS[i].fila;
            c=datos.FALLOS[i].columna;
            pintarCasilla(f,c,misudoku[f][c],'#E5FFDE');
            //pintar fondo de rojo, quitar al entrar al canvas
        }
      });
    }
});

}

function botonfinalizar(){
    let sudo = JSON.parse(sessionStorage['sudoku']);
    let url = 'api/sudoku/'+ sudo.ID;
    init = {method: 'DELETE', headers:{'Authorization':sudo.TOKEN} };
          fetch(url, init).then(function(response){
            if(response.ok){
              response.json().then(function(datos){
                console.log("bien");
                resetGame();
                //terminar temporizador
                //reiniciar juego/pag?
              });
            } else {

            }
          });
        return false;
}


//END PETICIONES

//funciones de utilidad

function cambiasudoku(){
    console.log("cambio de sudoku");
    //esta funcion cambiaria el tamaño del grid del sudoku cada vez que se cambiase eso
}

function infoSudo(){
  let usu =   JSON.parse(sessionStorage['sudoku']);
  console.log(usu.SUDOKU[1][0]);
}

function rellenaLineas(){
    let subdivi = Math.sqrt(region);
    crearrejilla(region,1);
    crearrejilla(subdivi,3);
  }

function prepararInterfaz(){
    //  objetivo.parentNode.replaceChild(div, objetivo); FUNCION SUSTITUCION
      let objetivo = document.getElementById('start');
      let div = document.getElementById('interfaz');
      let temp = document.getElementById('tempo');
      //iniciar reloj aka REINICIAR
      temp.style.display = "block";
      // <button type="button" onclick="infoSudo()">Informacion del sudoku</button>
      let buttonCheck = document.createElement('button');
      let buttonFinaliza = document.createElement('button');
      //Hacer el temporizador que OK

      buttonCheck.innerHTML = "Comprobar"; buttonCheck.type = "button"; buttonCheck.addEventListener("click", compruebaerrores);
      buttonFinaliza.innerHTML = "Terminar"; buttonFinaliza.type = "button"; buttonFinaliza.addEventListener("click", botonfinalizar);
      objetivo.parentNode.replaceChild(buttonCheck, objetivo);
      div.appendChild(buttonCheck);
      div.appendChild(buttonFinaliza);

    }

function compruebasudoku(){
    let patata=false;
    for(let i=0;i<misudoku.length;i++){
        for(let j=0;j<misudoku[i].length;j++){
            if(misudoku[i][j]==0){patata=true;}
        }
    }
    if(patata==false){
        compruebaerrores();
        setTimeout(forcompruebasudoku,400);
    }
}

function forcompruebasudoku(){
  if (cosa==0){
      console.log("has ganado");
      mensajeemergente("ENHORABUENA","has ganado en un tiempo de hh dd zzzz",2);
  }
  else{
    mensajeemergente('Hay '+cosa+' errores',"quieres intentar corregirlos",2);
  }
}

function erroresonclick() {
    if(fallos.length<1){}
        for(let i=0;i<fallos.length;i++){
        pintarCasilla(fallos[i].fila,fallos[i].columna,0, '#8D021F');
        }
}


function resetGame(){
  let cv = document.querySelector('canvas'),
      ctx = cv.getContext('2d'),
      temp = document.getElementById('tempo'),
      butini = document.createElement('button'),
      div = document.getElementById('interfaz');

  sessionStorage.clear(); //limpiar storage
  pararTempo();
  document.getElementById('categoria').disabled = false;

  //vaciar sudoku
  ctx.clearRect(0, 0, cv.width, cv.height);
  rellenaLineas();

  //ocultar temporizador
  temp.style.display = "none";

  //crear boton empezar
  butini.innerHTML = "Empezar"; butini.type = "button"; butini.addEventListener("click", cargasudoku);
  butini.id="start";
  div.innerHTML = "";
  div.appendChild(butini);

}
//END funciones utilidad

//CANVAS

function canvaselector(){
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    let cv = document.querySelector('canvas');
      region = document.getElementById('categoria').value,
      t = document.getElementById('tempo');

    if(t.style.display==="block"){ //temporizador Y REINICIAR RELOJ
      t.style.display="none";
    }

    //if regiones, entonces cambiar width y height???
    if (region==9) {
    cv.width=640;
    cv.height=640;
    } else {
        cv.width=480;
        cv.height=480;
    }

    rellenaLineas();

    cv.onmousemove = function(evento){
        if(nopintar==1){
            recorresudoku();
        if(sessionStorage.sudoku != undefined) {
            let fila, columna,
            ancho = cv.width/region;
            fila = Math.floor(evento.offsetY / ancho);
            columna = Math.floor(evento.offsetX / ancho);
            let sudo =   JSON.parse(sessionStorage['sudoku']);


            if(sudo.SUDOKU[fila][columna] == 0) { //hasta aqui funcionaba vale el resto es codigo nuevo?
                //hay 2 variables globales, filact y colact, que usamos para guardar la fila y columna ANTERIORES
                if(filact == -1 || colact ==-1) {
                    //imagina que empezamos con el cursor en 3,2, se guarda la posicion inicial
                    filact=fila; // 3
                    colact=columna; // 2
                }
                let num = misudoku[filact][colact]; //el numero a pintar
                if(filact!=fila || colact!=columna){  //ahora imagina que pasamos a la pos 4,2

                    pintarCasilla(filact,colact,num,'#F4F4F9'); // se pinta 3, 2
                    filact=fila; // 4 luego pasamos las variables a la siguiente instancia
                    colact=columna; //2 para que en el siguiente bucle pinte si salimos de 4,2

                }
                document.getElementById('canvas').style.cursor = "pointer";
                pintarCasilla(filact,colact,num,'#8AA1B1');
            }
            else{ //si pasamos de blanquito a casilla estatica
                if (filact !=-1){ //para que no explote el programa
                    if(sudo.SUDOKU[filact][colact]==0){ // comprobamos que sea blanquito
                        let num = misudoku[filact][colact];
                        pintarCasilla(filact,colact,num,'#F4F4F9');

                    }
                }
                document.getElementById('canvas').style.cursor = "auto";
            }
        }

        }
    }

    cv.onclick =  function (evento){
        let sudo = JSON.parse(sessionStorage['sudoku']);
        let fila, columna,
            ancho = cv.width/region;
            fila = Math.floor(evento.offsetY / ancho);
            columna = Math.floor(evento.offsetX / ancho);

        if(sudo.SUDOKU[fila][columna]==0){
            ctx.clearRect(0, 0, cv.width, cv.height);
            let sudo = JSON.parse(sessionStorage['sudoku']);

                sqrt = Math.sqrt(region);
                let alto=cv.height/sqrt,
                ancho=cv.width/sqrt;
                let columna = Math.floor(evento.offsetX/ancho),
                fila = Math.floor(evento.offsetY/alto);
                region = Math.sqrt(region);
                pintarCasilla(fila,columna,0,'#8AA1B1');
                recorresudoku();
                ancho = cv.width/region;
                let c = Math.floor(evento.offsetX/ancho),
                f = Math.floor(evento.offsetY/ancho);

                    for(let i=0; i<sudo.SUDOKU.length; i++){
                        for(let j=0; j<sudo.SUDOKU[0].length; j++){
                            if(i==f && j!=c && sudo.SUDOKU[i][j]==0 && misudoku[i][j]==0){
                                pintarCasilla(i,j, sudo.SUDOKU[i][j],'#8AA1B1');

                            } else if(j==c && i!=f && sudo.SUDOKU[i][j]==0 && misudoku[i][j]==0){
                                pintarCasilla(i,j,0,'#8AA1B1');
                            }
                        }
                    }

                    pintarCasilla(f,c,misudoku[f][c],'#E5FFDE');
                    pintarBorde(f,c);
                    crearDiv(f,c);
                    nopintar=0;

            }


    }
    //cv.onmousemove
    //cv.onmousedown al clickar
    //cv.onmouseup al soltar el click
    //cv.onmousenter  al entrar al canvas (cuando los errores), onmouseleave

}

function crearrejilla(regiones,tam){

    let cv = document.querySelector('canvas'),
    ctx = cv.getContext('2d'),
    ancho=cv.width/regiones,
    alto=cv.height/regiones;
    ctx.beginPath();
    ctx.lineWidth= tam;
    ctx.strokeStyle = '#04724D';

    for (let i=0;i<regiones;i++){

            ctx.moveTo(i*ancho, 0);
            ctx.lineTo(i*ancho,cv.height);
            ctx.moveTo(0,i*alto);
            ctx.lineTo(cv.width,i*alto);

    }
    ctx.stroke();
}

function recorresudoku(){
    sudo =   JSON.parse(sessionStorage['sudoku']);

    for(let i=0;i<sudo.SUDOKU.length;i++){
        for(let j=0; j<sudo.SUDOKU[i].length;j++) {
            if(misudoku[i][j] != 0) {
                if(sudo.SUDOKU[i][j] != 0){
                    pintarCasilla(i,j,misudoku[i][j],'#B8DBD9');
                }
                else {
                    pintarCasilla(i,j,misudoku[i][j],'#F4F4F9');
                }

            }
        }
    }
}

function pintarCasilla(f,c,numero,colorfondo){
    let cv = document.querySelector("canvas"),
        ctx = cv.getContext('2d'),
        ancho = cv.width/region;

    ctx.fillStyle = colorfondo;
    ctx.fillRect(c*ancho,f*ancho, ancho, ancho);
    if(numero!=0){
        ctx.fillStyle = "#04724D";
        ctx.font = "50px Arial";
        ctx.textAlign = "center";
        f=f+1;

        ctx.fillText(numero,c * ancho + (ancho/2) ,f * ancho - (ancho/2)+20);
    }

    if(region==3 || region==2) {region=region*region;}
    rellenaLineas();
  }



  function pintarBorde(f,c){
    let cv = document.querySelector('canvas'),
    ctx = cv.getContext('2d'),
    ancho=cv.width/region;
    ctx.beginPath();
    ctx.lineWidth=3;
    ctx.strokeStyle = '#8D021F';
    ctx.strokeRect(c*ancho,f*ancho, ancho, ancho);
    ctx.stroke();

  }

  //NUMEROS

  function crearDiv(f,c){
      borraDiv();
      document.getElementById("nums").className = "conborde";
    for( i=1;i<=region;i++){
        let p = document.createElement('p');
        p.className="numeros";
        p.innerHTML=i;
        let cosita = parseInt(p.innerHTML);
        p.onclick= function() {pintarCasilla(f,c,p.innerHTML,'#F4F4F9');borraDiv();meteNumero(f,c,cosita);limpiasudoku();nopintar=1;compruebasudoku();};
        document.getElementById('nums').appendChild(p);

    }
  }

  function borraDiv(){
    document.getElementById("nums").className = "sinborde";
     document.getElementById('nums').innerHTML="";

  }

  function meteNumero(f,c,numero){
    misudoku[f][c]=numero;
  }

  function limpiasudoku(){
    sudo =   JSON.parse(sessionStorage['sudoku']);

    for(let i=0;i<sudo.SUDOKU.length;i++){
        for(let j=0; j<sudo.SUDOKU[i].length;j++) {
            if(misudoku[i][j] == 0) {
                if(sudo.SUDOKU[i][j] == 0){
                    pintarCasilla(i,j,misudoku[i][j],'#F4F4F9');
                }
                else {
                    pintarCasilla(i,j,misudoku[i][j],'#F4F4F9');
                }

            }
        }
    }
}


//-------------------- FUNCIONES TEMPORIZADOR ---------------------------
function iniciarTemporizador(){
  document.getElementById('crono').innerHTML = '00:00:00';
  document.getElementById('crono').setAttribute('data-valor', '0');
  document.getElementById('crono').removeAttribute('data-parar')
  setTimeout(actualizarTempo, 1000); //cuando pase 1 segundo se llama y actualizamos
}

function actualizarTempo(){
  if(document.getElementById('crono').getAttribute('data-parar')){
    return false;
  }
  let valor = parseInt(document.getElementById('crono').getAttribute('data-valor'))+1, //valor del cronometro anterior y le sumo 1
      horas = Math.floor(valor/3600),
      minutos = Math.floor((valor - horas*3600)/60),
      segundos = valor-horas*36000 - minutos * 60;

  horas = (horas < 10 ?'0':'') + horas;
  minutos = (minutos < 10 ?'0':'') + minutos;
  segundos = (segundos < 10 ?'0':'') + segundos;


  document.getElementById('crono').innerHTML = `${horas}:${minutos}:${segundos}`;
  document.getElementById('crono').setAttribute('data-valor', valor);
  setTimeout( actualizarTempo, 1000);

}

function pararTempo(){
  document.getElementById('crono').setAttribute('data-parar', 'si');
}
//------------------------ END TEMPORIZADOR -------------------------------


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

function cerrarmodal(num){
    document.querySelector('#capafondo').remove();
    if(num==1){
        location.href="login.html";
    }

}

