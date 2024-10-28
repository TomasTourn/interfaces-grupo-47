// Variables globales
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');


let board = null;

//Fondo juego

let fondoImage = new Image();
fondoImage.src = "Images/Juego/fondo.png" 

let testBg1Image = new Image();
testBg1Image.src = "Images/Juego/test-bg.png" 

let testBg2Image = new Image();
testBg2Image.src = "Images/Juego/test-bg2.png" 

//Turnos

let turnoWolverine = new Image();
turnoWolverine.src = "Images/Juego/turnoWolverine.png"

let turnoDeadpool = new Image();
turnoDeadpool.src = "Images/Juego/turnoDeadpool.png"

let imageDeadpool= new Image();
imageDeadpool.src="Images/Juego/deadpoolgrabbingface.jpg";

let imageWolverine= new Image();
imageWolverine.src="Images/Juego/wolverine.jpg";

let players = [new Jugador('Deadpool',imageDeadpool, '#981a28'), new Jugador('Wolverine',imageWolverine, '#E3B22F')]; // Rojo y amarillo
let currentPlayer = 0;
let selectedPiece = null;
let xEnLinea =0;

let draggedPiece = null; // Ficha que se está arrastrando

let radius = null;// Tamaño de las fichas que se mostrarán arriba

//botones
let buttonWidth = 200;
let buttonHeight = 40;

let buttonBackSize = 30;

// Dibuja el tablero y las fichas
function draw() {
    if(xEnLinea!=0){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#ffffff'; // Color azul para el fondo del tablero
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(
            fondoImage,        
            0, 0,             // Posición X e Y de la imagen en el canvas
            canvas.width,        // Ancho del tablero (ajustado al tamaño del canvas)
            canvas.height+30     // Alto del tablero (ajustado al tamaño del canvas)
        );

        ctx.drawImage(
            testBg1Image,        
            230, 240,             // Posición X e Y de la imagen en el canvas
            95,
            355        // Alto del tablero (ajustado al tamaño del canvas)
        );
            
        ctx.drawImage(
            testBg2Image,        
            ((board.cellSize*board.cols)+board.marginLeft)-24, 243,             // Posición X e Y de la imagen en el canvas
            95,
            355      
        );
        

        board.draw(ctx);
        displayTurn(); 
        drawPlayerPieces();


        // Dibuja el botón de reiniciar
        let restartButtonX = canvas.width - buttonWidth - 20;
        let restartButtonY = canvas.height - buttonHeight - 20;
        ctx.fillStyle = "#FF0000"; // Rojo para reiniciar
        ctx.fillRect(restartButtonX, restartButtonY, buttonWidth, buttonHeight);
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText("Reiniciar", restartButtonX + buttonWidth / 2, restartButtonY + buttonHeight / 2);

        //dibuja boton back
        let backButtonX = 20;
        let backButtonY = 20;
        ctx.fillStyle = "#FF5733"; // Naranja para el botón
        ctx.fillRect(backButtonX, backButtonY, buttonBackSize, buttonBackSize);
        ctx.fillStyle = "#FFFFFF";
        ctx.fillText("X", backButtonX + buttonBackSize / 2, backButtonY + buttonBackSize / 2); 

        if (draggedPiece) {
            draggedPiece.draw(ctx);
        }
    }else{
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawButtons();      
    }
    
    if(board.ganador){
        board.ganador=false;
        restartGame();
    }
}

function startGame(x) {
    xEnLinea=x;
    board = new Tablero(
        ctx,        // Contexto del canvas
        xEnLinea,   // Configuración de x en línea
        100,        // marginTop
        60,        // marginBottom
        0,        // marginRight
        300         // marginLeft
    );
    currentPlayer = 0;  // Reiniciamos el turno al primer jugador
    radius = board.getCellSize() / 2 - 9;
    draw();            // Redibujar el tablero con las nuevas dimensiones
}

function drawPlayerPieces() {    
    players.forEach((player, index) => {
        let x=null
        if(index==0){
            x = 100; // Espacio entre fichas
            
        }else{
            x = 1040; // Espacio entre fichas
        }     
        let y = 350; // Posición fija en la parte superior del canvas
        let piece = new Ficha(player,x,y,radius)
        player.setNextPiece(piece);
        if(players[currentPlayer]==player){
            piece.setResaltado(true)
        }
        piece.draw(ctx,board.cellSize);
        piece.setResaltado(false);
    });
}

function switchTurns() {
    currentPlayer = (currentPlayer + 1) % 2;
}

function displayTurn() {
    let posX = 350;     // Posición horizontal centrada
    let posY = 30; // Posición vertical entre el tablero y las fichas
    let turno=null;

    if(currentPlayer==0){
        turno = turnoDeadpool
    }else{
        turno = turnoWolverine
    }
    
    ctx.drawImage(
        turno,        
        posX, 0,             
        391,        
        70    
    );
}



