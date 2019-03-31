class DayEleven {
	constructor(floor1, floor2, floor3) {
		this.floor1 = floor1;
		this.floor2 = floor2;
		this.floor3 = floor3;
		this.floor4 = [];

		this.combinations = new Map();
	}

	hashFloor(floor) {
		return floor.sort(x => x.type).map(x => x.toString()).join(',');
	}

	hash(floor1, floor2, floor3, floor4, currFloor) {
		return `(${currFloor})|${this.hashFloor(floor1)}|${this.hashFloor(floor2)}|${this.hashFloor(floor3)}|${this.hashFloor(floor4)}`;
	}

	complete(floor1, floor2, floor3, floor4) {
		return !floor1.length && !floor2.length && !floor3.length; 
	}

	allowed(floor, newPart, removedParts = []) {
		//let allow = true;
		let unMatchedM = new Set();
		let gens = new Set();

		if (newPart.part == 'rtf')
			gens.add(newPart.type);
		else
			unMatchedM.add(newPart.type)

		for (let p of floor) {
			if (p == newPart || removedParts.includes(p) || removedParts.includes(newPart)) {
				continue;
			}

			if (p.part == 'rtf') {
				gens.add(p.type);
				unMatchedM.delete(p.type);
			}
			else if (!gens.has(p.type)) {
				unMatchedM.add(p.type);
			}

			if (p.isMatch(newPart))
				return true;
		}
		return !(gens.size && unMatchedM.size);
	}

	findShortest(floors) {
		let toProcess = [{'floors': floors, 'curr': 0, 'distance': 0}];
		let combinations = new Map();

		while(toProcess.length) {
			let next = toProcess.pop();

			combinations.set(this.hash(next['floors'][0], next['floors'][1], next['floors'][2], next['floors'][3]), next['distance']);

			if (this.complete(...next['floors']))
				return;

			let floor = next['floors'][next['curr']];
			let partCombos = this.splitCombinations(floor);

			
			let optionalFloors = [];
			if (next['curr'] > 0)
				optionalFloors.push(next['curr'] - 1);
			if (next['curr'] < 4)
				optionalFloors.push(next['curr'] + 1);

			let dir = next['distance'] + 1;
			optionalFloors.forEach(o => {
				partCombos.forEach(c => {
					if (c.length == 2 || (c.length === 1 && this.allowed(next['floors'][o], c[0]))) {
						let newFloors = next['floors'].map(f => Array.from(f));
						newFloors[o] = newFloors[o].push(c).flat();
						newFloors[next['curr']] = newFloors[next['curr']].filter(x => !c.includes(x));

						let hash = this.hash(...newFloors, o)
						if (!combinations.has(hash) || combinations.get(hash) > dir) {
							toProcess.push({'floors': newFloors, 'curr': o, 'distance': dir});
						}
					}

				});
			});
		}

	}

	//find all usable combinations that can be taken from the floor
	splitCombinations(floor) {
		let combos = new Set();

		let working = Array.from(floor);

		while (working.length) {
			let p = working.pop();
			combos.add([p]);

			working.forEach(p2 => combos.add([p, p2]));			
		}

		//figure out which combos can be removed without frying the floor
		let usableCombos = [];

		for (let c of combos.values()) {
			if (c.length == 2 && !(c[0].type == c[1].type || c[0].part == c[1].part))
				continue;

			if (floor.every(p => this.allowed(floor, p, c)))
				usableCombos.push(c);
		}

		return usableCombos;
	}



}


class Part {
	constructor(type) {
		this.type = type;
		this.part = 'part';
	}

	isCompatible(part) {
		return false;
	}

	toString() {
		return this.type;
	}

	isMatch(part) {
		return part.type === this.type;
	}
}

class Rtf extends Part {
	constructor(type) {
		super(type);
		this.part = 'rtf';
	}

	isCompatible(part) {
		if (part == null || this.isMatch(part) || part.part == 'rtf') {
			return true;
		}

		return false;
	}

	toString() {
		return `${this.type}G`;
	}
} 


class Chip extends Part {
	constructor(type) {
		super(type);
		this.part = 'chip';
	}

	isCompatible(part) {
		if (part == null || this.isMatch(part) || part.part == 'chip') {
			return true;
		}

		return false;
	}

	toString() {
		return `${this.type}M`;
	}
} 