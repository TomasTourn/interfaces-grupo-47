class button {
    constructor({ctx,x,y,width,height,text}){
        this.ctx=ctx;
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
        this.text=text;
        this.image=new Image();
        this.image.src="Images/Juego/redbutton.png"
    }


    drawSingleButton() {
            console.log("dfsf")
            this.ctx.drawImage(
                this.image,
                this.x, // X posición para centrar la imagen
                this.y,                                   // Y posición
                this.width,                            // Ancho de la imagen
                this.height                            // Alto de la imagen
            );
  

    
          // Dibuja el texto sobre la imagen
          this.ctx.fillStyle = "#000000";                 // Color del texto
          this.ctx.font = "20px 'Dekko', cursive";        // Fuente personalizada
          this.ctx.textAlign = "center";
          this.ctx.textBaseline = "middle";
            this.ctx.fillText(this.text, this.x+ this.width/2, this.y + this.height / 2);
    }



}