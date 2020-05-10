
var region = 4;
var misudoku = [];

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
    let args = "juego="+misudoku;
    let xhr = new XMLHttpRequest(),
    url = 'api/sudoku/'+ sudo.ID+'/comprobar'; //tomando la info del sessionstorage
    console.log(args);
    console.log(url);
    xhr.open('POST',url,true);

    xhr.onload = function(){
      

        console.log(xhr.responseText);
    
    }
   xhr.setRequestHeader('Authorization',autorizacion);
    xhr.send(args);


    //tras encontrar fallos, for each llamar a destacar fallos
}

function botonfinalizar(){
    let sudo = JSON.parse(sessionStorage['sudoku']);
    let url = 'api/sudoku/'+ sudo.ID+'/delete';
    init = {method: 'DELETE', headers:{'Authorization':`${sudo.TOKEN}`} };

          fetch(url, init).then(function(response){
              console.log(response);
            if(!response.ok){
              //console.log("Error con la subida");
              response.json().then(function(datos){
                console.log("bien");
                console.log(datos);
              });
            } else {
                console.log("mal");
              console.log(response);
              //console.log("Borrado completado");

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
      buttonCheck.onclick= function() {compruebaerrores()};
      buttonFinaliza.innerHTML = "Terminar"; buttonFinaliza.type = "button"; buttonFinaliza.addEventListener("click", botonfinalizar);
      buttonFinaliza.onclick= function() {botonfinalizar()};
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
    }
}

function erroresonclick() {
    if(fallos.length<1){}
        for(let i=0;i<fallos.length;i++){
        pintarCasilla(fallos[i].fila,fallos[i].columna,0, '#8D021F');
        }
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
        if(sessionStorage.sudoku != undefined) {
            let fila, columna,
            ancho = cv.width/region;
            fila = Math.floor(evento.offsetY / ancho);
            columna = Math.floor(evento.offsetX / ancho);
            const cuadrado = new Path2D();
            cuadrado.rect(fila*ancho,columna*ancho,fila*ancho,columna*ancho);
            ctx.fillStyle ='red';
            let sudo =   JSON.parse(sessionStorage['sudoku']);
            if(sudo.SUDOKU[fila][columna] == 0) {
                document.getElementById('canvas').style.cursor = "pointer";

              /*  if (ctx.isPointInPath(cuadrado, fila*ancho,columna*ancho)) {
                    pintarCasilla(fila,columna,0,'#586F7C');
                  }
                  else {
                    pintarCasilla(fila,columna,0,'#F4F4F9');

                  } */

            }
            else{
                document.getElementById('canvas').style.cursor = "auto";
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
        let cosa = parseInt(p.innerHTML);
        p.onclick= function() {pintarCasilla(f,c,p.innerHTML,'#F4F4F9');borraDiv();meteNumero(f,c,cosa);limpiasudoku();};
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
