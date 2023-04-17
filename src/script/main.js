import { Player } from "./Entities/Player.js"
import { Scene } from "./Scene/Scene.js"
import { Performance } from "./various/Performance.js"

import config from '../GameConfig.json' assert {type: 'json'}
import { Camera } from "./Scene/Camera.js"
import { Bot } from "./Entities/Bot.js"

document.title = config.tab_title
let run = false

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

const player1 = new Player(canvas, 50, 50, 5, "#3E3E3E", '#F88257')
const botso = new Bot(canvas, 50, 50, 3);
const botso1 = new Bot(canvas, 50, 50, 3);
const botso2 = new Bot(canvas, 50, 50, 3);
const botso3 = new Bot(canvas, 50, 50, 3);

const performance = new Performance();

scene.config(window.innerWidth - 1, window.innerHeight - 1)
scene.add(botso)
scene.add(botso1)
scene.add(botso2)
scene.add(botso3)
scene.add(player1)

window.addEventListener("resize", () => {
    scene.config(window.innerWidth - 1, window.innerHeight - 1);
    camera.resizeDisplay(window.innerWidth - 1, window.innerHeight - 1);
    camera.follow(player1)
})

window.addEventListener('keydown', (e) => {
    e.preventDefault()
    run = true
    player1.move(e)
    camera.follow(player1)
})

window.addEventListener('keyup', (e) => {
    e.preventDefault()
    player1.move(e)
})

window.addEventListener('mousemove', (e) => {
    player1.turn(camera.calculateAngle(e.clientX, e.clientY))
})

window.addEventListener('click', (e) => {
    player1.shoot(camera.calculateAngle(e.clientX, e.clientY))
})


function update() {
    if (run) {
        botso.run()
        botso1.run()
        botso2.run()
        botso3.run()
    }
    camera.follow(player1)
    camera.render()
    // scene.draw()

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
    botso.setRole(0)
    console.log(`%cCurious people will rule the world!\n\nMost of the console printouts are removed before a new version of the game is uploaded to the repository, so you probably won't find anything interesting here 🥲.\n\nAnyway, if you find a message here that shouldn't be here, or any other wild bug 🪲, you can open a new pull request to the repository and we'll be glad to solve it!\n`, "font-family:Trebuchet MS;font-size:16px;font-weight:100")
    console.log(`%cGitHub Repository 📖: %c https://github.com/GJZ26/HideNSeek`, "font-family:Trebuchet MS;font-size:16px;font-weight:bold", "font-family:Trebuchet MS;font-size:16px;font-weight:normal; color:#78D1FF")
    camera.follow(player1)
    update()
})