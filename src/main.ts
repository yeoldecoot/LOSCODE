import { Application } from "pixi.js";
import { Viewport } from "pixi-viewport";
import Layout from "./hexagon/Layout";
import HexGrid from "./hexagon/HexGrid";
import HexTile from "./hexagon/HexTile";
import HexView from "./hexagon/HexView";

(async () => {
	// Create a new application
	const app = new Application();

	// Initialize the application
	await app.init({
		background: "#FFFFFF",
		resizeTo: window,
		backgroundAlpha: 0,
		antialias: true,
		autoDensity: true,
		resolution: window.devicePixelRatio,
	});

	//create the hexgrid
	const layout = new Layout({ size: { x: 40, y: 40 }, flat: true });
	const hexGrid = new HexGrid(layout);
	//define the viewport
	const bounds = layout.getBounds();
	const width = bounds.width - 80;
	const height = bounds.height - 40;
	const viewport = new Viewport({
		screenWidth: app.screen.width,
		screenHeight: app.screen.height,
		worldWidth: width,
		worldHeight: height,
		events: app.renderer.events,
	});
	

	// enable interaction plugins
	viewport
		.moveCenter({ x: bounds.width / 2, y: bounds.height / 2 })
		.drag() // pan with drag
		.pinch() // touch pinch zoom
		.wheel() // mouse wheel zoom
		.clamp({ direction: "all" }) // clamp pan
		.clampZoom({
			minWidth: 400,
			minHeight: 400,
			maxWidth: width,
			maxHeight: height,
		}); //clamp zoom
	
	//define attacker and defender objects
	const attackerHex = new HexTile(20, 10, -30);
	const attackerView = new HexView(attackerHex, layout);
	attackerView.gfx.fill("red");
	
	let defenderHex = new HexTile(0, 0, 0);
	const defenderView = new HexView(defenderHex, layout);

	hexGrid.views.forEach((view) => {
		view.gfx.interactive = true;
		view.gfx.on("pointertap", () => {
			defenderView.tile = view.tile;
			defenderHex = view.tile;
			defenderView.color = 0x800080;
			defenderView.draw(layout);
		});
	});

	//define hierarchy
	document.body.appendChild(app.canvas);
	app.stage.addChild(viewport);
	viewport.addChild(layout);
	layout.addChild(attackerView.gfx);
	layout.addChild(defenderView.gfx);
})();
