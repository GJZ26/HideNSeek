export class Bullet {
    localContext; id; x; y; angle; speed = 9;
    initial_x; initial_y;
    width = 10; alived;

    /**
     * 
     * @param {CanvasRenderingContext2D} context 
     * @param {*} id 
     */
    constructor(context, id, position, angle) {
        this.localContext = context
        this.x = position.x
        this.y = position.y

        this.initial_x = position.x
        this.initial_y = position.y

        this.angle = angle
        this.id = id
        this.alived = true
    }

    draw() {

        if (this.initial_x - this.x > 1000 ||
            this.initial_y - this.y > 1000 ||
            this.initial_x - this.x < -1000 ||
            this.initial_y - this.y < -1000) {
            this.alived = false;
        }

        this.y = this.y + this.speed * Math.cos(this.angle - 1.5708 * 2)
        this.x = this.x + this.speed * Math.sin(this.angle)
        this.localContext.beginPath()
        this.localContext.fillStyle = "#8D64D6";
        this.localContext.arc(this.x, this.y, this.width, 0, 2 * Math.PI)
        this.localContext.fill()
        this.localContext.closePath()
    }
}