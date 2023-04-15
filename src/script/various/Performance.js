export class Performance {
    frames = 0;
    lastRender;
    fps = this.frames;

    constructor() {
        this.lastRender = performance.now();
    }

    showFPS() {
     
        this.frames++
        if ((performance.now() - this.lastRender) > 1000) {
            this.fps = (this.frames / ((performance.now() - this.lastRender) / 1000))
            this.frames = 0
            this.lastRender = performance.now()
        }

        return this.fps
    }
}