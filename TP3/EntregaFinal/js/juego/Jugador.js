class Jugador{
    constructor(name,image) {
        this.name = name;
        this.nextPiece=null;
        this.image=image;
    }

    getNextPiece(){
        return this.nextPiece;
    }

    setNextPiece(piece){
        this.nextPiece = piece
    }
}