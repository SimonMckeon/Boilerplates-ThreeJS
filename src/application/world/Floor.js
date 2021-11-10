import { CircleBufferGeometry, Mesh, MeshStandardMaterial, RepeatWrapping, sRGBEncoding } from "three";
import Application from "../Application";

export default class Floor {
    constructor() {
        // Singleton
        const application = new Application()
        this.scene = application.scene
        this.resources = application.resources

        this.setGeometry()
        this.setTextures()
        this.setMaterial()
        this.setMesh()
    }

    setGeometry() {
        this.geometry = new CircleBufferGeometry(5, 64)
    }

    setTextures() {
        this.textures = {}

        this.textures.color = this.resources.items['floorColorTexture']
        this.textures.color.encoding = sRGBEncoding
        this.textures.color.repeat.set(1.5, 1.5)
        this.textures.color.wrapS = RepeatWrapping
        this.textures.color.wrapT = RepeatWrapping

        this.textures.normal = this.resources.items['floorNormalTexture']
        this.textures.normal.repeat.set(1.5, 1.5)
        this.textures.normal.wrapS = RepeatWrapping
        this.textures.normal.wrapT = RepeatWrapping
    }

    setMaterial() {
        this.material = new MeshStandardMaterial({
            map: this.textures.color,
            normalMap: this.textures.normal
        })
    }

    setMesh() {
        this.mesh = new Mesh(this.geometry, this.material)
        this.mesh.rotation.x = -Math.PI * 0.5
        this.mesh.receiveShadow = true
        this.scene.add(this.mesh)
    }
}