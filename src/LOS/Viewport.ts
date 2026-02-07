import { Viewport } from "pixi-viewport";
import { app } from "./App";
import { layout } from "../hexgrid/Layout";
import { mapHeight, mapWidth } from "./Tiles";

//create viewport
const width = (3 / 2) * layout.size.x * (mapWidth - 1);
const height = Math.sqrt(3) * layout.size.y * mapHeight;
export const viewport = new Viewport({
	screenWidth: app.screen.width,
	screenHeight: app.screen.height,
	worldWidth: width,
	worldHeight: height,
	events: app.renderer.events,
});
//enable viewport interaction plugins
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

//prevent click event during viewport movement
export let cameraMoving = false;
let moveEndTimer: number | null = null;
const MOVE_IDLE_DELAY = 50; // ms after last movement to consider stable
viewport.on("moved", () => {
	cameraMoving = true;
});
viewport.on("pointerup", () => {
	if (moveEndTimer !== null) {
		clearTimeout(moveEndTimer);
	}

	moveEndTimer = window.setTimeout(() => {
		cameraMoving = false;
		moveEndTimer = null;
	}, MOVE_IDLE_DELAY);
});
