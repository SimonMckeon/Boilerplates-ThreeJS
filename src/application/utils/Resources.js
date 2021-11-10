import { CubeTextureLoader, TextureLoader } from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/gltfLoader"
import EventEmitter from "./EventEmitter"

export default class Resources extends EventEmitter {
    constructor(sources) {
        super()

        this.sources = sources

        this.items = {}
        this.toLoad = this.sources.length
        this.loaded = 0

        this.setLoaders()
        this.startLoading()
    }

    setLoaders() {
        this.loaders = {
            gltfLoader: new GLTFLoader(),
            textureLoader: new TextureLoader(),
            cubeTexutureLoader: new CubeTextureLoader(),
        }
    }

    // TODO: Better error reporting
    startLoading() {
        for (const source of this.sources) {
            switch (source.type) {
                case "gltfModel":
                    this.loaders.gltfLoader.load(source.path, file => {
                        this.sourceLoaded(source, file)
                    }, undefined, this.onError)
                    break
                case "texture":
                    this.loaders.textureLoader.load(source.path, file => {
                        this.sourceLoaded(source, file)
                    }, undefined, this.onError)
                    break
                case "cubeTexture":
                    this.loaders.cubeTexutureLoader.load(source.path, file => {
                        this.sourceLoaded(source, file)
                    }, undefined, this.onError)
                    break
            }
        }
    }

    onError(event) {
        const filePath = event.path[0].currentSrc
        console.warn(`Failed to load resource`, filePath)
    }

    sourceLoaded(source, file) {
        this.items[source.name] = file
        this.loaded++

        if (this.loaded === this.toLoad) {
            this.emit('loaded')
        }
    }
}
