/**
 * @type {HTMLCanvasElement}
 */

const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

let canvasSize; 
let elementsSize;

window.addEventListener('load', setCanvasSize); //apenas abra, se ejecuará el size
window.addEventListener('resize', setCanvasSize); // se hará resize de manera dinámica 

function setCanvasSize() {
    // Determinamos el tamaño de la ventana.
    if(window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.8;  // Pantalla con 75% responsive al abrir o recargar
    } else {
        canvasSize = window.innerHeight * 0.8
    }

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize); 
    
    // Elementos del tablero
    elementsSize = (canvasSize / 10) - 1;

    startGame()

function startGame () {
    console.log({canvasSize, elementsSize});

    game.font = elementsSize + 'px Verdana';
    game.textAlign = 'end';

    // Extraigo los caracteres de maps.js
    const map = maps[0];
    // Creo las filas. Trim para limpiar los spacios, split para crear arreglos desde strings
    const mapRows = map.trim().split('\n');
    // Creo las columnas
    const mapRowCols = mapRows.map(row => row.trim().split(''));
    console.log({map, mapRows, mapRowCols});

    mapRowCols.forEach((row, rowI) => {
        row.forEach((col, colI) => {
            const emoji = emojis[col];
            const posX = elementsSize * (colI + 1);
            const posY = elementsSize * (rowI + 1);
            game.fillText(emoji, posX, posY);
        })
    });

    /* // Rellenando con bombitas
    for (let row = 1; row <= 10; row++) {
        // console.log(row);
        for (let col = 1; col <= 10; col++) {
            game.fillText(emojis[mapRowCols[row - 1][col - 1]],
                (elementsSize * col) + 12, (elementsSize * row) -1);
            // console.log(col);
        }
    } */
}

    // Me quedé en el minuto 5:19, video 6.
    
    // game.fillRect(0,0,100,100); // Dibuja trazo (x,y, hasta donde llega x, hasta donde llega y)
    // game.clearRect(0,0,100,100); // Borra (mismos que el anterior)
    // game.font = '25px Verdana';
    // game.fillStyle = 'purple';
    // game.textAlign = 'right'; // lo ubica desde la posición que está, no del recuadro
    // game.fillText('Platzi', 25, 25);
}