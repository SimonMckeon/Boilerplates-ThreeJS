import Application from './application/Application'

const application = new Application(document.querySelector('canvas.webgl'))

if (window.location.hash === '#debug') {
    window.application = application
}