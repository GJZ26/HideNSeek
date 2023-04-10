export class Scene {
    canvas;
    id=0;
    context;
    entities = {};
    fontSize=15;

    /**
     * 
     * @param {HTMLCanvasElement} canvas 
     */
    constructor(canvas) {
        this.canvas = canvas
        this.context = this.canvas.getContext('2d');
    }

    config(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
    }

    add(element) {
        this.entities[this.id++] = element;
    }

    draw() {
        for (const i in this.entities) {
            this.entities[i].draw()
        }
    }

    write(text, x=0, y=this.fontSize, color = "black"){
        
        this.context.fillStyle = "white"
        this.context.globalAlpha = 0.3
        this.context.font = `${this.fontSize}px Arial`

        this.context.fillRect(x-3,y-this.fontSize,this.context.measureText(text).width + 5,this.fontSize + 5);
        

        this.context.globalAlpha = 1
        this.context.fillStyle = color;
        this.context.fillText(text,x,y);
    }

    clear(){
        this.context.clearRect(0,0,this.canvas.width,this.canvas.height)
    }

}
