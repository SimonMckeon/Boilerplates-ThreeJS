import { Scene } from "three"
import Camera from "./Camera"
import Renderer from "./Renderer"
import Sizes from "./utils/Sizes"
import Time from "./utils/Time"
import World from "./world/World"

let instance

// TODO: A cleaner implementation of Application singleton
export default class Application {
    constructor(canvas) {
        if (instance) return instance
        instance = this

        this.canvas = canvas

        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new Scene()
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.world = new World()

        this.sizes.on('resize', this.resize.bind(this))
        this.time.on('tick', this.update.bind(this))
    }

    resize() {
        this.camera.resize()
        this.renderer.resize()
    }

    update() {
        this.camera.update()
        this.renderer.update()
    }
}
