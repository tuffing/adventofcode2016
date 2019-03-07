class DayTwo {
	constructor() {
	}

	Process(values, dial, x, y) {
		let result = '';

		for (let l of values) {
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
			else if (l === 'R') {
				x++;
			}
			else {
				result += dial[y][x];
			}

			if (dial[y] == undefined || dial[y][x] == undefined || dial[y][x] === '') {
				x = oldX;
				y = oldY;
			}
		}

		return result += dial[y][x];
	}

	PartASolution(values) {
		let dial = [['1','2','3'],['4','5','6'],['7','8','9']];

		return this.Process(values, dial, 1, 1);
	}

	PartBSolution(values) {
		let dial = [['','','1', '',''],['','2','3','4',''],['5','6','7','8', '9'],['','A','B','C',''], ['','','D','','']];

		return this.Process(values, dial, 0, 2);
	}
}
