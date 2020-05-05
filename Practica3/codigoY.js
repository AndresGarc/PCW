//no se como van los sudokus pero a lo mejor nos vale la pena hacer una funcion que nos diga la posicion
//de un elemento pasado para pintarlo en el canvas mas facilmente
var region = 4;

function cargasudoku(){ //el boton de empezar
    //desactiva elemento cambio tamaño
    //hacer peticion cargarsudoku
    let url = 'api/sudoku/generar/' + region;
    console.log(url);
    fetch(url,{method:'POST'}).then(function(respuesta){
        if( respuesta.ok){

            respuesta.json().then(function(datos){
                console.log("bien bien");
                //console.log(JSON.stringify(datos));
                sessionStorage['sudoku'] = JSON.stringify(datos); //guarda el sudoku y un token que se usa de auth
                // tras eso pintar en el canvas siguiendo la paleta
                //sustituir boton empezar por temporizador+comprobar+finalizar
                prepararInterfaz();
                sudo =   JSON.parse(sessionStorage['sudoku']);
                recorresudoku();
            });
        }
        else {
           console.log("mal mal");
        }
    });
    return false;
}

function cambiasudoku(){
    console.log("cambio de sudoku");
    //esta funcion cambiaria el tamaño del grid del sudoku cada vez que se cambiase eso
}

function infoSudo(){
  let usu =   JSON.parse(sessionStorage['sudoku']);
  console.log(usu.SUDOKU[1][0]);
}


function compruebaerrores(){
    //let sudoku  sessionstorage sudoku, con eso hacemos una peticion POST a /id sudoku/comprobar

    //tras encontrar fallos, for each llamar a destacar fallos
}

function botonfinalizar(){
    //peticion tipo delete igual que compruebaerrores
    // si respuesta.ok parar temporizador y reiniciar la pagina
}

function canvaselector(){
   
    let cv = document.querySelector('canvas');
    region = document.getElementById('categoria').value;
    //if regiones, entonces cambiar width y height???
    cv.width=640;
    cv.height=640;
    cv.onclick = function(evento){
        let alto=cv.height/region,
        ancho=cv.width/region;
        let columna = Math.floor(evento.offsetX/ancho),
        fila = Math.floor(evento.offsetY/alto);
        console.log(fila+' ' +columna);

    }
    let subdivi = Math.sqrt(region);
    crearrejilla(region,1);
    crearrejilla(subdivi,3);
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


function prepararInterfaz(){
//  objetivo.parentNode.replaceChild(div, objetivo); FUNCION SUSTITUCION
  let objetivo = document.getElementById('start');
  let div = document.getElementById('interfaz');
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

function recorresudoku(){
    sudo =   JSON.parse(sessionStorage['sudoku']);

    for(let i=0;i<sudo.SUDOKU.length;i++){
        for(let j=0; j<sudo.SUDOKU[i].length;j++) {
            if(sudo.SUDOKU[i][j] != 0) {
                console.log(sudo.SUDOKU[i][j]);
                pintarCasilla(i,j,sudo.SUDOKU[i][j]);
            }
        }
    }
}

function pintarCasilla(f,c,numero){
    let cv = document.querySelector("canvas"),
        ctx = cv.getContext('2d'),
        ancho = cv.width/region;
  
    ctx.fillStyle = "#B8DBD9";
    ctx.fillRect(c*ancho,f*ancho, ancho, ancho);
    ctx.fillStyle = "#04724D";
    ctx.font = "50px Arial";
    ancho=ancho-ancho/2;
    ctx.fillText("2",c*ancho,f*ancho); // 71 0 ,,, 
    let subdivi = Math.sqrt(region);
    crearrejilla(region,1);
    crearrejilla(subdivi,3);
  }