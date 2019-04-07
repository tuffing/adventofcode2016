class DaySixteen {
	constructor() {
	}

	SolutionPart1(seed, length) {
		while (seed.length < length) {
			seed = this.CurveString(seed);
		}

		seed = seed.slice(0, length);

		return this.Hash(seed);
	}

	SolutionPart2(seed, lengthBegin, lengthEnd) {
		//some analysis showed me that every i*2 (where i starts at 272) there is a 
		//17 char hash.  the advent of code input just so happens to equal 2^17 when devided by 272
		// so we know i*2*2*2... etc will eventually hit it. Not to mention this is a manufactured problem solving challenge and this is the obvious pattern
		// Therefore, we calculate hashes for i*2...*2 etc until the pattern repeats.
		//Then,we find out how many iterations we have to do to reach our target. the mod of that will be the index from our hash
		//It will equal 17 (2^17...) but that comes from intuition, might as well prove it. 
		let hashes = [];
		for (let i = lengthBegin; i < 10000000; i *= 2) {
			let h = this.SolutionPart1(seed, i);
			if (hashes.includes(h)) {
				break;
			}
			hashes.push(h);
		}

		let i = 0;
		while (lengthBegin < lengthEnd) {
			lengthBegin *= 2;
			i += 1;
		}

		return hashes[i % hashes.length];
	}


	CurveString(a) {
		/*Call the data you have at this point "a".
		Make a copy of "a"; call this copy "b".
		Reverse the order of the characters in "b".
		In "b", replace all instances of 0 with 1 and all 1s with 0.
		The resulting data is "a", then a single 0, then "b".*/
		let b = a.split('').reverse().join('').replace(/[10]/g, (m) => {
			return m === "1" ? "0" : "1";
		});


		return `${a}0${b}`;
	}

	Hash(str) {
		let hash = '';
		str.match(/[01][01]/g).forEach((x) => {
			if (x[0] == x[1])
				hash += '1'
			else
				hash += '0'
		});

		if (hash.length % 2 == 0) {
			hash = this.Hash(hash);
		}

		return hash;
	}

}
