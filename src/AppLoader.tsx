import "nprogress/nprogress.css"
import nProgress from "nprogress"


/**
 * entry point
 */
main();


async function main() {
    nProgress.start()
    await downloadAndRunApplication()
    nProgress.done()
    await registerServiceWorker()
    await autoUpdate()
}

async function registerServiceWorker() {
    try {
        console.log("Registering Service Worker.");
        const registration = await navigator.serviceWorker.register("service-worker.js")
        console.log("Service Worker has been registered. " + registration);
    } catch (err) {
        console.log("Service Worker registration failed: ", err)
    }
}

async function downloadAndRunApplication() {
    console.log("downloading app")
    const app = await import("./App");
    console.log("donwloaded")
    app.default();
}

async function autoUpdate() {
    const registration = await navigator.serviceWorker.getRegistration()
    registration?.addEventListener("updatefound", () => {
        console.log("Update has been found.")
        console.log("Updating application.")
        registration.update()
        console.log("Application has been updated.")
    })
}

