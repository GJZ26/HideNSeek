export class Scene {
    canvas;
    context;
    element = {};
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
        this.element[Date.now()] = element
    }

    draw() {
        for (const i in this.element) {
            this.element[i].draw()
        }
    }

    write(text, x=0, y=this.fontSize, color = "black"){
        this.context.fillStyle = color;
        this.context.font = `${this.fontSize}px Arial`
        this.context.fillText(text,x,y);
    }

    clear(){
        this.context.clearRect(0,0,this.canvas.width,this.canvas.height)
    }

}
