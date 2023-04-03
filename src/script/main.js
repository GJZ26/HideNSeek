import { Player } from "./Entities/Player.js"
import { Scene } from "./Scene/Scene.js"
import { Performance } from "./various/Performance.js"

const canvas = document.getElementById("playground")

if (canvas === null) {
    throw new Error(`Apparently there is no object with the ID "${"playground"}".`)
}

if (canvas.nodeName !== "CANVAS") {
    throw new Error(`The object with the ID "${"playground"}" does not correspond to the expected object type\nExpected: CANVAS\nGiven: ${canvas.nodeName}`)
}

const scene = new Scene(canvas)
const player1 = new Player(canvas, 90, 90, 10)
const performance = new Performance();

scene.config(window.innerWidth - 1, window.innerHeight - 1)
scene.add(player1)

scene.draw()
scene.write("Hide N' Seek - v.0.0.0-dev")

window.addEventListener("resize", () => {
    scene.config(window.innerWidth - 1, window.innerHeight - 1);
    scene.draw()
})

window.addEventListener('keydown', (e) => {
    e.preventDefault()
    player1.move(e, e.type)
})

window.addEventListener('keyup', (e) => {
    e.preventDefault()
    player1.move(e, e.type)
})

window.addEventListener('mousemove', (e) => {
    player1.turn(e.clientX, e.clientY)
})

window.addEventListener('click', (e) => {
    player1.shoot(e.clientX, e.clientY)
})

function update() {
    scene.clear()
    scene.draw()


    // Debug Info
    scene.write("Hide N' Seek", 6)
    scene.write("Version: v.0.0.0-dev", 6, 35)
    scene.write(`Date: ${new Date()}`, 6, 55)
    scene.write(`FPS: ${performance.showFPS()}`, 6, 75)


    requestAnimationFrame(update)
}

requestAnimationFrame(update)