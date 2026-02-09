import { Application, extensions, CullerPlugin } from "pixi.js";

// Create and initialize the application
export const app = new Application();
(async () => {
	await app.init({
		background: "#FFFFFF",
		resizeTo: window,
		backgroundAlpha: 0,
		antialias: true,
		autoDensity: true,
		resolution: window.devicePixelRatio,
	});
	extensions.add(CullerPlugin);
})();
