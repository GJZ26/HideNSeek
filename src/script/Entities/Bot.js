import { Player } from "./Player.js";

export class Bot extends Player {

    /**
     * 0 - Iddle
     * 1 - Seeking
     * 2 - Hidding
     */
    status = 0;

    colors = [
        "FFA476",
        "FFDE76",
        "76DAFF",
        "9176FF",
        "D576FF",
        "FF76E6",
        "FF7699",
        "FF7676"
    ]

    // Ran per frames
    rotationSpeed = 0.1;
    rotationTarget = this.angle;

    satisfiedRotationTarget = true;

    constructor(canvas, width, heigh, speed = 8) {
        super(canvas, width, heigh, speed);
        this.bodyColor = `#${this.colors[this.#getRandomBetween(0, this.colors.length - 1, false)]}`;
        this.eyeColor = "#FF5500";
        // this.angle = this.#randomRotationMovements()
    }

    // render(x, y, scale, render = true) {
    //     super.render();
    //     this.x_center = this.x + this.width / 2
    //     this.y_center = this.y + this.heigh / 2

    //     const x_render = x
    //     const y_render = y

    //     const x_center_render = x_render + this.width * scale / 2;
    //     const y_center_render = y_render + this.heigh * scale / 2;

    //     const width_render = this.width * scale
    //     const heigh_render = this.heigh * scale


    //     for (const i in this.bullets) {
    //         this.bullets[i].render(x_center_render, y_center_render, scale)
    //         if (!this.bullets[i].alived) {
    //             delete this.bullets[i]
    //         }
    //     }

    //     if (render) {
    //         return;
    //     }

    //     this.Localcontext.save()

    //     this.Localcontext.translate(x_center_render, y_center_render)
    //     this.Localcontext.rotate(this.angle)
    //     this.Localcontext.translate(-(x_center_render), -(y_center_render))

        
    //     this.Localcontext.fillStyle = this.bodyColor
    //     this.Localcontext.fillRect(x_render, y_render, width_render, heigh_render)
        
    //     // ojitos
    //     this.Localcontext.fillStyle = this.eyeColor
    //     this.Localcontext.fillRect(x_render + 20 * scale, y_render, 10 * scale, 10 * scale);
    //     this.Localcontext.fillRect(x_render + width_render - 30 * scale, y_render, 10 * scale, 10 * scale);
        
    //     this.Localcontext.font = `bold ${15 * scale}px Arial`
    //     this.Localcontext.fillStyle = "white"
    //     this.Localcontext.fillText("BOT",
    //         x_render + width_render/2 - this.Localcontext.measureText("BOT").width*scale/2,
    //         y_render + heigh_render/2 + (15*scale)/2
    //     )

    //     this.Localcontext.restore()

    //     // Movement range
    //     this.Localcontext.beginPath()

    //     this.Localcontext.fillStyle = "red"
    //     this.Localcontext.fillRect(
    //         (x_center_render - 5) + 50 * Math.cos(this.angle - 1.5708),
    //         (y_center_render - 5) + 50 * Math.sin(this.angle - 1.5708),
    //         10,
    //         10);

    //     this.Localcontext.fillStyle = "blue"
    //     this.Localcontext.fillRect(
    //         (x_center_render - 5) + 50 * Math.cos(this.rotationTarget - 1.5708),
    //         (y_center_render - 5) + 50 * Math.sin(this.rotationTarget - 1.5708),
    //         10,
    //         10);

    //     this.Localcontext.closePath()
    // }

    run() {
        if (this.status === 0) this.#iddle()
    }

    #iddle() {
        if (this.satisfiedRotationTarget) {
            this.rotationTarget = this.#randomRotationMovements()
        }

        this.#smoothRotationMovement(this.rotationTarget)

        this.satisfiedRotationTarget = Math.abs(this.angle - this.rotationTarget) < 0.009
        this.goto()
    }

    #randomRotationMovements() {
        return this.#getRandomBetween(-90, 90) * (Math.PI / 180) + this.angle
    }

    #smoothRotationMovement(angle) {
        this.angle += (angle - this.angle) * this.rotationSpeed
    }

    #getRandomBetween(min, max, float) {
        const number = Math.random() * (max - min + 1)
        if (float) return number + min
        else return Math.floor(number) + min
    }

}