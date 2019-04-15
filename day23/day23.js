class DayTwentyThree {
	constructor() {
	}

	Solution(inputText, regc = 0, rega = 0, regb = 0) {
		let lines = inputText.split('\n');

		let registers = {'a' : rega, 'b' : regb, 'c' : regc, 'd' : 0, 'e' : 0, 'ins': 0, instructions: [], output: ''};
		let instructions = registers.instructions;

		lines.forEach(l => {
			instructions.push(l.split(' '));
		});

		while (registers['ins'] >= 0 && registers['ins'] < instructions.length && registers.output.length < 9) {
			this[instructions[registers['ins']][0]](registers, ...(instructions[registers['ins']].slice(1)));
		}

		return registers;
	}

	Solution2(rega, multiA, multiB) {
		// Our entire program can be broke down into the following short program:
		// the factorial of rega + the result of 2 numbers (in our program 73 and 80)
	 	let x = 1;
	 	for (let i = rega; i > 1; i--) {
	 		x *= i;
	 	}

	 	return x + (multiA * multiB);
	}

	day25Solution(inputText) {
		for (let i = 1; i < 1000; i++) {
			let poss = ['101010101', '010101010'];
			let next = this.Solution(inputText, 0, i).output;
			if (poss.includes(next))
				return i;
		}
	}

	/*
		cpy x y copies x (either an integer or the value of a register) into register y.
	*/
	cpy(registers, x, y) {
		if (isNaN(+x)) {
			x = registers[x];
		}

		if (isNaN(+y)) {
			registers[y] = +x;
		}
		registers['ins']++;
	}

	/*
		inc x increases the value of register x by one.
	*/
	inc(registers, x) {
		registers[x]++;
		registers['ins']++;
	} 

	/*
		dec x decreases the value of register x by one.
	*/
	dec(registers, x) {
		registers[x]--;
		registers['ins']++
	}

	/*
		jnz x y jumps to an instruction y away (positive means forward; negative means backward), but only if x is not zero.
	*/
	jnz(registers, x, y) {
		if (isNaN(+x)) {
			x = registers[x];
		}

		if (isNaN(+y)) {
			y = registers[y];
		}

		if (+x !== 0) {
			registers['ins'] += +y;
		}
		else {
			registers['ins']++;
		}
	}

	/*tgl x toggles the instruction x away (pointing at instructions like jnz does: positive means forward; negative means backward):

	For one-argument instructions, inc becomes dec, and all other one-argument instructions become inc.
	For two-argument instructions, jnz becomes cpy, and all other two-instructions become jnz.
	The arguments of a toggled instruction are not affected.
	If an attempt is made to toggle an instruction outside the program, nothing happens.
	If toggling produces an invalid instruction (like cpy 1 2) and an attempt is later made to execute that instruction, skip it instead.
	If tgl toggles itself (for example, if a is 0, tgl a would target itself and become inc a), the resulting instruction is not executed
	 until the next time it is reached.
	*/
	tgl (registers, x) {
		if (isNaN(+x)) {
			x = registers[x];
		}

		let ins = registers['ins'] + +x;
		registers['ins']++;

		if (ins < 0 || ins >= registers['instructions'].length)
			return;

		let com = registers['instructions'][ins][0];
		let newCom = '';

		switch (com) {
			case 'inc':
				newCom = 'dec'
				break;
			case 'dec':
			case 'tgl':
				newCom = 'inc';
				break;
			case 'jnz':
				newCom = 'cpy';
				break;
			default:
				newCom = 'jnz';
		}

		registers['instructions'][ins][0] = newCom;
	}


	//out x transmits x (either an integer or the value of a register) as the next value for the clock signal.
	out (registers, x) {
		if (isNaN(+x)) {
			x = registers[x];
		}

		registers['output'] += x;
		registers['ins']++;
	}

}
