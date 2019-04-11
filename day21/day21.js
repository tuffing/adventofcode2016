class DayTwentyOne {
	constructor() {
	}

	parseLine(line) {
		let commandName = line.match(/^(\w+\s\w+)/)[1];
		let command = {'command': commandName.replace(' ', ''), 'args': []};
		let parts = line.split(' ');

		switch (commandName) {
			case 'swap position':
			case 'move position':
				//swap position [X] with position [Y]
				//move position X to position Y
				command.args.push(parseInt(parts[2]));
				command.args.push(parseInt(parts[5]));
				break;
			case 'rotate right':
			case 'rotate left':
				//rotate left/right X 
				command.args.push(parseInt(parts[2]));
				break;
			case 'rotate based':
				//rotate based on position of letter X
				command.args.push(parts[6]);
				break;
			case 'reverse positions':
				//reverse positions X through Y
				command.args.push(parseInt(parts[2]));
				command.args.push(parseInt(parts[4]));
				break;
			case 'swap letter':
				//swap letter X with letter Y
				command.args.push(parts[2]);
				command.args.push(parts[5]);
				break;
		}

		return command;
	}

	// swap position X with position Y means that the letters at indexes X and Y (counting from 0) should be swapped.
	swapposition(string, x,y) {
		//javascript strings are immutable, which prevents us swapping out letter at index a with b
		//we'd have to convert to array first or do some messy string stuff, 
		//so the quickest way is just to reuse swapletter 
		return this.swapletter(string, string[x], string[y]);
	}

	//swap letter X with letter Y means that the letters X and Y should be swapped (regardless of where they appear in the string).
	swapletter(string, x, y) {
		string = string.replace(x, '^');
		string = string.replace(y, x);
		return string.replace('^', y);
	}

	//rotate left/right X steps means that the whole string should be rotated; for example, one right rotation would turn abcd into dabc.
	rotateleft(string, x) {
		return string.substring(x) + string.substring(0, x);
	}

	rotateright(string, x) {
		return string.substring(string.length -x) + string.substring(0, string.length-x);
	}

	// rotate based on position of letter X means that the whole string 
	//should be rotated to the right based on the index of letter X (counting from 0) 
	//as determined before this instruction does any rotations.
	// Once the index is determined, rotate the string to the right one time,
	// plus a number of times equal to that index, plus one additional time if the index was at least 4.
	rotatebased(string, x) {
		//let letters = string.split('');
		let index = string.indexOf(x);

		string = this.rotateright(string, index+1);
		if (index >= 4) {
			string = this.rotateright(string, 1);
		}

		return string;
	}

	reverserotatebased(string, x) {
		//There is no doubt a nicer bit of math available to do this.
		//I couldn't find it, so we stick with the patterns i did find.
		//@TODO find that nice math.. current solution only works if the length is 8
		let index = string.split('').indexOf(x);
		if (index % 2 == 1) {
			return this.rotateleft(string, (index+1) / 2);
		}
		else if (index == 0) {
			return this.rotateleft(string, 1);
		}
		else {
			return this.rotateright(string, (6-index)*0.5);
		}
	}

	//reverse positions X through Y means that the span of letters at indexes X through Y 
	//(including the letters at X and Y) should be reversed in order.
	reversepositions(string, x, y) {
		let sub = string.substring(x,y+1);
		let reversed = sub.split('').reverse().join('');

		return string.replace(sub, reversed);
	}

	//move position X to position Y means that the letter which is at index X 
	//should be removed from the string, then inserted such that it ends up at index Y.
	moveposition(string, x, y) {
		let letters = string.split('');
		let letX = string[x];

		letters.splice(x, 1);
		letters.splice(y,0,letX);
		
		return letters.join('');
	}

	solution(input, string) {
		let lines = input.split('\n');
		let coms = lines.map(x => this.parseLine(x));

		coms.forEach(c => {
			string = this[c.command](string, ...c.args);
		});

		return string;
	}

	solutionPart2(input, string) {
		//to reverse we just run out commands in reverse on the string
		//and flip the command (left to right, or in swapping commands, just switch the args)
		//.. all but the roate based on letter x command. There isn't a straight forward
		//method for this. ...current solution for that is hacky.

		let lines = input.split('\n');
		let coms = lines.map(x => this.parseLine(x)).reverse();

		coms.forEach(c => {
			switch (c.command) {
				case 'swapposition':
				case 'moveposition':
				case 'reverse positions':
				case 'swap letter':
					c.args.reverse();
					break;
				case 'rotateright':
					c.command = 'rotateleft';
					break;
				case 'rotateleft':
					c.command = 'rotateright';
					break;
				case 'rotatebased':
					//rotate based on position of letter X
					c.command = 'reverserotatebased';
					break;
			}

			string = this[c.command](string, ...c.args);
		});

		return string;
	}
}
