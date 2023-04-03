export class Player {
    x; y; width; heigh; speed; normalized_speed; angle;
    x_center; y_center;

    cursorPosition = {
        x: 0,
        y: 0
    }

    goingTo = {
        UP: false,
        DOWN: false,
        LEFT: false,
        RIGHT: false
    }

    keys = {
        UP: [
            "KeyW",
            "ArrowUp",
            "Numpad8"
        ],
        DOWN: [
            "KeyS",
            "ArrowDown",
            "Numpad2"
        ],
        LEFT: [
            "KeyA",
            "ArrowLeft",
            "Numpad4"
        ],
        RIGHT: [
            "KeyD",
            "ArrowRight",
            "Numpad6"
        ]
    }

    constructor(width, heigh, speed = 8) {
        this.speed = speed

        // this.normalized_speed = (speed/(Math.sqrt((speed*speed)+(speed*speed))))*speed
        this.normalized_speed = speed / Math.sqrt(2)

        this.width = width;
        this.heigh = heigh;

        this.x = (window.innerWidth / 2) - (this.width / 2);
        this.y = (window.innerHeight / 2) - (this.heigh / 2);

        this.x_center = this.x + this.width / 2
        this.y_center = this.y + this.heigh / 2

    }


    /**
     * 
     * @param {CanvasRenderingContext2D} ctx 
    */
    draw(ctx) {

        ctx.save()

        ctx.translate(this.x_center, this.y_center)
        ctx.rotate(this.angle)
        ctx.translate(-(this.x_center), -(this.y_center))

        ctx.fillStyle = "#3E3E3E"
        ctx.fillRect(this.x, this.y, this.width, this.heigh)

        // ojitos
        ctx.fillStyle = '#F88257'
        ctx.fillRect(this.x + 20, this.y - 10, 10, 10);
        ctx.fillRect(this.x + this.width - 30, this.y - 10, 10, 10);

        ctx.restore()
    }

    move(key, eventType) {
        this.x_center = this.x + this.width / 2
        this.y_center = this.y + this.heigh / 2

        if (this.keys.UP.includes(key.code)) {
            this.goingTo.UP = eventType === 'keydown'
        }

        if (this.keys.DOWN.includes(key.code)) {
            this.goingTo.DOWN = eventType === 'keydown'
        }

        if (this.goingTo.UP) {

            this.y = this.y + this.speed * Math.cos(this.angle - 1.5708 * 2)
            this.x = this.x + this.speed * Math.sin(this.angle)
        }

        if(this.goingTo.DOWN){

            this.y = this.y - this.speed * Math.cos(this.angle - 1.5708 * 2)
            this.x = this.x - this.speed * Math.sin(this.angle)

        }
    }

    turn(x, y) {
        this.cursorPosition.x = x;
        this.cursorPosition.y = y
        this.angle = Math.atan2(y - (this.y + this.heigh / 2), x - (this.x + this.width / 2)) + 1.5708
    }

}