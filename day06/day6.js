class DaySix {
	constructor() {
	}


	Solution(inputText, length, mostPopularLetter) {
		var letters = inputText.match(/[a-z]/g);
		let counts = Array.apply(null, Array(length)).map(() => new Map());

		for (let i = 0; i < letters.length; i++) {
			let count = counts[i % length];
			let letter = letters[i];
			count.set(letter, count.has(letter) ? count.get(letter) + 1 : 1);
		}

		let res = '';
		counts.forEach((count) => {
			if (mostPopularLetter)
				res += Array.from(count.keys()).reduce((a, b) => { return count.get(a) > count.get(b) ? a : b });
			else
				res += Array.from(count.keys()).reduce((a, b) => { return count.get(a) < count.get(b) ? a : b });
		});

		return res;
	}
}
