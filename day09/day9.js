class DayNine {
	constructor() {
	}

	SolutionPartOne(inputText) {
		let full = '';

		let match = this.NextMatch(inputText, 0);
		full += match[0];
		let start = match[1];

		while (start !== 0 && start < inputText.length) {
			match = this.NextMatch(inputText, start);
			full += match[0];
			start = match[1];
		}
		return full.length;
	}

	SolutionPartTwo(inputText) {
		let match = this.NextMatchV2(inputText, 0);
		let full = match[0];
		let start = match[1];

		while (start !== 0 && start < inputText.length) {
			match = this.NextMatchV2(inputText, start);
			full += match[0];
			start = match[1];
		}
		return full;
	}


	NextMatch(inputText, startIndex) {
		if (inputText[startIndex] === '(') {
			let re = /\d+x\d+\)/g;
			re.lastIndex = startIndex;
			
			let bracs = re.exec(inputText);

			bracs = bracs[0];
			let nums = bracs.match(/\d+/g).map(x => parseInt(x));

			let charsRe = RegExp('.{'+ nums[0] +'}','g');
			charsRe.lastIndex = re.lastIndex;
			let chars = charsRe.exec(inputText)[0];

			return [chars.repeat(nums[1]), charsRe.lastIndex]
		}
		else {
			let re = /[^(]+/g;
			re.lastIndex = startIndex;

			return [re.exec(inputText)[0], re.lastIndex]; 
		}
	}

	/**
		A recursive version of part 1, processing sub brackets,
		Only count string length as javascrings just can get big enough to process
		the massive size of the string. Most browsers are capped at about 256MB or so.
	*/
	NextMatchV2(inputText, startIndex) {
		if (inputText[startIndex] === '(') {
			let re = /\d+x\d+\)/g;
			re.lastIndex = startIndex;
			
			let bracs = re.exec(inputText);

			bracs = bracs[0];
			let nums = bracs.match(/\d+/g).map(x => parseInt(x));

			let charsRe = RegExp('.{'+ nums[0] +'}','g');
			charsRe.lastIndex = re.lastIndex;
			let chars = charsRe.exec(inputText)[0];

			//we need to run every bracket in the sub string this time.
			let sub = 0;
			let start =  0;
			while (start < chars.length) {
				let match = this.NextMatchV2(chars, start);
				sub += match[0];
				start = match[1];

				if (start === 0)
					break;
			}

			return [sub * nums[1], charsRe.lastIndex]
		}
		else {
			let re = /[^(]+/g;
			re.lastIndex = startIndex;

			return [re.exec(inputText)[0].length, re.lastIndex]; 
		}
	}
}
