export class Obstacle {
    x; y; width; height; bodyColor; x_center; y_center
    /**
     * @type {CanvasRenderingContext2D}
     */
    localContext;
    collider;

    topLeftCorner;
    topRightCorner;
    bottomLeftCorner;
    bottomRightCorner;

    constructor(x = 0, y = 0, width = 10, height = 10) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.bodyColor = "gray"
        this.x_center = this.x + this.width / 2
        this.y_center = this.y + this.height / 2
        this.topLeftCorner = { x: this.x, y: this.y }
        this.topRightCorner = { x: this.x + this.width, y: this.y }
        this.bottomLeftCorner = { x: this.x, y: this.y + this.height }
        this.bottomRightCorner = { x: this.x + this.width, y: this.y + this.height }
        this.collider = new Path2D();
        this.collider.rect(this.x, this.y, this.width, this.height);
    }

    render(x, y, scale, render = true) {
        const x_render = x
        const y_render = y

        const width_render = this.width * scale
        const heigh_render = this.height * scale

        if (render) {
            return;
        }

        this.localContext.save()
        this.localContext.fillStyle = this.bodyColor
        this.localContext.fillRect(x_render, y_render, width_render, heigh_render)
        this.localContext.restore()

    }

    setContext(context) {
        this.localContext = context;
    }
}