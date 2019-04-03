class DayFourteen {
	constructor() {
	}

	Solution(seed, hardCoreMode = false) {
		let considering = new Map();
		let curChars = new Set();
		let indexes = [];

		let count = 0;

		while (indexes.length <= 64) {
			let hash =  this.GetHash(seed, count, hardCoreMode);

			if (curChars.size) {
				let fives = this.FindFiveInRow(hash, Array.from(curChars).join(''));
				if (fives)	{
					let matches = [];
					for (let match of fives) {
						matches.push(match[0]);
						curChars.delete();
					}

					for (let [k,v] of considering.entries()) {
						if (matches.includes(v.char)) {
							indexes.push(+k);
							considering.delete(k);
						}
					}
					
				}
			}

			for (let [k,v] of considering.entries()) {
				v.remaining--;
				if (v.remaining <= 0) {
					considering.delete(k);
				}
			}	

			let triples = this.FindTriplicate(hash);
			if (triples) {
				curChars.add(triples);
				considering.set(count, {'remaining': 1000, "char": triples});
			}

			count++;	
		}

		if (indexes.length >= 64)
			return indexes[63];

		return -1;
	}

	GetHash(seed, count, hardCoreMode = false) {
		let hash = SparkMD5.hash(`${seed}${count}`);

		if (!hardCoreMode) {
			return hash;
		}

		for (let i = 0; i < 2016; i++) {
			hash = SparkMD5.hash(hash);
		}

		return hash;
	}

	FindTriplicate(str) {
		let match = str.match(/(\w)\1\1/);
		
		if (match) {
			return match[1];
		}

		return null;
	}

	FindFiveInRow(str, charString) {
		//let match = str.match('/([' + charString + '])\1\1\1\1/g');
		let regex = new RegExp(`([${charString}])\\1\\1\\1\\1`, 'g');
		let match = str.match(regex);

		return match;
	}


}
