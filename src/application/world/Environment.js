import { Mesh, MeshStandardMaterial, PointLight, sRGBEncoding } from "three"
import Application from "../Application"

export default class Environment {
    constructor() {
        const application = new Application()
        this.scene = application.scene
        this.resources = application.resources

        this.setSunlight()
        this.setEnvironmentMap()
    }

    setSunlight() {
        this.sunLight = new PointLight(0xffffff, 4)
        this.sunLight.position.set(3, 3, -3)
        this.scene.add(this.sunLight)
    }

    setEnvironmentMap() {
        this.environmentMap = {
            intensity: 0.4,
            texture: this.resources.items.environmentMapTexture,
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
}
