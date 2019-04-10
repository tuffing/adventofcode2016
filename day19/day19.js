class DayNineteen {
	constructor() {
	}

	static part1(n) {
		//https://en.wikipedia.org/wiki/Josephus_problem
		//This is the Joesphus problem. 
		//Can be solved by coverting to binary, and removing the highest bit to the end
		//then coverting back to an integer.
		let binary = (n >>> 0).toString(2);
		let newNumber = binary.slice(1) + binary[0];

		return parseInt(newNumber, 2);
	}

	static part2(n) {
		//this follows powers of 3.
		//e.g n=3 winner is 3, n=9 w is 9, 27 is 27, 81 is 81 etc
		//Then from there, if the the result of n-[closest power of 3]) is less then said power of 3, 
		//then our answer is this result.
		//if it is over this result then the answer is (n - (closest power of 3))+(n - 2(closest power of 3))  
		//this can be simplified to 2(n - [closest power of 3]) - [cloest power of 3]
		//
		let i = 3;
		while ((i * 3) < n) {
			i *= 3;
		}
		//i /= 3;

		let remainder = n - i;
		if (remainder < i)
			return remainder;

		return (2 * remainder) - i;
	}
}
