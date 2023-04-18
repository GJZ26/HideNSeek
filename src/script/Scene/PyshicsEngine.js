import { Bot } from "../Entities/Bot.js";
import { Player } from "../Entities/Player.js";
import { Scene } from "./Scene.js";

export class PyshicsEngine {

    /** @type {Player} */
    player;

    /**@type {Scene} */
    scene;

    /**
     * 
     * @param {Scene} scene 
     */
    constructor(player, scene) {
        this.player = player;
        this.scene = scene;
    }

    checkCollision() {
        this.player.updateColliderPosition()
        for (const i in this.scene.entities) {
            // this.player.Localcontext.strokeStyle = "red"
            // this.player.Localcontext.stroke(this.scene.entities[i].collider)

            if (this.scene.entities[i] === this.player) { continue };

            if (
                this.player.Localcontext.isPointInPath(this.scene.entities[i].collider, this.player.topLeftCorner.x, this.player.topLeftCorner.y) ||
                this.player.Localcontext.isPointInPath(this.scene.entities[i].collider, this.player.topRightCorner.x, this.player.topRightCorner.y)
            ) {

                if (this.player.constructor.name === Bot.name) {
                    this.player.rotationTarget = this.player.angle + (90 * Math.PI / 180)
                }
            }

        }
    }

}