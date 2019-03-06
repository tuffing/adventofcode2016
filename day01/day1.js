class DayOne {
	constructor() {
	}

	parseInput(input) {
		input = input.replace(/L/g, '-');
		input = input.replace(/R/g, '');

		return input.split(', ').map(x => parseInt(x));
	}

	step(stepDetails) {
		if (stepDetails['val'] > 0)
			stepDetails['direction']++;
		else 
			stepDetails['direction']--;

		stepDetails['direction'] = stepDetails['direction'] < 0 ? stepDetails['direction'] + 4: stepDetails['direction']; //javascript mod operator ISNT mod, it's remainder and there's a difference
		stepDetails['direction'] = stepDetails['direction'] % 4;

		stepDetails['val'] = Math.abs(stepDetails['val']);

		switch (stepDetails['direction']) {
			case 0: //north
				stepDetails['y'] += stepDetails['val'];
				break;
			case 1: //east
				stepDetails['x'] += stepDetails['val'];
				break;
			case 2: //south
				stepDetails['y'] -= stepDetails['val'];
				break;
			default: //west
				stepDetails['x'] -= stepDetails['val'];
		}
	}

	PartASolution(input) {
		let values = this.parseInput(input);

		let data = {'x': 0, 'y': 0, 'direction': 0};

		values.forEach((val) => {
			data['val'] = val;
			this.step(data);
		});

		return Math.abs(data['x']) + Math.abs(data['y']);
	}

	 PartBSolution(input) {
		let locations = new Map();

		let values = this.parseInput(input);

		let data = {'x': 0, 'y': 0, 'direction': 0};


		for (let val of values) {
				data['val'] = val;
				let x = data['x'];
				let y = data['y'];
				
				this.step(data);

				while (x != data['x'] || y != data['y']) {
					if (x != data['x']) {
						if (x > data['x']) 
							x--;
						else
							x++;
					}

					if (y != data['y']) {
						if (y > data['y']) 
							y--;
						else
							y++;
					}

					let key = [x, y].join();
					if (locations.has(key)) {
						let repeat = locations.get(key);
						return Math.abs(repeat['x']) + Math.abs(repeat['y']);
					}
					locations.set(key, {'x': x, 'y': y});
				}				
		};
		
	}
}

//let test = new DayOne("test");
//test.test();
