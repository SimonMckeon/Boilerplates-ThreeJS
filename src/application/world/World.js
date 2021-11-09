import { BoxBufferGeometry, Mesh, MeshBasicMaterial } from "three";
import Application from "../Application";

export default class World {
    constructor() {
        // Singleton
        const application = new Application()
        this.scene = application.scene

        // Test Cube
        const cube = new Mesh(
            new BoxBufferGeometry(1, 1, 1),
            new MeshBasicMaterial({ wireframe: true })
        )
        this.scene.add(cube)
    }
}