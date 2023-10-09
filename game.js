/**
 * @type {HTMLCanvasElement}
 */

const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');
const spanLives = document.querySelector('#lives');
const spanTime = document.querySelector('#time');
const spanRecord = document.querySelector('#record');
const pResult = document.querySelector('#result');

let canvasSize; 
let elementsSize;
let level = 0;
let lives = 3;

let timeStart;
let timePlayer;
let timeInterval;

const playerPosition = {
    x: undefined,
    y: undefined,
};

const giftPosition = {
    x: undefined,
    y: undefined,
}

let enemyPositions = [];https://platzi.com/clases/3573-javascript-practico-videojuegos/52335-victoria-subiendo-de-nivel/

window.addEventListener('load', setCanvasSize); //apenas abra, se ejecuará el size
window.addEventListener('resize', setCanvasSize); // se hará resize de manera dinámica 

function setCanvasSize() {
    // Determinamos el tamaño de la ventana.
    // if(window.innerHeight > window.innerWidth) {
    //     canvasSize = window.innerWidth * 0.8;  // Pantalla con 75% responsive al abrir o recargar. Por el momento lo puse en 0.9.
    // } else {
    //     canvasSize = window.innerHeight * 0.8;
    // }

    windowHeight = window.innerHeight * 0.8;
    windowWidth = window.innerWidth * 0.8;

    if (window.innerHeight > window.innerWidth) {
        if ((windowWidth % 10) !== 0) {
             canvasSize = Math.ceil(windowWidth / 10) * 10;
        } else {
             canvasSize = windowWidth;
        }
    } else {
        if ((windowHeight % 10) !== 0) {
             canvasSize = Math.ceil(windowHeight / 10) * 10;
        } else {
             canvasSize = windowHeight;
        }
    }

    // canvasSize = Number(canvasSize.toFixed(0));

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize); 
    
    // Elementos del tablero
    elementsSize = (canvasSize / 10);

    playerPosition.x = undefined;
    playerPosition.y = undefined;
    startGame()
}

function startGame () {
    // console.log({canvasSize, elementsSize});

    game.font = elementsSize + 'px Verdana';
    game.textAlign = 'end';

    // Extraigo los caracteres de maps.js
    const map = maps[level];

    if(!map) {
        gameWin();
        return;
    }

    // Contador de tiempo
    if (!timeStart) {
        timeStart = Date.now();
        timeInterval = setInterval(showTime, 100);
        showRecord();
    }


    // Creo las filas. Trim para limpiar los spacios, split para crear arreglos desde strings
    const mapRows = map.trim().split('\n');
    // Creo las columnas
    const mapRowCols = mapRows.map(row => row.trim().split(''));
    // console.log({map, mapRows, mapRowCols});

    showLives();

    enemyPositions = [];
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
            } else if (col == 'I') {
                giftPosition.x = posX;
                giftPosition.y = posY;
            } else if (col == 'X') {
                enemyPositions.push({
                    x: posX,
                    y: posY,
                });
            }

            game.fillText(emoji, posX, posY);
        })
    });

    movePlayer();
}

function movePlayer() {
    const giftCollisionX = playerPosition.x.toFixed(3) == giftPosition.x.toFixed(3); // To fixed es para evitar problemas con tamaños y colisiones
    const giftCollisionY = playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3);
    const giftCollision = giftCollisionX && giftCollisionY;

    if (giftCollision) {
        levelWin();
    }

    // Comprobar si algún enemigo coincide con mi posición
    const enemyCollision = enemyPositions.find( enemy => {
        const enemyCollisionX = enemy.x.toFixed(3) == playerPosition.x.toFixed(3);
        const enemyCollisionY = enemy.y.toFixed(3) == playerPosition.y.toFixed(3);
        return enemyCollisionX && enemyCollisionY;
    });

    if (enemyCollision) {
        levelFail();
    }
    
    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}

// Para pasar de nivel
function levelWin() {
    console.log('Subiste de nivel');
    level++;
    startGame();
}

function levelFail() {
    console.log('Chocaste contra un enemigo');
    lives--;

    console.log(lives);
    if (lives <= 0) {
        level = 0;
        lives = 3;
        clearInterval(timeInterval);
        timeStart = undefined;
    }
    playerPosition.x = undefined;
    playerPosition.y = undefined;
    startGame();
}

function gameWin() {
    console.log('Terminaste el juego');
    clearInterval(timeInterval);
    const playerTime = Date.now() - timeStart;

    const recordTime = localStorage.getItem('record_time');
    if(recordTime) {
        if (recordTime >= playerTime) {
            localStorage.setItem('record_time', playerTime);
            pResult.innerHTML = '¡Superaste el record!';
        } else {
            pResult.innerHTML = 'Lo siento, no superaste el record :c';
        }
    } else {
        localStorage.setItem('record_time', playerTime);
        pResult.innerHTML = '¿Primera vez? Muy bien pero trátalo de superar :D.'
    }
    console.log({recordTime});
}

// Marcar corazones de vidas
function showLives() {
    spanLives.innerHTML = emojis["HEART"].repeat(lives) // Solución más limpia
/*     const heartArray = Array(lives).fill(emojis['HEART']) // [1, 2, 3]
    spanLives.innerHTML = "";
    heartArray.forEach(heart => spanLives.append(heart)); */
}

function showTime() {
    spanTime.innerHTML = (Date.now() - timeStart) / 1000;
}

function showRecord() {
    spanRecord.innerHTML = (localStorage.getItem('record_time')) / 1000;
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
