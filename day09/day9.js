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
		console.log(full);
		return full.length;
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
}
