class Ficha{
    constructor(player, x, y, radius) {
        this.player = player;
        this.x = x;
        this.y = y;
        this.startX=x;
        this.startY=y;
        this.radius=radius;
        this.resaltado=false;
        this.imageDeadpool=new Image();
        this.imageDeadpool.src="Images/Juego/deadpoolgrabbingface.jpg"
        this.imageWolverine=new Image();
        this.imageWolverine.src="Images/Juego/deadpoolgrabbingface.jpg"

    }

    setResaltado(x){
        this.resaltado=x;
    }

    draw(ctx) {
        if (!this.player.image.complete) {
            // Si la imagen aún no está cargada, espera y vuelve a intentar después
            this.player.image.onload = () => this.draw(ctx);
            return;
        }
        ctx.save()
        ctx.beginPath();        
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip()
        ctx.drawImage(this.player.image,this.x-this.radius,this.y-this.radius,this.radius*2,this.radius*2);
        //ctx.fillStyle = this.player.color;        
        ctx.restore();
        
    }

    animateDrop(piece, targetRow, col,board,game) {
        const targetY = (targetRow * board.cellSize + board.marginTop)+ board.cellSize / 2
        
        const interval = setInterval(() => {
            piece.y += 10;
            if (piece.y >= targetY) {
                piece.y = targetY;
                clearInterval(interval);
                board.checkForWin(piece, targetRow, col)
            }
            game.draw();
        }, 20);
    }

    returnPieceToStart(draggedPiece, game) {

        draggedPiece.x = draggedPiece.startX;
        draggedPiece.y = draggedPiece.startY;

        game.draw();

    }
}