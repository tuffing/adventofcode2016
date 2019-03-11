class DayFive {
	constructor() {
	}


	PartASolution(inputText) {
		let count = 0;
		var filled = 0;
		var pass1 = '';
		var pass2 = Array(8);

		while (pass1.length < 8 || pass2.join('').length < 8) {
			let hash = SparkMD5.hash(`${inputText}${count++}`);
			if (hash.startsWith('00000')) {
				if (pass1.length < 8)
					pass1 += hash[5];
				
				if (hash[5] < 8 && pass2[hash[5]] == undefined) {
					pass2[hash[5]] = hash[6];
				}
				
				console.log(pass1, pass2.join(), count - 1);
			}
		}

		return `${pass1}/${pass2.join('')}`;
	}

}
