import { Mesh, Scene } from "three"
import Camera from "./Camera"
import Renderer from "./Renderer"
import Resources from "./utils/Resources"
import Sizes from "./utils/Sizes"
import Time from "./utils/Time"
import World from "./world/World"

import sources from './sources'
import Debug from "./utils/Debug"

// TODO: A cleaner implementation of Application singleton
export default class Application {
    static instance 

    constructor(canvas) {
        if (this.instance) return this.instance
        this.nstance = this

        this.canvas = canvas

        this.debug = new Debug()
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new Scene()
        this.resources = new Resources(sources)
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
        this.world.update()
    }

    destroy() {
        this.sizes.off('resize')
        this.time.off('tick')
        this.resources.off('loaded')
        this.camera.controls.dispose()
        this.renderer.instance.dispose()
        
        if (this.debug.active) {
            this.debug.ui.destroy()
        }

        this.scene.traverse(child => {
            if (child instanceof Mesh) {
                child.geometry.dispose()
                for (const key in child.material) {
                    const value = child.material[key]
                    if (value && typeof value.dispose === 'function') {
                        value.dispose
                    }
                }
            }
        })
    }
}
