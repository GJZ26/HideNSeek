export class Player {
    x; y; width; heigh; speed; normalized_speed;

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

    constructor(width, heigh, speed=5) {
        this.speed = speed

        // this.normalized_speed = (speed/(Math.sqrt((speed*speed)+(speed*speed))))*speed
        this.normalized_speed = speed/Math.sqrt(2)

        this.width = width;
        this.heigh = heigh;

        this.x = (window.innerWidth / 2) - (this.width / 2);
        this.y = (window.innerHeight / 2) - (this.heigh / 2);

        console.log(speed)
        console.log(this.normalized_speed)
    }


    /**
     * 
     * @param {CanvasRenderingContext2D} ctx 
     */
    draw(ctx) {
        ctx.fillStyle = 'black'
        ctx.fillRect(this.x, this.y, this.width, this.heigh)
    }

    move(key, eventType) {
        let localSpeed = this.speed

        if (this.keys.UP.includes(key.code)) {
            this.goingTo.UP = eventType === 'keydown'
        }

        if (this.keys.DOWN.includes(key.code)) {
            this.goingTo.DOWN = eventType === 'keydown'
        }

        if (this.keys.LEFT.includes(key.code)) {
            this.goingTo.LEFT = eventType === 'keydown'
        }

        if (this.keys.RIGHT.includes(key.code)) {
            this.goingTo.RIGHT = eventType === 'keydown'
        }

        if((this.goingTo.UP || this.goingTo.DOWN)&&(this.goingTo.LEFT || this.goingTo.RIGHT)){
            localSpeed = this.normalized_speed
        }

        if (this.goingTo.UP) this.y -= localSpeed;
        if (this.goingTo.DOWN) this.y += localSpeed;
        if (this.goingTo.LEFT) this.x -= localSpeed;
        if (this.goingTo.RIGHT) this.x += localSpeed;

    }
}