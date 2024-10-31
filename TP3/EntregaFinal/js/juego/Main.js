document.addEventListener('DOMContentLoaded', () => {
    let canvas = document.getElementById('gameCanvas');
    let ctx = canvas.getContext('2d');

    let juego = new Juego(canvas,ctx);  // Inicializa el juego con el ID del canvas


    // Inicia el juego
    window.onload = () => {
        juego.startGame()
    };

    juego.canvas.addEventListener('mousedown', (event) => {
        if (juego.xEnLinea !== 0) {
            let rect = juego.canvas.getBoundingClientRect();
            let x = event.clientX - rect.left;
            let y = event.clientY - rect.top;
    
            // Obtiene el arreglo de fichas del jugador actual
            let playerPieces = juego.currentPlayer === 0 ? juego.piecePlayer1 : juego.piecePlayer2;
    
            // Verifica si se hizo clic en alguna de las fichas del jugador actual
            playerPieces.forEach(piece => {
                let distance = Math.sqrt((x - piece.x) ** 2 + (y - piece.y) ** 2);
                if (distance < juego.radius) {
                    juego.draggedPiece = piece; // Guarda la ficha que se arrastra
                    // Elimina la ficha seleccionada del arreglo
                    playerPieces.splice(index, 1);
                }
            });
        }
    });

   juego.canvas.addEventListener('mousemove', (event) => {
      if (juego.draggedPiece) {
            let rect = canvas.getBoundingClientRect();
            juego.draggedPiece.x = event.clientX - rect.left;
            juego.draggedPiece.y = event.clientY - rect.top;
            juego.draw(); // Redibujar el canvas con la ficha moviéndose
      }
    });

    juego.canvas.addEventListener('mouseup', (event) => {
        if (juego.draggedPiece) {
            let rect = juego.canvas.getBoundingClientRect();
            let x = event.clientX - rect.left;
            let y = event.clientY - rect.top;

            let pieceDropped = false;

            // Verificar si la ficha está sobre una columna
            for (let col = 0; col < juego.board.cols; col++) {
                let hintX = juego.board.marginLeft + col * juego.board.cellSize;
                if (x > hintX && x < hintX + juego.board.cellSize && (y < juego.board.marginTop && y > 35)) {
                    // Colocar la ficha en la columna
                    if (juego.board.dropDisc(col, juego.players[juego.currentPlayer])) {
                        juego.draw(); // Redibuja el tablero
                        juego.switchTurns();
                        pieceDropped = true;
                    }
                    break;
                }
            }

            // Si no se ha colocado la ficha, devolverla a su lugar
            if (!pieceDropped) {          
                juego.draggedPiece.returnPieceToStart(juego.draggedPiece,juego);  // Iniciar animación de retorno
            }

            juego.draggedPiece = null; // Reseteamos el arrastre
        }
    });

    juego.canvas.addEventListener('click', function(event) {
        let rect = juego.canvas.getBoundingClientRect();
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;
        
        let startY = 50;
        let margin = 20;
        // Coordenadas del botón de "Jugar 4 en línea"
        let buttonX = juego.canvas.width / 2 - juego.buttonWidth / 2;
        
        if(juego.xEnLinea==0){ 
            
            if (x >= buttonX && x <= buttonX + juego.buttonWidth) {
                if (y >= startY && y <= startY + juego.buttonHeight) {
                    juego.xEnLinea=4;
                    juego.startGame(); // Jugar 4 en línea
                }else if (y >= startY + juego.buttonHeight + margin && y <= startY + (juego.buttonHeight + margin + juego.buttonHeight)) {
                    juego.xEnLinea=5;
                    juego.startGame(); // Jugar 5 en línea
                } else if (y >= startY + (juego.buttonHeight + margin) * 2 && y <= startY + (juego.buttonHeight + margin) * 2 + juego.buttonHeight) {
                    juego.xEnLinea=6;
                    juego.startGame(); // Jugar 6 en línea
                }
            }
            
        }else{
            // Coordenadas del botón de "Reiniciar"
            let restartButtonX = canvas.width - juego.buttonWidth - 20;
            let restartButtonY = canvas.height - juego.buttonHeight - 20;
            if (x >= restartButtonX && x <= restartButtonX + juego.buttonWidth && y >= restartButtonY && y <= restartButtonY + juego.buttonHeight) {
                juego.timeLeft=300;
                juego.startGame(); // Reiniciar juego
            }

            // Coordenadas del botón de "Volver"
            let backButtonX = 20;
            let backButtonY = 20;
            if (x >= backButtonX && x <= backButtonX + juego.buttonBackSize && y >= backButtonY && y <= backButtonY + juego.buttonBackSize) {
                juego.xEnLinea=0;
                clearInterval(juego.timerInterval); // Limpia el intervalo anterior
                juego.draw() // Función que maneja el volver atrás
            }
        }
    });
});