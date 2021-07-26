import { n as nProgress } from "./vendor.5c111777.js";
let scriptRel;
const seen = {};
const base = "/";
const __vitePreload = function preload(baseModule, deps) {
  if (!deps || deps.length === 0) {
    return baseModule();
  }
  if (scriptRel === void 0) {
    const relList = document.createElement("link").relList;
    scriptRel = relList && relList.supports && relList.supports("modulepreload") ? "modulepreload" : "preload";
  }
  return Promise.all(deps.map((dep) => {
    dep = `${base}${dep}`;
    if (dep in seen)
      return;
    seen[dep] = true;
    const isCss = dep.endsWith(".css");
    const cssSelector = isCss ? '[rel="stylesheet"]' : "";
    if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
      return;
    }
    const link = document.createElement("link");
    link.rel = isCss ? "stylesheet" : scriptRel;
    if (!isCss) {
      link.as = "script";
      link.crossOrigin = "";
    }
    link.href = dep;
    document.head.appendChild(link);
    if (isCss) {
      return new Promise((res, rej) => {
        link.addEventListener("load", res);
        link.addEventListener("error", rej);
      });
    }
  })).then(() => baseModule());
};
var nprogress = "/* Make clicks pass-through */\n#nprogress {\n  pointer-events: none;\n}\n\n#nprogress .bar {\n  background: #29d;\n\n  position: fixed;\n  z-index: 1031;\n  top: 0;\n  left: 0;\n\n  width: 100%;\n  height: 2px;\n}\n\n/* Fancy blur effect */\n#nprogress .peg {\n  display: block;\n  position: absolute;\n  right: 0px;\n  width: 100px;\n  height: 100%;\n  box-shadow: 0 0 10px #29d, 0 0 5px #29d;\n  opacity: 1.0;\n\n  -webkit-transform: rotate(3deg) translate(0px, -4px);\n      -ms-transform: rotate(3deg) translate(0px, -4px);\n          transform: rotate(3deg) translate(0px, -4px);\n}\n\n/* Remove these to get rid of the spinner */\n#nprogress .spinner {\n  display: block;\n  position: fixed;\n  z-index: 1031;\n  top: 15px;\n  right: 15px;\n}\n\n#nprogress .spinner-icon {\n  width: 18px;\n  height: 18px;\n  box-sizing: border-box;\n\n  border: solid 2px transparent;\n  border-top-color: #29d;\n  border-left-color: #29d;\n  border-radius: 50%;\n\n  -webkit-animation: nprogress-spinner 400ms linear infinite;\n          animation: nprogress-spinner 400ms linear infinite;\n}\n\n.nprogress-custom-parent {\n  overflow: hidden;\n  position: relative;\n}\n\n.nprogress-custom-parent #nprogress .spinner,\n.nprogress-custom-parent #nprogress .bar {\n  position: absolute;\n}\n\n@-webkit-keyframes nprogress-spinner {\n  0%   { -webkit-transform: rotate(0deg); }\n  100% { -webkit-transform: rotate(360deg); }\n}\n@keyframes nprogress-spinner {\n  0%   { transform: rotate(0deg); }\n  100% { transform: rotate(360deg); }\n}\n\n";
main();
async function main() {
  nProgress.start();
  await downloadAndRunApplication();
  nProgress.done();
  await registerServiceWorker();
  await autoUpdate();
}
async function registerServiceWorker() {
  try {
    console.log("Registering Service Worker.");
    const registration = await navigator.serviceWorker.register("sw.js");
    console.log("Service Worker has been registered. " + registration);
  } catch (err) {
    console.log("Service Worker registration failed: ", err);
  }
}
async function downloadAndRunApplication() {
  const app = await __vitePreload(() => import("./App.233f8f9d.js"), true ? ["assets/App.233f8f9d.js","assets/App.af532bbd.css","assets/vendor.5c111777.js"] : void 0);
  app.default();
}
async function autoUpdate() {
  const registration = await navigator.serviceWorker.getRegistration();
  registration == null ? void 0 : registration.addEventListener("updatefound", () => {
    console.log("Update has been found.");
    console.log("Updating application.");
    registration.update();
    console.log("Application has been updated. Update will be applied when next launch.");
  });
}
