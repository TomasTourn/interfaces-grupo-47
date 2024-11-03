class Tablero {

    constructor(ctx, canvas, xEnLinea, marginTop, marginBottom, marginRight, marginLeft, game) {
        this.ctx = ctx;
        this.canvas= canvas;
        this.xEnLinea = xEnLinea;
        this.game = game;
        this.rows = this.xEnLinea + 2; // Filas según la configuración de X en línea
        this.cols = this.xEnLinea + 3; // Columnas según la configuración de X en línea

        // Márgenes para posicionar el tablero
        this.marginTop = marginTop;
        this.marginBottom = marginBottom;
        this.marginRight = marginRight;
        this.marginLeft = marginLeft;

        this.finishedBoard=false;

        this.cellSize = ((this.canvas.height - this.marginTop - this.marginBottom) / this.rows);

        this.occupiedcells=0;

        // Cargar imagen del tablero
        this.cellImage = new Image();
        this.cellImage.src = "Images/Juego/celda.png"
        
        this.frameImage = new Image();
        this.frameImage.src = "Images/Juego/marco.png"


        this.wolverinGana = new Image();
        this.wolverinGana.src = "Images/Juego/wolverinegana.png"
        this.tiempoAgotado = new Image();
        this.tiempoAgotado.src = "Images/Juego/tiempoagotado.png"
        this.deadpoolgana = new Image();
        this.deadpoolgana.src = "Images/Juego/deadpoolgana.png"

        //radio del circulo
        this.radius = null
         // Inicializamos la matriz del tablero
        this.grid = this.createGrid();
    }

    // Métodos para obtener dimensiones del tablero y las casillas
    getWidth() {
        return this.canvas.width - this.marginRight - this.marginLeft;
    }

    getHeight() {
        return this.canvas.height - this.marginTop - this.marginBottom;
    }

    getCantFil() {
        return this.rows;
    }

    getCantCol() {
        return this.cols;
    }

    getCellSize(){
        return this.cellSize
    }

    
    getCantPiecesBoard(){
        return (this.getCantCol * this.getCantFil) / 2;
    }

    createGrid() {
        let grid = [];
        for (let row = 0; row < this.rows; row++) {
            grid[row] = new Array(this.cols).fill(null);
        }
        return grid;
    }

    draw() {
        // Calculamos el tamaño y la posición de las casillas
        let posX = 0;
        let posY = 0;
        
        this.radius =  this.cellSize / 2 - 11; // Radio de las casillas (agujeros)...-5 es la distancia del agujero al borde de la casilla
        this.ctx.save();

        //dibujamos interior del tablero
        this.ctx.fillStyle = "#4475ae";
        this.ctx.fillRect( this.marginLeft,this.marginTop, this.cellSize*this.cols, this.cellSize*this.rows);

        for (let fila = 0; fila < this.getCantFil(); fila++) {
            for (let columna = 0; columna < this.getCantCol(); columna++) {
                const piece = this.grid[fila][columna];
                if (piece) {
                    piece.draw(this.ctx);  // Dibuja la ficha en la posición correspondiente
                }
            }
        }

        // Dibujamos las casillas del tablero
        for (let fila = 0; fila < this.getCantFil(); fila++) {
            posY = this.marginTop + this.cellSize * fila;
            for (let columna = 0; columna < this.getCantCol(); columna++) {
                posX = this.marginLeft + this.cellSize * columna;

                // Dibujar el fondo del tablero (rectángulo)
                this.ctx.drawImage(
                    this.cellImage,        // Imagen del tablero
                    posX, posY,             // Posición X e Y de la imagen en el canvas
                    this.cellSize,        // Ancho del tablero (ajustado al tamaño del canvas)
                    this.cellSize        // Alto del tablero (ajustado al tamaño del canvas)
                );
                
            }
        }

        this.ctx.drawImage(
            this.frameImage,        // Imagen del tablero
            this.marginLeft-9, this.marginTop-8,             // Posición X e Y de la imagen en el canvas
            this.cellSize*this.cols+20,        // Ancho del tablero (ajustado al tamaño del canvas)
            this.cellSize*this.rows+15        // Alto del tablero (ajustado al tamaño del canvas)
        );


        this.ctx.restore();
    }



    // Coloca una ficha en la columna correspondiente
    dropDisc(col, player) {      
        for (let row = this.rows - 1; row >= 0; row--) {
            if (!this.grid[row][col]) {
                let piece = new Ficha(player, (col * this.cellSize + this.marginLeft)+this.cellSize / 2 , this.cellSize, this.radius);
                this.grid[row][col] = piece;                
                piece.animateDrop(piece, row, col,this, this.game);
                this.occupiedcells++                
                return true;
            }
        }
        return false; // Columna llena
    }


    
    showWinnerAnimation(image) {
        console.log("Empezo animacion winner");
        const animationDuration = 3000; // Duración de la animación en milisegundos
        const startTime = performance.now();
    
        const animate = (time) => {
            const elapsed = time - startTime;
            const alpha = Math.min(elapsed / animationDuration, 1); // Controla la duración de la animación
    
            // Dibuja la imagen del ganador
            const imgWidth = 950; // Ancho de la imagen
            const imgHeight = 950; // Alto de la imagen
            const imgX = (this.canvas.width - imgWidth) / 2; // Centrar horizontalmente
            const imgY = (this.canvas.height - imgHeight) / 2; // Centrar verticalmente
    
            this.ctx.globalAlpha = alpha; // Aplicar la opacidad
            this.ctx.drawImage(image, imgX, imgY, imgWidth, imgHeight); // Dibuja la imagen del ganador
    
            if (alpha < 1) {
                requestAnimationFrame(animate); // Continúa la animación
            } else {
                this.ctx.globalAlpha = 1; // Resetea la opacidad para futuras dibujadas
            }
        };
    
        requestAnimationFrame(animate);
    }
    
    // Verificar si hay 4 fichas en línea
    checkForWin(piece, row, col) {
        let winner = this.checkDirection(piece, row, col, 1, 0) || // Horizontal
                     this.checkDirection(piece, row, col, 0, 1) || // Vertical
                     this.checkDirection(piece, row, col, 1, 1) || // Diagonal \
                     this.checkDirection(piece, row, col, 1, -1);  // Diagonal /
    
        if (winner) {
            console.log(piece.getPlayerName());
            if (piece.getPlayerName() == "Deadpool") {
                this.deadpoolgana.onload = () => {
                    this.showWinnerAnimation(this.deadpoolgana);
                    this.finishedBoard = true;
                };
                // También se debe establecer la imagen aquí en caso de que ya esté cargada
                if (this.deadpoolgana.complete) {
                    this.showWinnerAnimation(this.deadpoolgana);
                    this.finishedBoard = true;
                }
            } else {
                this.wolverinGana.onload = () => {
                    this.showWinnerAnimation(this.wolverinGana);
                    this.finishedBoard = true;
                };
                // También se debe establecer la imagen aquí en caso de que ya esté cargada
                if (this.wolverinGana.complete) {
                    this.showWinnerAnimation(this.wolverinGana);
                    this.finishedBoard = true;
                }
            }
        } else if (this.occupiedcells == this.rows * this.cols) {
            this.showWinnerAnimation(this.empate);
            this.finishedBoard = true;
        }
    }
    
    // Verificar si hay 4 fichas consecutivas en una dirección
    checkDirection(piece, row, col, rowDir, colDir) {
        let count = 1; // Contar la ficha actual

        // Verificar en una dirección (hacia adelante)
        count += this.countPieces(piece, row, col, rowDir, colDir);

        // Verificar en la dirección opuesta (hacia atrás)
        count += this.countPieces(piece, row, col, -rowDir, -colDir);

        return count >= this.xEnLinea; // Si hay 4 o más fichas consecutivas
    }

    // Cuenta cuántas fichas hay consecutivas en una dirección
    countPieces(piece, row, col, rowDir, colDir) {
        let count = 0;
        let newRow = row + rowDir;
        let newCol = col + colDir;

        while (newRow >= 0 && newRow < this.rows && newCol >= 0 && newCol < this.cols && this.grid[newRow][newCol] && this.grid[newRow][newCol].player === piece.player) {
            count++;
            newRow += rowDir;
            newCol += colDir;
        }

        return count;
    }
}