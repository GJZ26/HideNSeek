import { Bullet } from "./Bullet.js";

export class Player {
    x; y; width; heigh; speed; normalized_speed; angle = 0;
    x_center; y_center;
    /**
     * @type {CanvasRenderingContext2D}
     */
    Localcontext;
    bullets = {}
    max_bullet = 3;

    // Devs Attribute
    bodyColor; eyeColor
    role;

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

    allowedEvents = [
        ""
    ]

    constructor(canvas, width, heigh, speed = 8, bc = "black", ec = "red") {
        this.Localcontext = canvas.getContext('2d');
        this.speed = speed <= 0 ? 8 : speed

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


        this.role = 0
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

    render(x, y, scale, render = true) {
        this.x_center = this.x + this.width / 2
        this.y_center = this.y + this.heigh / 2

        const x_render = x
        const y_render = y

        const x_center_render = x_render + this.width * scale / 2;
        const y_center_render = y_render + this.heigh * scale / 2;

        const width_render = this.width * scale
        const heigh_render = this.heigh * scale


        for (const i in this.bullets) {
            this.bullets[i].render(x_center_render, y_center_render, scale)
            if (!this.bullets[i].alived) {
                delete this.bullets[i]
            }
        }

        if (this.goingTo.UP) {
            this.goto()
        }

        if (render) {
            return;
        }

        this.Localcontext.save()

        this.Localcontext.translate(x_center_render, y_center_render)
        this.Localcontext.rotate(this.angle)
        this.Localcontext.translate(-(x_center_render), -(y_center_render))

        this.Localcontext.fillStyle = this.bodyColor
        this.Localcontext.fillRect(x_render, y_render, width_render, heigh_render)

        // ojitos
        this.Localcontext.fillStyle = this.eyeColor
        this.Localcontext.fillRect(x_render + 20 * scale, y_render, 10 * scale, 10 * scale);
        this.Localcontext.fillRect(x_render + width_render - 30 * scale, y_render, 10 * scale, 10 * scale);

        this.Localcontext.restore()
    }

    move(key) {

        if (["keydown", "keyup"].includes(key.type)) {
            this.goingTo.UP = key.type === "keydown"
        }
    }

    turn(...args) {
        if (args.length === 2)
            this.angle = Math.atan2(args[1] - (this.y + this.heigh / 2), args[0] - (this.x + this.width / 2)) + 1.5708
        else
            this.angle = args[0]
    }

    shoot(...args) {
        if (Object.keys(this.bullets).length >= this.max_bullet) {
            return
        }
        this.turn(args)
        this.bullets[performance.now()] = new Bullet(this.Localcontext, performance.now(), { x: this.x_center, y: this.y_center }, this.angle, this.bodyColor)
    }

    /**
     * 
     * @param {Number} role - Role of this player: 0 - Seeker; 1 - Hidder
     */
    setRole(role) {
        this.role = role;
    }

    goto(...args) {

        if (args.length === 2) {
            if (Math.abs(args[0] - this.x) <= this.speed && Math.abs(args[1] - this.y) <= this.speed) return;
            this.turn(args[0], args[1]);
        }

        this.y = this.y + this.speed * Math.cos(this.angle - 2 * (90 * Math.PI / 180))
        this.x = this.x + this.speed * Math.sin(this.angle)

    }

}