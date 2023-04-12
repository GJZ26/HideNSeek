import { Bullet } from "./Bullet.js";

export class Player {
    x; y; width; heigh; speed; normalized_speed; angle = 0;
    x_center; y_center; Localcontext; bullets = {}
    max_bullet = 3;

    // Devs Attribute
    bodyColor; eyeColor

    goingTo = {
        UP: false,
        DOWN: false
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
        ]
    }

    constructor(canvas, width, heigh, speed = 8, bc = "black", ec = "red") {
        this.Localcontext = canvas.getContext('2d');
        this.speed = speed

        this.normalized_speed = speed / Math.sqrt(2)

        this.width = width;
        this.heigh = heigh;

        this.x = (window.innerWidth / 2) - (this.width / 2);
        this.y = (window.innerHeight / 2) - (this.heigh / 2);

        this.x_center = this.x + this.width / 2
        this.y_center = this.y + this.heigh / 2

        // Dev attributes
        this.bodyColor = bc;
        this.eyeColor = ec;
    }


    /**
     * @deprecated Use the render method instead
     * @param {CanvasRenderingContext2D} ctx 
    */
    draw() {

        this.x_center = this.x + this.width / 2
        this.y_center = this.y + this.heigh / 2

        for (const i in this.bullets) {
            this.bullets[i].draw()
            if (!this.bullets[i].alived) {
                delete this.bullets[i]
            }
        }

        this.Localcontext.save()

        this.Localcontext.translate(this.x_center, this.y_center)
        this.Localcontext.rotate(this.angle)
        this.Localcontext.translate(-(this.x_center), -(this.y_center))

        this.Localcontext.fillStyle = this.bodyColor
        this.Localcontext.fillRect(this.x, this.y, this.width, this.heigh)

        // ojitos
        this.Localcontext.fillStyle = this.eyeColor
        this.Localcontext.fillRect(this.x + 20, this.y, 10, 10);
        this.Localcontext.fillRect(this.x + this.width - 30, this.y, 10, 10);

        this.Localcontext.restore()

    }

    render(x_render, y_render, render = true) {
        this.x_center = this.x + this.width / 2
        this.y_center = this.y + this.heigh / 2

        const x_center_render = x_render + this.width / 2
        const y_center_render = y_render + this.heigh / 2
        
        for (const i in this.bullets) {
            this.bullets[i].render(x_render - this.x, y_render - this.y)
            if (!this.bullets[i].alived) {
                delete this.bullets[i]
            }
        }
        
        if (render) {
            return;
        }

        this.Localcontext.save()

        this.Localcontext.translate(x_center_render, y_center_render)
        this.Localcontext.rotate(this.angle)
        this.Localcontext.translate(-(x_center_render), -(y_center_render))

        this.Localcontext.fillStyle = this.bodyColor
        this.Localcontext.fillRect(x_render, y_render, this.width, this.heigh)

        // ojitos
        this.Localcontext.fillStyle = this.eyeColor
        this.Localcontext.fillRect(x_render + 20, y_render, 10, 10);
        this.Localcontext.fillRect(x_render + this.width - 30, y_render, 10, 10);

        this.Localcontext.restore()

    }

    move(key, eventType) {

        if (this.keys.UP.includes(key.code)) {
            this.goingTo.UP = eventType === 'keydown'
        }

        if (this.keys.DOWN.includes(key.code)) {
            this.goingTo.DOWN = eventType === 'keydown'
        }

        if (this.goingTo.UP) {

            this.y = this.y + this.speed * Math.cos(this.angle - 2 * (90 * Math.PI / 180))
            this.x = this.x + this.speed * Math.sin(this.angle)
        }

        if (this.goingTo.DOWN) {

            this.y = this.y - this.speed * Math.cos(this.angle - 2 * (90 * Math.PI / 180))
            this.x = this.x - this.speed * Math.sin(this.angle)

        }
    }

    turn(x, y) {
        this.angle = Math.atan2(y - (this.y + this.heigh / 2), x - (this.x + this.width / 2)) + 1.5708
    }

    shoot(x, y) {
        if (Object.keys(this.bullets).length >= this.max_bullet) {
            return
        }
        this.angle = Math.atan2(y - (this.y + this.heigh / 2), x - (this.x + this.width / 2)) + 1.5708
        this.bullets[performance.now()] = new Bullet(this.Localcontext, performance.now(), { x: this.x_center, y: this.y_center }, this.angle,this.bodyColor)
    }

}