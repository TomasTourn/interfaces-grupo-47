class Juego{
    constructor(canvas,ctx) {

        this.canvas = canvas;
        this.ctx = ctx;

        this.board = null;
       

        //Fondo juego

        this.fondoImage = new Image();
        this.fondoImage.src = "Images/Juego/fondo.png" 

        this.testBg1Image = new Image();
        this.testBg1Image.src = "Images/Juego/test-bg.png" 

        this.testBg2Image = new Image();
        this.testBg2Image.src = "Images/Juego/test-bg2.png" 

        //Turnos

        this.turnoWolverine = new Image();
        this.turnoWolverine.src = "Images/Juego/turnoWolverine.png"

        this.turnoDeadpool = new Image();
        this.turnoDeadpool.src = "Images/Juego/turnoDeadpool.png"

        this.redButton= new Image();
        this.redButton.src="Images/Juego/redbutton.png";

        this.yellowButton= new Image();
        this.yellowButton.src="Images/Juego/yellowbutton.png";


        this.imageDeadpool= new Image();
        this.imageDeadpool.src="Images/Juego/deadpoolgrabbingface.jpg"

        this.imageWolverine= new Image();
        this.imageWolverine.src="Images/Juego/wolverine.jpg"


        //efecto
        this.effectImageD = new Image();  
        this.effectImageD.src = "Images/Juego/efectoD.png";

        this.effectImageW= new Image();  
        this.effectImageW.src = "Images/Juego/efectoW.png";

        this.activeColumn = null; // Columna actual sobre la que está la ficha

        this.players = [new Jugador('Deadpool',this.imageDeadpool,this.effectImageD), new Jugador('Wolverine',this.imageWolverine, this.effectImageW)]; 

        this.currentPlayer = 0;

        this.xEnLinea =0;

        this.draggedPiece = null; // Ficha que se está arrastrando

        this.radius = null;// Tamaño de las fichas que se mostrarán arriba

        //botones
        
 
        this.buttons=[]
        this.initButtons();

        this.isHovering = false; // Estado del hover
        this.hoveredButton = null; // Botón actualmente en hover
       
  
        this.buttonWidth = 300;
        this.buttonHeight = 60;

        this.buttonBackSize = 30;

        this.timeLeft = 300;
        this.timerInterval = null;

        this.imagesToLoad = [
            this.fondoImage, this.testBg1Image, this.testBg2Image,
            this.turnoWolverine, this.turnoDeadpool,
            this.yellowButton, this.redButton,
            this.imageDeadpool, this.imageWolverine, this.effectImageD,this.effectImageW
        ];
        this.loadedImagesCount = 0;
        this.setupImages();

        this.canvas.addEventListener("mousemove", (event) => this.handleHover(event));
        this.canvas.addEventListener("click", (event) => this.handleHover(event));
        

    }

    setupImages() {
        this.imagesToLoad.forEach(image => {
            image.onload = () => {
                this.loadedImagesCount++;
                if (this.loadedImagesCount === this.imagesToLoad.length) {
                    this.startGame();
                }
            };
            image.onerror = () => {
                console.error("Failed to load image:", image.src);
            };
        });
    }
    
    

    // Dibuja el tablero y las fichas
    draw() {
        if(this.xEnLinea!=0){
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.fillStyle = '#ffffff'; // Color azul para el fondo del tablero
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

            this.ctx.drawImage(
                this.fondoImage,        // Imagen del tablero
                0, 0,             // Posición X e Y de la imagen en el canvas
                this.canvas.width,        // Ancho del tablero (ajustado al tamaño del canvas)
                this.canvas.height+30     // Alto del tablero (ajustado al tamaño del canvas)
            );

            this.ctx.drawImage(
                this.testBg1Image,        // Imagen del tablero
                235, 320,             // Posición X e Y de la imagen en el canvas
                136,        // Ancho del tablero (ajustado al tamaño del canvas)
                415      // Alto del tablero (ajustado al tamaño del canvas)
            );
                
            this.ctx.drawImage(
                this.testBg2Image,        // Imagen del tablero
                ((this.board.cellSize*this.board.cols)+this.board.marginLeft)-37, 320,             // Posición X e Y de la imagen en el canvas
                136,        // Ancho del tablero (ajustado al tamaño del canvas)
                415    // Alto del tablero (ajustado al tamaño del canvas)
            );
            

            this.board.draw(this.ctx);
            this.displayTurn(); 
            this.drawPlayerPieces();

            this.drawEffect();

       

            // Dibuja el botón de reiniciar
            let restartButtonX = this.canvas.width - this.buttonWidth - 20;
            let restartButtonY = this.canvas.height - this.buttonHeight - 20;
            this.ctx.fillStyle = "#FF0000"; // Rojo para reiniciar
            this.ctx.fillRect(restartButtonX, restartButtonY, this.buttonWidth, this.buttonHeight);
            this.ctx.fillStyle = "#FFFFFF";
            this.ctx.fillText("Reiniciar", restartButtonX + this.buttonWidth / 2, restartButtonY + this.buttonHeight / 2);

            //dibuja boton back
            let backButtonX = 20;
            let backButtonY = 20;
            this.ctx.fillStyle = "#FF5733"; // Naranja para el botón
            this.ctx.fillRect(backButtonX, backButtonY, this.buttonBackSize, this.buttonBackSize);
            this.ctx.fillStyle = "#FFFFFF";
            this.ctx.fillText("X", backButtonX + this.buttonBackSize / 2, backButtonY + this.buttonBackSize / 2); 

            if (this.draggedPiece) {
                this.draggedPiece.draw(this.ctx);
            }

            this.drawTimer();
        }else{
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.drawButtons();      
        }
        
        if(this.board.ganador){
            this.board.ganador=false;
            this.startGame();
        }
    }

    startGame() {
        
        this.board = new Tablero(
            this.ctx,          // Contexto del canvas
            this.canvas,
            this.xEnLinea,     // Configuración de x en línea
            110,               // marginTop
            75,                // marginBottom
            0,                 // marginRight
            this.canvas.width / 4, // marginLeft
            this
        );
        this.currentPlayer = 0;  // Reiniciamos el turno al primer jugador
        this.radius = this.board.getCellSize() / 2 - 12;
        
            this.draw();

        if (this.xEnLinea != 0) {
            this.startTimer(); // Iniciar el temporizador si es necesario
        }
    }

    

    drawPlayerPieces() {
        this.piecePlayer1 = []; 
        this.piecePlayer2 = [];
        const spacingY = 20;

        let totalFichas= Math.floor((this.board.cols * this.board.rows)/2);

        this.players.forEach((player, index) => {
            let x = index === 0 ? 200 : 1150;
            let y = 130; 

            for (let i = 0; i < totalFichas; i++) {
                let piece = new Ficha(player, x, y, this.radius);
                if (index === 0) {
                    this.piecePlayer1.push(piece);
                } else {
                    this.piecePlayer2.push(piece);
                }
                y += spacingY; 
            }
        });

        this.piecePlayer1.forEach(piece => piece.draw(this.ctx, this.board.cellSize));
        this.piecePlayer2.forEach(piece => piece.draw(this.ctx, this.board.cellSize));
    }

    switchTurns() {
        this.currentPlayer = (this.currentPlayer + 1) % 2;
    }

    displayTurn() {
        let posX = 460;     // Posición horizontal centrada
        let posY = 0; // Posición vertical entre el tablero y las fichas
        let turno=null;

        if(this.currentPlayer==0){
            turno = this.turnoDeadpool
        }else{
            turno = this.turnoWolverine
        }
        
        this.ctx.drawImage(
            turno,        
            posX, posY,             
            391,        
            70    
        );
    }





    drawButtons() {
        
        this.ctx.drawImage(
            this.fondoImage,        // Imagen del tablero
            0, 0,             // Posición X e Y de la imagen en el canvas
            this.canvas.width,        // Ancho del tablero (ajustado al tamaño del canvas)
            this.canvas.height+30     // Alto del tablero (ajustado al tamaño del canvas)
        );

        // Configuraciones básicas de los botones    
        let startY = 600;  // Margen superior para los botones
        let startX = 200;  //inicio en x de los botones
    
        for (const btn of this.buttons) {
            btn.drawSingleButton(); // Dibuja el botón
        }

        // Colores y estilos
        this.ctx.fillStyle = "#4CAF50"; // Verde para el botón
        this.ctx.font = "20px Arial";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
    }

    drawSingleButton(yPosition,xPosition, buttonText,isHovered=false) {

    
        if(isHovered==true){

            this.ctx.drawImage(
                this.redButton,
                xPosition, // X posición para centrar la imagen
                yPosition,                                   // Y posición
                this.buttonWidth,                            // Ancho de la imagen
                this.buttonHeight                            // Alto de la imagen
            );
        }else{
            this.ctx.drawImage(
                this.yellowButton,
                xPosition, // X posición para centrar la imagen
                yPosition,                                   // Y posición
                this.buttonWidth,                            // Ancho de la imagen
                this.buttonHeight                            // Alto de la imagen
            );
        }

    
          // Dibuja el texto sobre la imagen
          this.ctx.fillStyle = "#000000";                 // Color del texto
          this.ctx.font = "20px 'Dekko', cursive";        // Fuente personalizada
          this.ctx.textAlign = "center";
          this.ctx.textBaseline = "middle";
            this.ctx.fillText(buttonText, xPosition+this.buttonWidth/2, yPosition + this.buttonHeight / 2);
    }

    drawEffect() {
        for (let col = 0; col < this.board.cols; col++) {
            
            if(col === this.activeColumn){
                this.ctx.drawImage(
                    this.players[this.currentPlayer].effect, 
                    col * this.board.cellSize + this.board.marginLeft+5,
                    this.board.marginTop-this.board.cellSize,
                    this.board.cellSize-10,
                    this.board.cellSize);
            }
        }
    }

    updateActiveColumn(mouseX,mouseY) {
        
        // Calcula la columna en función de la posición del mouse y el tamaño de la celda
        this.activeColumn = Math.floor((mouseX - this.board.marginLeft) / this.board.cellSize);
    
        // Asegura que la columna esté dentro de los límites del tablero
        if (this.activeColumn < 0 || this.activeColumn >= this.board.cols 
            || mouseY > this.board.marginTop || mouseY < 35 ) {
            this.activeColumn = null; // Fuera de los límites
        }
        // Redibuja el canvas para actualizar las flechas
        this.draw();

    }

    // Temporizador
    drawTimer() {
        this.ctx.save(); // Guarda el estado actual del contexto

        this.ctx.font = "bold 60px arial"; // Establecer estilo, tamaño y fuente
        this.ctx.fillStyle = "#FF0000";
        
        this.ctx.shadowColor = "rgba(0, 0, 0, 0.5)";  // Color de la sombra
        this.ctx.shadowOffsetX = 3;                   // Desplazamiento de la sombra en X
        this.ctx.shadowOffsetY = 3;                   // Desplazamiento de la sombra en Y
        this.ctx.shadowBlur = 1;                      // Nivel de desenfoque de la sombra
            
        this.ctx.fillText(this.timeLeft, this.canvas.width-90, 50); 

        this.ctx.restore(); // Restaura el estado original del contexto
    }

    startTimer() {
        clearInterval(this.timerInterval); // Limpia el intervalo anterior
        this.timeLeft = 300; // Resetea el tiempo a 60 segundos
        
        this.timerInterval = setInterval(() => {
            this.timeLeft--;
            this.draw(); // Redibuja el canvas, incluyendo el temporizador actualizado

            if (this.timeLeft <= 0) {
                clearInterval(this.timerInterval);
                alert('Tiempo agotado. Empate.');
                this.startGame();
            }
        }, 1000);
    }



    handleHover(event) {
    
        
        if(this.xEnLinea==0){

            let rect = this.canvas.getBoundingClientRect();
            let x = event.clientX - rect.left;
            let y = event.clientY - rect.top;
    
           for (const btn of this.buttons) {
      
            if( btn.isCursorOver(x,y)){
                if(event.type=="mousemove"){
                    console.log("moviendo")
                }

                if(event.type==="click"){
                    console.log(btn.getCant())
                    console.log("me clickeaste!!")
                    this.xEnLinea=btn.getCant();
                        this.startGame()
            }
            }
    
            }
   
        
        }
       
        
    }
     


    initButtons(){
        let width =300; // Ajusta el tamaño del botón
        let height = 60;

            for (let i = 0; i < 4; i++) {
                const x = 60 +(i*width*1.03); // Posición x
                console.log(x)
                const y = 600 ; // Posición y
                const btn=new button(this.ctx,x, y,width,height,i+4);
                this.buttons.push(btn);
            }
    }

}



