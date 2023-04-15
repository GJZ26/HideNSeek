import { Player } from "./Entities/Player.js"
import { Scene } from "./Scene/Scene.js"
import { Performance } from "./various/Performance.js"

import config from '../GameConfig.json' assert {type: 'json'}
import { Camera } from "./Scene/Camera.js"

document.title = config.tab_title

const canvas = document.getElementById("playground")
// const sca = document.getElementById("scale")
// const labl = document.getElementById("label")

if (canvas === null) {
    throw new Error(`Apparently there is no object with the ID "${"playground"}".`)
}

if (canvas.nodeName !== "CANVAS") {
    throw new Error(`The object with the ID "${"playground"}" does not correspond to the expected object type\nExpected: CANVAS\nGiven: ${canvas.nodeName}`)
}

const scene = new Scene(canvas)

const camera = new Camera(scene, {
    x: 0, y: 0, max_render_distance_x: 30, max_render_distance_y: 30, scale: 1
}, {
    x: 0, y: 0, width: window.innerWidth - 1, height: window.innerHeight - 1
})

const player1 = new Player(canvas, 50, 50, 10, "#3E3E3E", '#F88257')
const dummy = new Player(canvas, 50, 50, 0, "#F08080")
const dummy2 = new Player(canvas, 50, 50, 0, "#40E0D0")
const dummy3 = new Player(canvas, 50, 50, 0, "#6495ED")

const performance = new Performance();

// Moving playe1
player1.y -= player1.heigh + 30

dummy2.y = dummy.y + 100
dummy2.x = dummy.x + 220

dummy3.y = dummy.y = dummy.y + 10
dummy3.x = dummy.x + 220



scene.config(window.innerWidth - 1, window.innerHeight - 1)
scene.add(dummy)
scene.add(dummy2)
scene.add(dummy3)
scene.add(player1)

window.addEventListener("resize", () => {
    scene.config(window.innerWidth - 1, window.innerHeight - 1);
    camera.resizeDisplay(window.innerWidth - 1, window.innerHeight - 1);
})

window.addEventListener('keydown', (e) => {
    e.preventDefault()
    player1.move(e, e.type)

    dummy.turn(player1.x_center, player1.y_center)
    dummy2.turn(player1.x_center, player1.y_center)
    dummy3.turn(player1.x_center, player1.y_center)
    camera.follow(player1)
})

window.addEventListener('keyup', (e) => {
    e.preventDefault()
    player1.move(e, e.type)
})

window.addEventListener('mousemove', (e) => {
    player1.turn(camera.calculateAngle(e.clientX, e.clientY))
})

window.addEventListener('click', (e) => {
    player1.shoot(camera.calculateAngle(e.clientX, e.clientY))
    dummy.shoot(camera.calculateAngle(e.clientX, e.clientY))
    dummy2.shoot(camera.calculateAngle(e.clientX, e.clientY))
    dummy3.shoot(camera.calculateAngle(e.clientX, e.clientY))
})

// sca.addEventListener("input", (e) => {
//     labl.textContent = e.target.value
//     camera.scale = e.target.value
// })

function update() {
    camera.follow(player1)
    camera.render()

    // Debug Info
    scene.write(`${config.game_name}`, 6)
    scene.write(`Version: ${config.version}`, 6, 35)
    scene.write(`Date: ${new Date()}`, 6, 55)
    scene.write(`FPS: ${performance.showFPS()}`, 6, 75)


    requestAnimationFrame(update)
}

console.log(`%c${config.game_name}`, "font-family:Trebuchet MS ;font-size:32px; font-weight: bold;")
console.log(`%cVersion: ${config.version}`, "font-family:Trebuchet MS;font-size:16px; font-style:italic")

requestAnimationFrame(() => {
    console.log(`%cCurious people will rule the world!\n\nMost of the console printouts are removed before a new version of the game is uploaded to the repository, so you probably won't find anything interesting here 🥲.\n\nAnyway, if you find a message here that shouldn't be here, or any other wild bug 🪲, you can open a new pull request to the repository and we'll be glad to solve it!\n`, "font-family:Trebuchet MS;font-size:16px;font-weight:100")
    console.log(`%cGitHub Repository 📖: %c https://github.com/GJZ26/HideNSeek`, "font-family:Trebuchet MS;font-size:16px;font-weight:bold", "font-family:Trebuchet MS;font-size:16px;font-weight:normal; color:#78D1FF")
    camera.follow(player1)
    update()
})