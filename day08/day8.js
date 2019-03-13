class DayEight {
	constructor(displayWidth, displayHeight) {
		this.display = Array.apply(null, Array(displayHeight)).map(() => '.'.repeat(displayWidth));

		this.functions = new Map();
		this.functions.set('rect', this.Rect);
		this.functions.set('column', this.RotateColumn);
		this.functions.set('row', this.RotateRow);
	}

	Rect(self, wide,tall) {
		/*rect AxB turns on all of the pixels in a rectangle at the top-left of the screen which is A wide and B tall.*/
		for (let y = 0; y < tall; y++) {
			self.display[y] = '#'.repeat(wide) + self.display[y].substring(wide);
		}
	}
	
	RotateRow(self, y,steps) {
		/*rotate row y=A by B shifts all of the pixels in row A (0 is the top row) right by B pixels.
		 Pixels that would fall off the right end appear at the left end of the row.
		 */
		self.display[y] = self.display[y].substring(self.display[y].length - steps) + self.display[y].substring(0, self.display[y].length - steps); 
	}

	RotateColumn(self, x,steps) {
		/*rotate column x=A by B shifts all of the pixels in column A (0 is the left column) down by B pixels.
		 Pixels that would fall off the bottom appear at the top of the column.
		*/
		while (steps > 0) {
			let next = self.display[self.display.length-1][x];
			for (let i = 0; i < self.display.length; i++) {
				let newNext = self.display[i][x];
				self.display[i] = self.display[i].substring(0, x) + next + self.display[i].substring(x+1);
				next = newNext;
			}
			steps--;
		}
	}

	GetPrintOut() {
		return this.display.join('\n');
	}

	RunLine(line) {
		let funct = line.match(/rect|column|row/)[0];
		let numbers = line.match(/\d+/g).map(x => parseInt(x));

		this.functions.get(funct)(this, ...numbers);
	}

	SolutionPartOne(inputText) {
		for (let line of inputText.split('\n')) {
			this.RunLine(line);
		}

		let count = 0;
		for (let line of this.display) {
			count += line.match(/#/g).length;
		}

		return count;
	}
}