canvas.addEventListener('mousedown', (event) => {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

    // Verifica si se hace clic en una de las fichas del jugador actual
    let currentPlayerPiece = players[currentPlayer].getNextPiece(); // Ficha del jugador actual    
    
    let distance = Math.sqrt((x - currentPlayerPiece.x) ** 2 + (y - currentPlayerPiece.y) ** 2);
    

    // Solo permite arrastrar la ficha si es del jugador actual
    if (distance < radius) {
        draggedPiece = players[currentPlayer].getNextPiece(); // Guarda el jugador actual cuya ficha se arrastra
    }
});

canvas.addEventListener('mousemove', (event) => {
    if (draggedPiece) {
        let rect = canvas.getBoundingClientRect();
        draggedPiece.x = event.clientX - rect.left;
        draggedPiece.y = event.clientY - rect.top;
        draw(); // Redibujar el canvas con la ficha moviéndose
    }
});

canvas.addEventListener('mouseup', (event) => {
    if (draggedPiece) {
        let rect = canvas.getBoundingClientRect();
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;

        let pieceDropped = false;

        // Verificar si la ficha está sobre una columna
        for (let col = 0; col < board.cols; col++) {
            let hintX = board.marginLeft + col * board.cellSize;
            if (x > hintX && x < hintX + board.cellSize && (y < board.marginTop && y > 35)) {
                // Colocar la ficha en la columna
                if (board.dropDisc(col, players[currentPlayer])) {
                    draw(); // Redibuja el tablero
                    switchTurns();
                    pieceDropped = true;
                }
                break;
            }
        }

        // Si no se ha colocado la ficha, devolverla a su lugar
        if (!pieceDropped) {          
            draggedPiece.returnPieceToStart(draggedPiece);  // Iniciar animación de retorno
        }

        draggedPiece = null; // Reseteamos el arrastre
    }
});

function drawButtons() {
    // Configuraciones básicas de los botones    
    let startY = 50;  // Margen superior para los botones
    let margin = 20;  // Espacio entre botones

    // Colores y estilos
    ctx.fillStyle = "#4CAF50"; // Verde para el botón
    ctx.font = "20px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Botón para Jugar 4 en línea
    ctx.fillRect(canvas.width / 2 - buttonWidth / 2, startY, buttonWidth, buttonHeight);
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("Jugar 4 en línea", canvas.width / 2, startY + buttonHeight / 2);
    
    // Botón para Jugar 5 en línea
    ctx.fillStyle = "#4CAF50";
    ctx.fillRect(canvas.width / 2 - buttonWidth / 2, startY + buttonHeight + margin, buttonWidth, buttonHeight);
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("Jugar 5 en línea", canvas.width / 2, startY + buttonHeight * 1.5 + margin);

    // Botón para Jugar 6 en línea
    ctx.fillStyle = "#4CAF50";
    ctx.fillRect(canvas.width / 2 - buttonWidth / 2, startY + (buttonHeight + margin) * 2, buttonWidth, buttonHeight);
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("Jugar 6 en línea", canvas.width / 2, startY + buttonHeight * 3 + margin);
}

canvas.addEventListener('click', function(event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    
    let startY = 50;
    let margin = 20;
    // Coordenadas del botón de "Jugar 4 en línea"
    let buttonX = canvas.width / 2 - buttonWidth / 2;
    
    if(xEnLinea==0){ 
        
        if (x >= buttonX && x <= buttonX + buttonWidth) {
            if (y >= startY && y <= startY + buttonHeight) {
                startGame(4); // Jugar 4 en línea
            }else if (y >= startY + buttonHeight + margin && y <= startY + (buttonHeight + margin + buttonHeight)) {
                startGame(5); // Jugar 5 en línea
            } else if (y >= startY + (buttonHeight + margin) * 2 && y <= startY + (buttonHeight + margin) * 2 + buttonHeight) {
                startGame(6); // Jugar 6 en línea
            }
        }
        
    }else{
        // Coordenadas del botón de "Reiniciar"
        let restartButtonX = canvas.width - buttonWidth - 20;
        let restartButtonY = canvas.height - buttonHeight - 20;
        if (x >= restartButtonX && x <= restartButtonX + buttonWidth && y >= restartButtonY && y <= restartButtonY + buttonHeight) {
            restartGame(); // Reiniciar juego
        }

        // Coordenadas del botón de "Volver"
        let backButtonX = 20;
        let backButtonY = 20;
        if (x >= backButtonX && x <= backButtonX + buttonBackSize && y >= backButtonY && y <= backButtonY + buttonBackSize) {
            xEnLinea=0;
            draw() // Función que maneja el volver atrás
        }
    }

});

// Reinicia el juego
function restartGame() {    
    board = new Tablero(
        ctx,        // Contexto del canvas
        xEnLinea,   // Configuración de x en línea
        100,        // marginTop
        60,        // marginBottom
        0,        // marginRight
        300         // marginLeft
    );
    currentPlayer = 0;
    draw();
}

// Inicia el juego
window.onload = () => {
    startGame(xEnLinea)
    //startTimer();
};

// Temporizador
/*
let timeLeft = 60;
function startTimer() {

    let timer = setInterval(() => {
        
        document.getElementById('timer').innerText = `Tiempo: ${timeLeft--}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            alert('Tiempo agotado. Empate.');
        }
    }, 1000);
}
*/

