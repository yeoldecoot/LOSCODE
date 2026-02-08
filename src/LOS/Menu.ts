import { Container, Graphics, Sprite } from "pixi.js";
import { CheckBox, RadioGroup } from "@pixi/ui";
import {
	cursorTex,
	elevation,
	lightWoods,
	minus,
	plus,
	waterTex,
} from "./Textures";
import { app } from "./App";

//create UI
const scale = 0.1;
const activeScale = scale * 1.1;
const margin = 15;
const width = cursorTex.width * scale + margin + 5;
const height = cursorTex.width * scale + margin + 20;
export const topMenu = new Container();
const topPanel = new Graphics()
	.roundRect(0, 0, width * 4, height, 10)
	.fill({ color: 0x555555, alpha: 0.8 });
topMenu.addChild(topPanel);
topMenu.x = app.screen.width / 2 - width * 2;
topMenu.y = 15;

export const topRadio = new RadioGroup({
	items: [
		new CheckBox({
			style: {
				unchecked: new Sprite({
					scale: scale,
					texture: cursorTex,
				}),
				checked: new Sprite({
					scale: activeScale,
					texture: cursorTex,
				}),
			},
		}),
		new CheckBox({
			style: {
				unchecked: new Sprite({
					scale: scale,
					texture: lightWoods,
				}),
				checked: new Sprite({
					scale: activeScale,
					texture: lightWoods,
				}),
			},
		}),
		new CheckBox({
			style: {
				unchecked: new Sprite({
					scale: scale,
					texture: waterTex,
				}),
				checked: new Sprite({
					scale: activeScale,
					texture: waterTex,
				}),
			},
		}),
		new CheckBox({
			style: {
				unchecked: new Sprite({
					scale: scale,
					texture: elevation,
					tint: 0xffffff,
				}),
				checked: new Sprite({
					scale: activeScale,
					texture: elevation,
					tint: 0x555555,
				}),
			},
		}),
	],
	type: "horizontal",
	elementsMargin: margin,
});

if (topRadio.innerView) {
	topRadio.innerView.padding = margin;
}
topRadio.interactive = true;
topMenu.addChild(topRadio);

export const bottomMenu = new Container();
const bottomPanel = new Graphics()
	.roundRect(0, 0, width * 2 + 10, height, 10)
	.fill({ color: 0x555555, alpha: 0.8 });
bottomMenu.addChild(bottomPanel);
bottomMenu.x = app.screen.width / 2 - width;
bottomMenu.y = app.screen.height - 100;

export const bottomRadio = new RadioGroup({
	items: [
		new CheckBox({
			style: {
				unchecked: new Sprite({
					scale: scale,
					texture: plus,
				}),
				checked: new Sprite({
					scale: activeScale,
					texture: plus,
				}),
			},
		}),
		new CheckBox({
			style: {
				unchecked: new Sprite({
					scale: scale,
					texture: minus,
				}),
				checked: new Sprite({
					scale: activeScale,
					texture: minus,
				}),
			},
		}),
	],
	type: "horizontal",
	elementsMargin: margin,
});

if (bottomRadio.innerView) {
	bottomRadio.innerView.padding = margin;
}
bottomRadio.interactive = true;
bottomMenu.addChild(bottomRadio);
