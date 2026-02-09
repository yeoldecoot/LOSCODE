import { Assets, Texture } from "pixi.js";
export const cursorTex = new Texture();
export const lightWoods = new Texture();
export const heavyWoods = new Texture();
export const waterTex = new Texture();
export const elevation = new Texture();
export const plus = new Texture();
export const minus = new Texture();
(async () => {
	cursorTex.source = await Assets.load("assets/cursor.png");
	lightWoods.source = await Assets.load("assets/tree.png");
	heavyWoods.source = await Assets.load("assets/heavy.png");
	waterTex.source = await Assets.load("assets/water.png");
	elevation.source = await Assets.load("assets/elevation.png");
	plus.source = await Assets.load("assets/plus.png");
	minus.source = await Assets.load("assets/minus.png");
})();
