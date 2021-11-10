import Application from "../Application";
import Environment from "./Environment";
import Floor from "./Floor";
import Fox from "./Fox";

export default class World {
    constructor() {
        // Singleton
        const application = new Application()
        this.scene = application.scene
        this.resources = application.resources

        this.resources.on('loaded', () => {
            this.floor = new Floor()
            this.fox = new Fox()
            this.environment = new Environment()
        })
    }

    update() {
        if (this.fox) {
            this.fox.update()
        }
    }
}