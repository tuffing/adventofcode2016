class DaySeven {
	constructor() {
	}

	IsValidTLS(text) {
			return (text.search(/(.)(.)(?!\1\1)\2\1(?=\w*\])/) === -1 && text.search(/(.)(.)(?!\1\1)\2\1(?=\w*(\[|))/) >= 0);
	}

	IsValidSSL(text) {
		return text.search(/(?:\[.*(.)(.)\1\w*\].*\2\1\2(?!\w*\]))|(?:(.)(.)\3(?!\w*\]).*(\[\w*\4\3\4))/) >= 0;
	}
	
	Solution(inputText) {
		let countTSL = 0;
		let countSSL = 0;
		for (let str of inputText.split('\n')) {
			if (this.IsValidTLS(str)) {
				countTSL++;
			}

			if (this.IsValidSSL(str)) {
				countSSL++;
			}
		}

		return [countTSL, countSSL];
	}
}
