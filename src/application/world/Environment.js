import {
    DirectionalLight,
    Mesh,
    MeshStandardMaterial,
    sRGBEncoding,
} from "three"
import Application from "../Application"

export default class Environment {
    constructor() {
        // Singleton
        const application = new Application()
        this.scene = application.scene
        this.resources = application.resources
        this.debug = application.debug

        this.setSunLight()
        this.setEnvironmentMap()

        if (this.debug.active) {
            this.setDebug()
        }
    }

    setSunLight() {
        this.sunLight = new DirectionalLight(0xffffff, 4)
        this.sunLight.castShadow = true
        this.sunLight.shadow.camera.far = 15
        this.sunLight.shadow.mapSize.set(1024, 1024)
        this.sunLight.shadow.normalBias = 0.05
        this.sunLight.position.set(3, 3, -2.25)
        this.scene.add(this.sunLight)
    }

    setEnvironmentMap() {
        this.environmentMap = {
            intensity: 0.4,
            texture: this.resources.items["environmentMapTexture"],
            encoding: sRGBEncoding,
        }
        this.scene.environment = this.environmentMap.texture

        this.environmentMap.updateMaterials = () => {
            this.scene.traverse(child => {
                if (
                    child instanceof Mesh &&
                    child.material instanceof MeshStandardMaterial
                ) {
                    child.material.envMap = this.environmentMap.texture
                    child.material.envMapIntensity =
                        this.environmentMap.intensity
                    child.material.needsUpdate = true
                }
            })
        }
        this.environmentMap.updateMaterials()
    }

    setDebug() {
        this.debugFolder = this.debug.ui.addFolder("Environment")

        this.debugFolder
            .add(this.sunLight, "intensity")
            .name("Sun Light Intensity")
            .min(0)
            .max(10)
            .step(0.001)

        this.debugFolder
            .add(this.environmentMap, "intensity")
            .name("Environment Map Intensity")
            .min(0)
            .max(10)
            .step(0.001)
            .onChange(this.environmentMap.updateMaterials)
    }
}
