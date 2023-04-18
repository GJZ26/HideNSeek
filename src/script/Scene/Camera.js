import { Player } from "../Entities/Player.js";
import { Obstacle } from "./Obstacle.js";
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
    max_render_distance_x;
    max_render_distance_y;

    backgroung_color;
    scale;
    x_camera_distance;
    y_camera_distance;

    constructor(scene,
        camera_position = {
            x: 0, y: 0,
            max_render_distance_x: 0,
            max_render_distance_y: 0,
            scale: 1
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
        this.camera_width = display_position.width;
        this.camera_height = display_position.height;

        this.x_display_position = display_position.x;
        this.y_display_position = display_position.y;
        this.display_width = display_position.width;
        this.display_height = display_position.height;

        this.backgroung_color = display_position.background_color ? display_position.background_color : "#D9D9D9";

        this.max_render_distance_x = camera_position.max_render_distance_x ? camera_position.max_render_distance_x : 10;
        this.max_render_distance_y = camera_position.max_render_distance_y ? camera_position.max_render_distance_y : 10;

        this.scale = camera_position.scale ? camera_position.scale : 1;
    }

    setScene(scene) {
        this.scene = scene;
        this.context = this.scene.context;
    }

    render() {

        this.context.fillStyle = this.backgroung_color;

        this.context.save()

        const maxRender = new Path2D();
        maxRender.rect(
            this.x_camera_position - (this.max_render_distance_x),
            this.y_camera_position - (this.max_render_distance_y),
            this.camera_width + 2 * (this.max_render_distance_x),
            this.camera_height + 2 * (this.max_render_distance_y)
        )

        this.context.beginPath()
        this.context.rect(this.x_display_position, this.y_display_position, this.display_width, this.display_height)
        this.context.clip()
        this.context.fillRect(this.x_display_position, this.y_display_position, this.display_width, this.display_height);

        for (const i in this.scene.entities) {

            const relative_x =
                (this.scene.entities[i].x * this.scale) +
                (this.x_camera_position - (this.x_camera_position * this.scale)) + 
                (this.x_camera_distance - (this.x_camera_distance * this.scale)) - 
                (this.x_camera_position) +
                (this.x_display_position)

            const relative_y =
                (this.scene.entities[i].y * this.scale) + 
                (this.y_camera_position - (this.y_camera_position * this.scale)) + 
                (this.y_camera_distance - (this.y_camera_distance * this.scale)) -
                (this.y_camera_position) +
                (this.y_display_position)

            this.scene.entities[i].render(relative_x, relative_y, this.scale, 
                (!this.context.isPointInPath(maxRender, this.scene.entities[i].x_center, this.scene.entities[i].y_center)) &&
               this.scene.entities[i].constructor.name !== Obstacle.name 
                )
        }

        this.context.restore()
    }

    /**
     * 
     * @param {Player} player 
     */
    follow(player) {
        this.x_camera_position = player.x - this.camera_width / 2 + player.width / 2;
        this.y_camera_position = player.y - this.camera_height / 2 + player.height / 2;
        this.x_camera_distance = player.x_center - this.x_camera_position;
        this.y_camera_distance = player.y_center - this.y_camera_position;
    }

    calculateAngle(x, y) {
        return Math.atan2(y - (this.y_display_position + this.display_height / 2), x - (this.x_display_position + this.display_width / 2)) + 1.5708
    }

    resizeDisplay(width,height){
        this.camera_height = height;
        this.display_height = height;

        this.camera_width = width;
        this.display_width = width;
    }

}