import { Tile } from "./Tile";
import { updateLOS } from "./LOS";
import { cameraMoving } from "./Viewport.ts";
import { radio } from "./Menu.ts";
import { main } from "./Main.ts";
import { Graphics } from "pixi.js";
//create hexgrid
export const tiles: Tile[] = [];
export const mapWidth = 41;
export const mapHeight = 40;
for (let q = 0; q < mapWidth; q++) {
	const rOffset = Math.floor(q / 2);
	for (let r = -rOffset; r < mapHeight - rOffset; r++) {
		const s = -q - r;
		const tile = new Tile(q, r, s, 0xffffff, 0);
		tile.container.interactive = true;
		tile.container.onpointertap = () => {
			if (cameraMoving) return;
			if (radio.selected === 0) {
				const prevD = tiles.find((t) => t.defender === true);
				if (prevD) prevD.defender = false;
				tile.defender = true;
				defender = tile;
			} else 	if (radio.selected === 1) {
				tile.increaseWoods();
			} else if (radio.selected === 2) {
				tile.addWater();
			} else if (radio.selected === 3) {
				tile.increaseElevation();
			}
			if (attacker && defender) {
				updateLOS(tiles, attacker, defender);
			}
		};
		main.addChild(tile.container);
		tiles.push(tile);
	}
}

//create attacker and defender tiles and the line drawn between them
const a = { q: 20, r: 10, s: -30 };
const attacker = tiles.find(
	(t) => t.hex.q === a.q && t.hex.r === a.r && t.hex.s === a.s,
);
if (attacker) attacker.attacker = true;
const d = { q: NaN, r: NaN, s: NaN };
let defender = tiles.find(
	(t) => t.hex.q === d.q && t.hex.r === d.r && t.hex.s === d.s,
);
const line = new Graphics();
main.addChild(line);

export function updateLine() {
	if (attacker && defender) {
		line.clear()
			.moveTo(attacker.x, attacker.y)
			.lineTo(defender.x, defender.y)
			.stroke({ color: 0x000000, width: 2 });
	}
}
