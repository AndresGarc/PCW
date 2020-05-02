//no se como van los sudokus pero a lo mejor nos vale la pena hacer una funcion que nos diga la posicion
//de un elemento pasado para pintarlo en el canvas mas facilmente
function cargasudoku(){ //el boton de empezar
    //desactiva elemento cambio tamaño
    //hacer peticion cargarsudoku
    let url = 'api/sudoku/generar/4';
    fetch(url, {method:'POST'}).then(function(respuesta){
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

function creacanvas(){
    var cv = document.getElementById("canvas");
    var context = cv.getContext('2d');
}

function compruebaerrores(){
    //let sudoku  sessionstorage sudoku, con eso hacemos una peticion POST a /id sudoku/comprobar

    //tras encontrar fallos, for each llamar a destacar fallos
}

function botonfinalizar(){
    //peticion tipo delete igual que compruebaerrores
    // si respuesta.ok parar temporizador y reiniciar la pagina
}