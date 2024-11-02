class BotonFicha extends button{

    constructor(ctx,x,y,width,height,cant,radius,image){
            super(ctx,x,y,width,height,cant);
            this.radius=radius;
            this.imageDefault=image;
            this.clicked=false;
    }

    drawSingleButton() {
        let actualImage = this.imageDefault;
        
        if (this.hovered) {
           if(this.clicked){
            console.log("clikkkkkk")
                        // Set shadow properties to create a glow effect
              this.ctx.shadowBlur = 8; // Adjust this value for the intensity of the glow
              this.ctx.shadowColor = 'rgba(0, 255, 255, 0.7)'; // Set glow color (white in this case)
              this.ctx.shadowOffsetX = 0; // No horizontal offset
              this.ctx.shadowOffsetY = 0; 
           }
// No vertical offset
        } else {
            // Reset shadow properties
            this.ctx.shadowBlur = 0;
            this.ctx.shadowColor = 'rgba(0, 0, 0, 0)';
            this.setClicked(false)
        }
    
        // Draw the button image
        this.ctx.drawImage(
            actualImage,
            this.x, // X position
            this.y, // Y position
            this.width, // Width of the image
            this.height // Height of the image
        );
        
        // Reset shadow settings after drawing
        this.ctx.shadowBlur = 0;
        this.ctx.shadowColor = 'rgba(0, 0, 0, 0)';
    }
    

    setClicked(boolean){
        this.clicked=boolean;
    }
    

}