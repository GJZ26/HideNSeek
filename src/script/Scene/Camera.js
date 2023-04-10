import { Player } from "../Entities/Player.js";
import { Scene } from "./Scene.js";

export class Camera {
    /** @type {Scene} */
    scene;

    /** @type {CanvasRenderingContext2D} */
    context;

    x_camera_position;
    y_camera_position;
    camera_width;
    camera_height;

    x_display_position;
    y_display_position;
    display_width;
    display_height;

    backgroung_color;


    constructor(scene,
        camera_position = {
            x: 0, y: 0,
            width: 100, height: 100
        },
        display_position = {
            x: 0, y: 0,
            width: 100, height: 0,
            background_color: "gray"
        }) {

        if (scene) {
            this.setScene(scene)
        }

        this.x_camera_position = camera_position.x;
        this.y_camera_position = camera_position.y;
        this.camera_width = camera_position.width;
        this.camera_height = camera_position.height;

        this.x_display_position = display_position.x;
        this.y_display_position = display_position.y;
        this.display_width = display_position.width;
        this.display_height = display_position.height;

        this.backgroung_color = display_position.background_color ? display_position.background_color : "gray";

    }

    setScene(scene) {
        this.scene = scene;
        this.context = this.scene.context;
    }

    render() {
        this.context.strokeStyle = "black";
        this.context.lineWidth = 1;

        this.context.fillStyle = this.backgroung_color;

        this.context.save()
        this.context.strokeRect(this.x_camera_position, this.y_camera_position, this.camera_width, this.camera_height);

        this.context.beginPath()
        this.context.rect(this.x_display_position, this.y_display_position, this.display_width, this.display_height)
        this.context.clip()
        this.context.fillRect(this.x_display_position, this.y_display_position, this.display_width, this.display_height);

        for (const i in this.scene.entities) {
            const relative_x = this.scene.entities[i].x - this.x_camera_position + this.x_display_position
            const relative_y = this.scene.entities[i].y - this.y_camera_position + this.y_display_position

            this.scene.entities[i].render(relative_x, relative_y)
        }
        this.context.restore()
    }

    /**
     * 
     * @param {Player} player 
     */
    follow(player) {
        this.x_camera_position = player.x - this.camera_width/2 + player.width/2
        this.y_camera_position = player.y- this.camera_height/2 + player.heigh/2
    }

}