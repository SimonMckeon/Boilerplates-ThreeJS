import { CubeTextureLoader, LoadingManager } from "three"
import EventEmitter from "./EventEmitter"

export default class Resources extends EventEmitter {
    constructor(assets) {
        super()

        this.assets = assets
        this.items = {}

        this.setLoaders()
        this.startLoading()
    }

    setLoaders() {
        this.loadingManager = new LoadingManager()
        this.loadingManager.onLoad = this.onLoad.bind(this)
        this.loadingManager.onProgress = this.onProgress.bind(this)
        this.loadingManager.onError = this.onError.bind(this)

        this.loaders = {
            cubeTexutureLoader: new CubeTextureLoader(this.loadingManager),
        }
    }

    startLoading() {
        for (const asset of this.assets) {
            switch (asset.type) {
                case "cubeTexture":
                    this.loaders.cubeTexutureLoader.load(asset.path, file => {
                        this.assetLoaded(asset, file)
                    })
                    break
            }
        }
    }

    assetLoaded(asset, file) {
        this.items[asset.name] = file
    }

    onLoad() {
        this.emit("load")
    }

    onProgress(url, itemsLoaded, itemsTotal) {
        this.emit("progress", [ url, itemsLoaded, itemsTotal ])
    }

    onError(url) {
        console.error(`Failed to load asset ${url}`)
        this.emit("error", [ url ])
    }
}
