/**
 * @type {HTMLCanvasElement}
 */

const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

window.addEventListener('load', startGame) //apenas abra, se ejecuará

// Para usarla en el futuro
function startGame() {
    let canvasSize; 

    if(window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.8;  // Pantalla con 75% responsive al abrir o recargar
    } else {
        canvasSize = window.innerHeight * 0.8
    }

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize); 
    
    const elementsSize = (canvasSize / 10) - 1;
    console.log({canvasSize, elementsSize});

    game.font = elementsSize + 'px Verdana';
    game.textAlign = "";

    for (let i = 0; i < 10; i++) {
        game.fillText(emojis['X'], elementsSize * i, elementsSize);
        
    }

    
    
    // game.fillRect(0,0,100,100); // Dibuja trazo (x,y, hasta donde llega x, hasta donde llega y)
    // game.clearRect(0,0,100,100); // Borra (mismos que el anterior)
    // game.font = '25px Verdana';
    // game.fillStyle = 'purple';
    // game.textAlign = 'right'; // lo ubica desde la posición que está, no del recuadro
    // game.fillText('Platzi', 25, 25);
}