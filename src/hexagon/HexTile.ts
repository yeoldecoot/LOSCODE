import Hex from "./models/Hex";

class HexTile extends Hex {
	intervening: boolean;
    blocked: boolean
	woods: number;
    dc: boolean;
	constructor(q: number, r: number, s: number) {
		super(q, r, s);
		this.intervening = false;
		this.woods = 0;
        this.dc = false;
        this.blocked = false;
	}
}
export default HexTile;
