class DayTwo {
	constructor() {
	}

	PartASolution(input) {
		let values = input.split(' ');
		let result = '';

		let dial = [['1','2','3'],['4','5','6'],['7','8','9']];
		let x = 1;
		let y = 1;

		for (let val of values) {
			for (let l of val) {
				//ULL RRDDD
				switch (l) {
					case 'U':  //UP
						if (y > 0)
							y--;
						break;
					case 'D': //DOWN
						if (y < 2)
							y++;
						break;
					case 'L': //LEFT
						if (x > 0)
							x--;
						break;
					default: //RIGHT
						if (x < 2)
							x++;
				}
			}

			result += dial[y][x];
		}

		return result;
	}

	PartBSolution(input) {
		let values = input.split(' ');
		let result = '';

		let dial = [['','','1', '',''],['','2','3','4',''],['5','6','7','8', '9'],['','A','B','C',''], ['','','D','','']];
		let x = 0;
		let y = 2;

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
}
