import { PerspectiveCamera } from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Application from "./Application";

export default class Camera {
    constructor() {
        // Singleton
        const application = new Application()
        this.sizes = application.sizes
        this.scene = application.scene
        this.canvas = application.canvas

        this.setInstance()
        this.setOrbitControls()
    }

    setInstance() {
        const aspectRatio = this.sizes.width / this.sizes.height
        this.instance = new PerspectiveCamera(35, aspectRatio, 0.1, 100)
        this.instance.position.set(0, 0, -5)
        this.scene.add(this.instance)
    }

    setOrbitControls() {
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true
    }

    resize() {
        const aspectRatio = this.sizes.width / this.sizes.height
        this.instance.aspect = aspectRatio
        this.instance.updateProjectionMatrix()
    }

    update() {
        this.controls.update()
    }
}