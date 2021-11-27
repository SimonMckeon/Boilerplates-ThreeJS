import { BoxBufferGeometry, Mesh, MeshStandardMaterial } from "three"
import Application from "../Application"

export default class Cube {
    constructor() {
        const application = new Application()
        this.scene = application.scene
        this.time = application.time
        this.debug = application.debug

        this.setGeometry()
        this.setMaterial()
        this.setMesh()
        this.setDebug()
    }

    setGeometry() {
        this.geometry = new BoxBufferGeometry(1, 1)
    }

    setMaterial() {
        this.material = new MeshStandardMaterial()
    }

    setMesh() {
        this.mesh = new Mesh(this.geometry, this.material)
        this.scene.add(this.mesh)
    }

    setDebug() {
        if (!this.debug.active) return
        this.debugFolder = this.debug.ui.addFolder("Cube")
        this.debugFolder.add(this.mesh.position, "x", -10, 10, 0.01)
        this.debugFolder.add(this.mesh.position, "y", -10, 10, 0.01)
        this.debugFolder.add(this.mesh.position, "z", -10, 10, 0.01)
    }

    update() {
        this.mesh.rotation.y += this.time.delta * 0.001
    }
}
