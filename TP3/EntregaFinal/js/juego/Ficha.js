class Ficha{
    constructor(player, x, y, radius) {
        this.player = player;
        this.x = x;
        this.y = y;
        this.startX=x;
        this.startY=y;
        this.radius=radius;
        this.resaltado=false;
    }

    setResaltado(x){
        this.resaltado=x;
    }

    draw(ctx) {
        ctx.beginPath();        
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.player.color;        
        ctx.fill();
        ctx.closePath();
        if(this.resaltado){
            ctx.strokeStyle = "#28a7e1";
            ctx.lineWidth = 3;
            ctx.stroke();
        }
    }

    animateDrop(piece, targetRow, col,board) {
        const targetY = (targetRow * board.cellSize + board.marginTop)+ board.cellSize / 2
        
        const interval = setInterval(() => {
            piece.y += 10;
            if (piece.y >= targetY) {
                piece.y = targetY;
                clearInterval(interval);
                board.checkForWin(piece, targetRow, col)
            }
            draw();
        }, 20);
    }

    returnPieceToStart(draggedPiece) {
        let frames = 20;  // Número de frames para la animación
        let deltaX = (draggedPiece.startY - draggedPiece.x) / frames;
        let deltaY = (draggedPiece.startY - draggedPiece.y) / frames;
        
        let currentFrame = 0;
    
        function animateReturn() {
            if (currentFrame < frames) {
                draggedPiece.x += deltaX;
                draggedPiece.y += deltaY;
                draw();  // Redibujar el tablero y la ficha
                currentFrame++;
                requestAnimationFrame(animateReturn);  // Continuar animando
            } else {
                // Una vez que termina la animación, devuelve la ficha a su posición original
                draggedPiece.x = draggedPiece.startX;
                draggedPiece.y = draggedPiece.startY;
                draw();
            }
        }
    
        animateReturn();
    }
}