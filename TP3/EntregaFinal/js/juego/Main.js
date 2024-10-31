document.addEventListener('DOMContentLoaded', () => {
    let canvas = document.getElementById('gameCanvas');
    let ctx = canvas.getContext('2d');

    let juego = new Juego(canvas,ctx);  // Inicializa el juego con el ID del canvas


    // Inicia el juego
    window.onload = () => {
        juego.startGame()
    };

    
    juego.canvas.addEventListener('mousedown', (event) => {
        if (juego.xEnLinea != 0) {
            let rect = juego.canvas.getBoundingClientRect();
            let x = event.clientX - rect.left;
            let y = event.clientY - rect.top;
    
            let currentPieces = juego.currentPlayer === 0 ? juego.piecePlayer1 : juego.piecePlayer2;
            
            for (let i = 0; i < currentPieces.length; i++) {
                let piece = currentPieces[i];
                let distance = Math.sqrt((x - piece.x) ** 2 + (y - piece.y) ** 2);
    
                if (distance < juego.radius) {
                    juego.draggedPiece = piece; // Asigna la ficha seleccionada para ser arrastrada
                    currentPieces.splice(i, 1); // Elimina la ficha del array del jugador
                    juego.draw(); // Redibuja para actualizar la vista sin la ficha
                    break;
                }
            }
        }
    });

   juego.canvas.addEventListener('mousemove', (event) => {
      if (juego.draggedPiece) {
            let rect = canvas.getBoundingClientRect();
            juego.draggedPiece.x = event.clientX - rect.left;
            juego.draggedPiece.y = event.clientY - rect.top;

            juego.updateActiveColumn(juego.draggedPiece.x, juego.draggedPiece.y);

            juego.draw(); // Redibujar el canvas con la ficha moviéndose
      }
    });

    juego.canvas.addEventListener('mouseup', (event) => {
        if (juego.draggedPiece) {
            let rect = juego.canvas.getBoundingClientRect();
            let x = event.clientX - rect.left;
            let y = event.clientY - rect.top;
    
            let pieceDropped = false;
    
            juego.activeColumn=null;
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
    
            // Si no se ha colocado la ficha, devolverla a su lugar y al array
            if (!pieceDropped) {          
                juego.draggedPiece.returnPieceToStart(juego.draggedPiece, juego);  // Volver a la posición original
                
                // Insertar la ficha de nuevo en el array del jugador actual
                if (juego.currentPlayer === 0) {
                    juego.piecePlayer1.push(juego.draggedPiece);
                } else {
                    juego.piecePlayer2.push(juego.draggedPiece);
                }
            }
    
            juego.draggedPiece = null; // Reseteamos el arrastre
            juego.draw(); // Redibuja el juego para actualizar la posición de las fichas
        }
    });
    juego.canvas.addEventListener('click', function(event) {
        let rect = juego.canvas.getBoundingClientRect();
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;
        
        let startY = 600;
        let margin = 315;
        // Coordenadas del botón de "Jugar 4 en línea"
        let buttonX = 200;
        
        if(juego.xEnLinea==0){ 
            
            if (y >= startY && y <= startY + juego.buttonHeight) {
                if (x >= buttonX && x <= buttonX + juego.buttonWidth) {
                    juego.xEnLinea=4;
                    juego.startGame(); // Jugar 4 en línea
                }else if (x >= buttonX && x <= buttonX + juego.buttonWidth +margin) {
                    juego.xEnLinea=5;
                    juego.startGame(); // Jugar 5 en línea
                } else if (x >= buttonX && x <= buttonX + juego.buttonWidth +margin*2) {
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


  /*
    //hover al boton
    juego.canvas.addEventListener('mousemove',function(event){
        
        let rect = juego.canvas.getBoundingClientRect();
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;
        
        let startY = 600;
        let margin = 315;
        // Coordenadas del botón de "Jugar 4 en línea"
        let buttonX = 200;
        
        if(juego.xEnLinea==0){ 
            
            if (y >= startY && y <= startY + juego.buttonHeight) {
                if (x >= buttonX && x <= buttonX + juego.buttonWidth) {
                    isHovered=true;
                   juego.drawSingleButton(startY,buttonX,"4 en linea",isHovered)

                }else if (x >= buttonX && x <= buttonX + juego.buttonWidth +margin) {
                    juego.drawSingleButton(startY,buttonX+margin,"5 en linea",true)
                } 
                else if (x >= buttonX && x <= buttonX + juego.buttonWidth +margin*2) {
                    juego.drawSingleButton(startY,buttonX+margin*2,"6 en linea",true)
                }
            }
            
    }
    })*/
});