class DaySeven {
	constructor() {
	}

	IsValidTLS(text) {
			return (text.search(/(.)(.)(?!\1\1)\2\1(?=\w*\])/) === -1 && text.search(/(.)(.)(?!\1\1)\2\1(?=\w*(\[|))/) >= 0);
	}
	
	Solution(inputText) {
		let count = 0;
		for (let str of inputText.split('\n')) {
			if (this.IsValidTLS(str)) {
				count++;
			}
		}

		return count;
	}
}
