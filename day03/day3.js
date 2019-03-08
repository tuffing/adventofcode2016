class DayThree {
	constructor() {
	}

	Compare(a, b, c) {
		return a + b > c && a + c > b && b + c > a;
	}

	PartASolution(inputText) {
		let count = 0;
		for (let line of inputText.split('\n')) {
			let nums = line.match(/\d+/g).map(x => parseInt(x));
			if (this.Compare(...nums)) {
				count++;
			}
		}

		return count;
	}

	PartBSolution(inputText) {
		let count = 0;
		
		let nums = inputText.match(/\d+/g).map(x => parseInt(x));

		for (let i = 0; i < nums.length; i += 9) {
			for (let j = 0; j < 3; j++) {
				if (this.Compare(nums[i+j], nums[i+j+3], nums[i+j+6])) {
					count++;
				}
			}
		}

		return count;
	}

}
