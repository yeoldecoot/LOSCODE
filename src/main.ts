import { Application, Container, Graphics } from "pixi.js";
import { Viewport } from "pixi-viewport";
import { Hex } from "./hexgrid/models/Hex";
import { polyPoint, layout } from "./hexgrid/Layout";
import { HexUtils } from "./hexgrid/HexUtils";
import { initDevtools } from "@pixi/devtools";

(async () => {
	//draw a hex to the screen with a given color
	function draw(gfx: Graphics, color: number, alpha = 1) {
		gfx.clear()
			.poly(polyPoint())
			.fill({ color, alpha })
			.stroke({ width: 2, color: 0x000000 });
	}

	function update() {
		const attackerIndex = hexes.findIndex((hex) => hex.attacker === true);
		if (attackerIndex !== -1) draw(graphics[attackerIndex], 0xa52422);

		const defenderIndex = hexes.findIndex((hex) => hex.defender === true);
		if (defenderIndex !== -1) draw(graphics[defenderIndex], 0xa4bab7);
	}
	// Create and initialize the application

	const app = new Application();
	initDevtools({ app });
	await app.init({
		background: "#FFFFFF",
		resizeTo: window,
		backgroundAlpha: 0,
		antialias: true,
		autoDensity: true,
		resolution: window.devicePixelRatio,
	});

	//create the main container
	const main = new Container();

	//create hexgrid
	const hexes: Hex[] = [];
	const graphics: Graphics[] = [];

	const mapWidth = 41;
	const mapHeight = 40;
	for (let q = 0; q < mapWidth; q++) {
		const rOffset = Math.floor(q / 2);
		for (let r = -rOffset; r < mapHeight - rOffset; r++) {
			const s = -q - r;
			const hex = new Hex(q, r, s);
			const { x, y } = HexUtils.hexToPixel(hex, layout);
			const gfx = new Graphics();
			draw(gfx, 0xffffff, 0);
			gfx.position.set(x, y);
			gfx.interactive = true;
			gfx.onclick = () => {
				hexes.find((hex) => hex.defender === true)?.setDefender(false);
				hex.setDefender(true);
			};
			main.addChild(gfx);
			hexes.push(hex);
			graphics.push(gfx);
		}
	}
	//create attacker hex (still need to decide between state based vs object)
	const attackerHex = "20,10,-30";
	hexes.find((hex) => hex.key === attackerHex)?.setAttacker(true);

	//pan/zoom
	const bounds = main.getBounds();
	const width = bounds.width - layout.size.x * 2;
	const height = bounds.height - layout.size.y;
	const viewport = new Viewport({
		screenWidth: app.screen.width,
		screenHeight: app.screen.height,
		worldWidth: width,
		worldHeight: height,
		events: app.renderer.events,
	});

	// enable interaction plugins
	viewport
		.moveCenter({ x: width / 2, y: height / 2 })
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

	//ticker
	app.ticker.add(() => {
		update();
	});
	//define hierarchy
	document.body.appendChild(app.canvas);
	app.stage.addChild(viewport);
	viewport.addChild(main);
})();
