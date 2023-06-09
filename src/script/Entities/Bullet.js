export class Bullet {
    localContext; id; x; y; angle; speed = 9;
    initial_x; initial_y;
    distance; max_distance
    width = 10; alived;
    color;

    /**
     * 
     * @param {CanvasRenderingContext2D} context 
     * @param {*} id 
     */
    constructor(context, id, position, angle, color = "red", max_distance = 1000) {
        this.localContext = context
        this.x = position.x
        this.y = position.y


        this.initial_x = position.x
        this.initial_y = position.y

        this.angle = angle
        this.id = id
        this.alived = true

        this.color = color;

        this.max_distance = max_distance
    }

    /**
     * @deprecated Use the render method instead
     */
    draw() {
        // this.distance = Math.sqrt(Math.pow((this.initial_x - this.x), 2) + Math.pow((this.initial_y - this.y), 2))
        let opacity = this.distance > this.max_distance ? 0 : 1 - (this.distance / this.max_distance)

        // if (this.distance > this.max_distance) {
        //     this.alived = false;
        // }

        this.localContext.beginPath()
        this.localContext.globalAlpha = opacity
        this.localContext.fillStyle = this.color;
        this.localContext.arc(this.x, this.y, this.width, 0, 2 * Math.PI)
        this.localContext.fill()
        this.localContext.closePath()
        this.localContext.globalAlpha = 1
    }

    render(x_render, y_render, scale) {
        this.distance = Math.sqrt(Math.pow((this.initial_x - this.x), 2) + Math.pow((this.initial_y - this.y), 2))
        let opacity = this.distance > this.max_distance ? 0 : 1 - (this.distance / this.max_distance)

        if (this.distance >= this.max_distance) {
            this.alived = false;
        }

        this.localContext.beginPath()
        this.localContext.globalAlpha = opacity
        this.localContext.fillStyle = this.color;
        this.localContext.arc(x_render + (this.x - this.initial_x) * scale, y_render + (this.y - this.initial_y) * scale, this.width * scale, 0, 2 * Math.PI)
        this.localContext.fill()
        this.localContext.closePath()
        this.localContext.globalAlpha = 1;

        this.y = this.y + this.speed * Math.cos(this.angle - 1.5708 * 2)
        this.x = this.x + this.speed * Math.sin(this.angle)
    }

}