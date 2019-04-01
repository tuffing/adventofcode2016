class DayEleven {
	constructor() {
	}

	hashFloor(floor) {
		return floor.map(x => (x)).sort().join(',');
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

		if (newPart < 0)
			gens.add(Math.abs(newPart));
		else
			unMatchedM.add(newPart)

		for (let p of floor) {
			if (p == newPart || removedParts.includes(p) || removedParts.includes(newPart)) {
				continue;
			}

			if (p < 0) {
				gens.add(Math.abs(p));
				unMatchedM.delete(Math.abs(p));
			}
			else if (!gens.has(p)) {
				unMatchedM.add(p);
			}

			//if (p.isMatch(newPart))
			//	return true;
		}
		return !(gens.size && unMatchedM.size);
	}

	findShortest(floors) {
		//this is essentially a very convoluted bfs search
		let toProcess = new Queue();
		toProcess.push({'floors': floors, 'curr': 0, 'distance': 0, 'history': 'BEGIN'});
		let combinations = [new Map(), new Map(),new Map(),new Map()];

		let max = 150;
		let count = 0;
		let minTop = 0;

		while(toProcess.first != null) {
			count++;

			let next = toProcess.pop();

			if (count % 10000 == 0) {
				console.clear();
				console.log(`${count} ${next['distance']}`);
			}

			//console.log(this.hash(next['floors'][0], next['floors'][1], next['floors'][2], next['floors'][3], next['curr']), next['distance']);
			let key = this.hash(next['floors'][0], next['floors'][1], next['floors'][2], next['floors'][3], next['curr']);
			//console.log(next['distance']);

			if (this.complete(...next['floors'])) {
				if (max > next['distance']) {
					max = next['distance'];
					console.log(max);
					console.log(next['history']);
				}
				continue;
			}

			//				combinations.set(hash, dir);
			//


			if (max - 1  <= next['distance'] || combinations[next['curr']].get(key) < next['distance'])
				continue;
			//combinations.set(key, next['distance'] - 1);

			let floor = next['floors'][next['curr']];
			let partCombos = [];

			partCombos = this.splitCombinations(floor);
			


			
			let optionalFloors = [];
			if (next['curr'] > 0)
				optionalFloors.push(next['curr'] - 1);
			if (next['curr'] < 3)
				optionalFloors.push(next['curr'] + 1);

			let dir = next['distance'] + 1;
			optionalFloors.forEach(o => {
				partCombos.forEach(c => {
					var allowed = c.length === 0;
					if ((o == 3 || o == 0) && next['floors'][o].length == 0 && c.length == 1) {
						allowed = false;
					}
					else if (c.length === 2) {
						next['floors'][o].push(c[1]);
						//HG,HM,LM
						allowed = this.allowed(next['floors'][o], c[0]);
						next['floors'][o].pop();
					}
					else if (c.length === 1) {
						allowed = this.allowed(next['floors'][o], c[0]);
					}

					if (allowed) {
						let newFloors = next['floors'].map(f => Array.from(f));
						c.forEach(x=>newFloors[o].push(x));

						newFloors[next['curr']] = newFloors[next['curr']].filter(x => !c.includes(x));

						if (minTop < newFloors[2].length + newFloors[3].length)
							minTop = newFloors[2].length + newFloors[3].length;

						let hash = this.hash(...newFloors, o)
						if ((!combinations[o].has(hash)) 
							&& (newFloors[2].length > 0 || newFloors[3].length > 0))
							//&& (minTop - 1 <= newFloors[2].length + newFloors[3].length))
						{// || combinations.get(hash) > dir) {
							
							combinations[o].set(hash, dir);
							//console.log(next['history']);

							toProcess.push({'floors': newFloors, 'curr': o, 'distance': dir});//, 'history': next['history'] + '//' + hash});
						}
					}

				});
			});
		}
		console.log(`count ${count}`);
		return max;
	}

	//find all usable combinations that can be taken from the floor
	splitCombinations(floor) {
		let combos = new Set();

		let working = Array.from(floor);
		/*if (working.length >= 4) {
			let matches = 0;
			let gens = new Set();
			let machine = null;
			working.forEach(x => {
				if (x < 0) {
					matches++;
					gens.add(Math.abs(x));
				}
				else {
					matches--;
					machine = x;
					gens.delete(x)
				}
			});

			if (matches > 0 && matches <= working.length-4) {
				//gen = Array.from(gen);
				working.sort(x => x);
				working = working.filter(x => Math.abs(x) == machine || gens.has(Math.abs(x)));
			}
		}*/

		while (working.length) {
			let p = working.pop();
			combos.add([p]);

			working.forEach(p2 => combos.add([p, p2]));			
		}

		//figure out which combos can be removed without frying the floor
		let usableCombos = [];

		for (let c of combos.values()) {
			if (c.length == 2 && !(Math.abs(c[0]) == Math.abs(c[1]) || (c[0] > 0 && c[1] > 0) || (c[0] < 0 && c[1] < 0)))
				continue;

			if (floor.every(p => this.allowed(floor, p, c)))
				usableCombos.push(c);
		}

		return usableCombos;
	}



}
