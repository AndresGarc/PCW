//no se como van los sudokus pero a lo mejor nos vale la pena hacer una funcion que nos diga la posicion
//de un elemento pasado para pintarlo en el canvas mas facilmente
function cargasudoku(){ //el boton de empezar
    //desactiva elemento cambio tamaño
    //hacer peticion cargarsudoku
    let url = 'api/sudoku/generar/4';
    console.log(url);
    fetch(url,{method:'POST'}).then(function(respuesta){
        if( respuesta.ok){
            
            respuesta.json().then(function(datos){
                console.log(datos);
                //console.log(JSON.stringify(datos));
                sessionStorage['sudoku'] = JSON.stringify(datos); //guarda el sudoku y un token que se usa de auth
                console.log("bien bien");
                // tras eso pintar en el canvas siguiendo la paleta
                //sustituir boton empezar por temporizador+comprobar+finalizar
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



function compruebaerrores(){
    //let sudoku  sessionstorage sudoku, con eso hacemos una peticion POST a /id sudoku/comprobar

    //tras encontrar fallos, for each llamar a destacar fallos
}

function botonfinalizar(){
    //peticion tipo delete igual que compruebaerrores
    // si respuesta.ok parar temporizador y reiniciar la pagina
}

function canvaselector(regiones){
    let cv = document.querySelector('canvas');
    //if regiones, entonces cambiar width y height???
    cv.width=640;
    cv.height=640;
    cv.onclick = function(evento){
        
       
        let alto=cv.height/regiones,
        ancho=cv.width/regiones;
        let columna = Math.floor(evento.offsetX/ancho),
        fila = Math.floor(evento.offsetY/alto);
        console.log(fila+' ' +columna);
        
    }
    let subdivi = Math.sqrt(regiones);
    crearrejilla(regiones,1);
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