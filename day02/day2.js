class DayTwo {
	constructor() {
	}

	Process(values, dial, x, y) {
		let result = '';

		for (let val of values) {
			for (let l of val) {
				let oldX = x;
				let oldY = y;
				
				if (l === 'U') {
					y--;
				}
				else if (l === 'D') {
					y++;
				}
				else if (l === 'L') {
					x--;
				}
				else {
					x++;
				}

				if (y < 0 || y >= dial.length || x < 0 || x >= dial.length || dial[y][x] === '') {
					x = oldX;
					y = oldY;
				}
			}

			result += dial[y][x];
		}

		return result;
	}

	PartASolution(input) {
		let values = input.split(' ');

		let dial = [['1','2','3'],['4','5','6'],['7','8','9']];

		return this.Process(values, dial, 1, 1);
	}

	PartBSolution(input) {
		let values = input.split(' ');
		let result = '';

		let dial = [['','','1', '',''],['','2','3','4',''],['5','6','7','8', '9'],['','A','B','C',''], ['','','D','','']];

		return this.Process(values, dial, 0, 2);
	}
}
