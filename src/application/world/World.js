import Application from "../Application";
import Cube from "./Cube";
import Environment from "./Environment";

export default class World {
    constructor() {
        // Singleton
        const application = new Application()
        this.scene = application.scene
        this.resources = application.resources
        
        this.resources.on('load', () => {
            this.cube = new Cube()
            this.environment = new Environment()
        })
    }

    update() {
        if (this.cube) {
            this.cube.update()
        }
    }
}