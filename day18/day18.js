class DayEighteen {
	constructor() {
	}

	Solution(row, length) {
		//we just need the total, so 
		let count = 0;
		for (let i = 0; i < length; i++) {
			// there is a slight speed loss by using this regex
			// in the 40k run, switching it with a count in this.Genrow as it processes
			// gives us a 5 second boost. 
			count += row.match(/\./g).length;
			row = this.GenRow(row);
		}
		return count;
	}

	/**
    Its left and center tiles are traps, but its right tile is not.
    Its center and right tiles are traps, but its left tile is not.
    Only its left tile is a trap.
    Only its right tile is a trap.
	*/
	GenRow(row) {
		let newRow = '';
		let trapCombos = new Set(['^^.', '.^^', '^..', '..^']);
		
		for (let i in row) {
			let left = '.';
			if (i > 0)
				left = row[i-1];
			
			let center = row[i];
			
			let right = '.';
			if (i < row.length - 1)
				right = row[+i+1];

			newRow += trapCombos.has(`${left}${center}${right}`) ? '^' : '.';
		}

		return newRow;
	}

}
