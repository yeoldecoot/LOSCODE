import { Graphics } from "pixi.js";

export interface HexCoordinates {
	q: number;
	r: number;
	s: number;
}

export class Hex {
	q: number;
	r: number;
	s: number;
	gfx: Graphics;
	color = 0xffffff;
	alpha = 0;
	constructor(q: number, r: number, s: number) {
		this.q = q;
		this.r = r;
		this.s = s;
		this.gfx = new Graphics();
		this.gfx.interactive = true;
		this.gfx.onclick = () => {
			this.color = 0x555555;
			this.alpha = 1;
		};
	}
}
export default Hex;
