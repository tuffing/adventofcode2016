class DayFour {
	constructor() {
	}

	IsDecoy(string) {
		//look behind would simplify this a lot, but isn't in firefox yet. but this will do
		var beginning = string.match(/[a-z](?!.?.?.?.?\])/g).sort().reverse();
		var hashed = string.match(/([a-z]?){5,5}(?=\])/)[0];
		
		var byLength = new Set(beginning.sort((a,b) =>
		          beginning.filter(v => v===a).length
		        - beginning.filter(v => v===b).length
		    ));

		var rehash = Array.from(byLength).reverse().slice(0,5).join('');

		return hashed != rehash;
	}

	Decode(string, steps) {
		let decoded = '';
		for (let l of string) {
			decoded += String.fromCharCode(((l.charCodeAt() - 96 + steps) % 26) + 96);
		}

		return decoded;
	}

	PartASolution(inputText) {
		let sum = 0;
	
		for (let line of inputText.split('\n')) {
			if (this.IsDecoy(line)) {
				continue;
			}

			sum += parseInt(line.match(/\d+/)[0]);
		}

		return sum;
	}

	PartBSolution(inputText) {	
		for (let line of inputText.split('\n')) {
			if (this.IsDecoy(line)) {
				continue;
			}

			let id = parseInt(line.match(/\d+/)[0]);

			let sentence = line.match(/[a-z]+(?=-)/g).map(l => this.Decode(l, id)).join(' ');
			if (sentence == 'northpole object storage') {
				return id;
			}
		}

		return 'Not Found';
	}
}
