import { CineonToneMapping, PCFSoftShadowMap, sRGBEncoding, WebGLRenderer } from "three";
import Application from "./Application";

export default class Renderer {
    constructor() {
        // Singleton
        const application = new Application()
        this.canvas = application.canvas
        this.sizes = application.sizes
        this.scene = application.scene
        this.camera = application.camera

        this.setIntance()
    }

    setIntance() {
        this.instance = new WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        })
        this.instance.physicallyCorrectLights = true
        this.instance.outputEncoding = sRGBEncoding
        this.instance.toneMapping = CineonToneMapping
        this.instance.toneMappingExposure = 1.75
        this.instance.shadowMap.enabled = true
        this.instance.shadowMap.type = PCFSoftShadowMap
    
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio)
    }

    resize() {
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio)
    }

    update() {
        this.instance.render(this.scene, this.camera.instance)
    }
}