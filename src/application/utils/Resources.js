import { CubeTextureLoader } from "three"
import EventEmitter from "./EventEmitter"

export default class Resources extends EventEmitter {
    constructor(assets) {
        super()

        this.assets = assets

        this.items = {}
        this.toLoad = this.assets.length
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
        for (const asset of this.assets) {
            switch (asset.type) {
                case "cubeTexture":
                    this.loaders.cubeTexutureLoader.load(asset.path, file => {
                        this.sourceLoaded(asset, file)
                    }, undefined, this.onError)
                    break
            }
        }
    }

    onError(event) {
        const filePath = event.path[0].currentSrc
        console.warn(`Failed to load resource`, filePath)
    }

    sourceLoaded(asset, file) {
        this.items[asset.name] = file
        this.loaded++

        if (this.loaded === this.toLoad) {
            this.emit('loaded')
        }
    }
}
