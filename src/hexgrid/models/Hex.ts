export interface HexCoordinates {
	q: number;
	r: number;
	s: number;
}

export class Hex {
	q: number;
	r: number;
	s: number;
	key: string;
	attacker = false;
	defender = false;
	constructor(q: number, r: number, s: number) {
		this.q = q;
		this.r = r;
		this.s = s;
		this.key = `${this.q},${this.r},${this.s}`;
	}
	getKey(): string {
		return this.key;
	}
	setAttacker(x: boolean) {
		this.attacker = x;
	}
	setDefender(x: boolean) {
		this.defender = x;
	}
}
export default Hex;
