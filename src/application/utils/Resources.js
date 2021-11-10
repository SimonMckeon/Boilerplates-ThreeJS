import { CubeTextureLoader } from "three"
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
            cubeTexutureLoader: new CubeTextureLoader(),
        }
    }

    startLoading() {
        for (const source of this.sources) {
            switch (source.type) {
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
        console.info(`Loaded: ${source.name}`)
        this.items[source.name] = file
        this.loaded++

        if (this.loaded === this.toLoad) {
            this.emit('loaded')
        }
    }
}
