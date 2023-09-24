/**
 * @type {HTMLCanvasElement}
 */

const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');

let canvasSize; 
let elementsSize;

const playerPosition = {
    x: undefined,
    y: undefined,
};

window.addEventListener('load', setCanvasSize); //apenas abra, se ejecuará el size
window.addEventListener('resize', setCanvasSize); // se hará resize de manera dinámica 

function setCanvasSize() {
    // Determinamos el tamaño de la ventana.
    if(window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.9;  // Pantalla con 75% responsive al abrir o recargar. Por el momento lo puse en 0.9.
    } else {
        canvasSize = window.innerHeight * 0.9;
    }

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize); 
    
    // Elementos del tablero
    elementsSize = (canvasSize / 10) - 1;

    startGame()
}

function startGame () {
    // console.log({canvasSize, elementsSize});

    game.font = elementsSize + 'px Verdana';
    game.textAlign = 'end';

    // Extraigo los caracteres de maps.js
    const map = maps[0];
    // Creo las filas. Trim para limpiar los spacios, split para crear arreglos desde strings
    const mapRows = map.trim().split('\n');
    // Creo las columnas
    const mapRowCols = mapRows.map(row => row.trim().split(''));
    // console.log({map, mapRows, mapRowCols});

    game.clearRect(0, 0, canvasSize, canvasSize); // Borrado inicial


    mapRowCols.forEach((row, rowI) => {
        row.forEach((col, colI) => {
            const emoji = emojis[col];
            const posX = elementsSize * (colI + 1);
            const posY = elementsSize * (rowI + 1);

            if (col == 'O') {
                if(!playerPosition.x && !playerPosition.y) {
                    playerPosition.x = posX;
                    playerPosition.y = posY;
                    console.log({playerPosition});
                }
            }

            game.fillText(emoji, posX, posY);
        })
    });

    movePlayer();
}

function movePlayer() {
    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}

window.addEventListener('keydown', moveByKeys); // keydown cuando oprimimos la tecla, keyup es cuando levantamos la letra
btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);

// Escuchar las teclas de direcciones. La sintaxis es equivalente al if else tradicional.
function moveByKeys(event) {
    if (event.key == 'ArrowUp') moveUp();
    else if (event.key == 'ArrowLeft') moveLeft();
    else if (event.key == 'ArrowRight') moveRight();
    else if (event.key == 'ArrowDown') moveDown();
}

function moveUp() {
    console.log('Me quiero mover hacia arriba');
    if ((playerPosition.y - elementsSize) < elementsSize) { // En otros zooms, funciona con 0
        console.log('OUT');
    } else {
        playerPosition.y -= elementsSize;
        startGame();
    }
}

function moveLeft() {
    console.log('Me quiero mover hacia la izquierda');
    if ((playerPosition.x - elementsSize) < elementsSize) { // En otros zooms, funciona con 0
        console.log('OUT');
    } else {
        playerPosition.x -= elementsSize;
        startGame();
    }
}

function moveRight() {
    console.log('Me quiero mover hacia la derecha');
    if ((playerPosition.x + elementsSize) > canvasSize) { // En otros zooms, funciona con 0
        console.log('OUT');
    } else {
        playerPosition.x += elementsSize;
        startGame();
    }
}

function moveDown() {
    console.log('Me quiero mover hacia abajo');
    if ((playerPosition.y + elementsSize) > canvasSize) {
        console.log('OUT');
    } else {
        playerPosition.y += elementsSize;
        startGame();
    }
}
