import { BoxBufferGeometry, Mesh, MeshStandardMaterial } from "three";
import Application from "../Application";

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
        this.debugFolder = this.debug.ui.addFolder('Cube')
        this.debugFolder.add(this.mesh.position, 'x').min(-10).max(10).step(0.001)
        this.debugFolder.add(this.mesh.position, 'y').min(-10).max(10).step(0.001)
        this.debugFolder.add(this.mesh.position, 'z').min(-10).max(10).step(0.001)
    }

    update() {
        this.mesh.rotation.y += this.time.delta * 0.001
    }
}