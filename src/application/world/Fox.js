import { AnimationMixer, Mesh } from "three";
import Application from "../Application";

export default class Fox {
    constructor() {
        // Singleton
        const application = new Application()
        this.scene = application.scene
        this.resources = application.resources
        this.time = application.time
        this.debug = application.debug

        this.resource = this.resources.items['foxModel']

        if (this.debug.active) {
            this.setDebug()
        }

        this.setModel()
        this.setAnimation()
    }

    setDebug() {
        this.debugFolder = this.debug.ui.addFolder('Fox')

        const debugObject = {
            playIdle: () => this.animation.play('idle'),
            playWalk: () => this.animation.play('walk'),
            playRun: () => this.animation.play('run'),
        }
        this.debugFolder.add(debugObject, 'playIdle')
        this.debugFolder.add(debugObject, 'playWalk')
        this.debugFolder.add(debugObject, 'playRun')
    }

    setModel() {
        this.model = this.resource.scene
        this.model.scale.set(0.02, 0.02, 0.02)
        this.scene.add(this.model)

        this.model.traverse(child => {
            if (child instanceof Mesh) {
                child.castShadow = true
            }
        })
    }

    setAnimation() {
        this.animation = {}
        this.animation.mixer = new AnimationMixer(this.model)
        
        this.animation.actions = {}
        this.animation.actions.idle = this.animation.mixer.clipAction(this.resource.animations[0])
        this.animation.actions.walk = this.animation.mixer.clipAction(this.resource.animations[1])
        this.animation.actions.run = this.animation.mixer.clipAction(this.resource.animations[2])

        this.animation.actions.current = this.animation.actions.idle
        this.animation.actions.current.play()

        this.animation.play = (name) => {
            const newAction = this.animation.actions[name]
            const previousAction = this.animation.actions.current
            
            newAction.reset()
            newAction.play()
            newAction.crossFadeFrom(previousAction, 1)

            this.animation.actions.current = newAction
        }
    }

    update() {
        this.animation.mixer.update(this.time.delta * 0.001)
    }
}