class DayTwelve {
	constructor() {
	}

	Solution(inputText, regc = 0) {
		let lines = inputText.split('\n');

		let registers = {'a' : 0, 'b' : 0, 'c' : regc, 'd' : 0, 'e' : 0, 'ins': 0};
		let instructions = [];

		lines.forEach(l => {
			instructions.push(l.split(' '));
		});

		while (registers['ins'] >= 0 && registers['ins'] < instructions.length) {
			this[instructions[registers['ins']][0]](registers, ...(instructions[registers['ins']].slice(1)));
		}

		return registers['a'];
	}

	/*
		cpy x y copies x (either an integer or the value of a register) into register y.
	*/
	cpy(registers, x, y) {
		if (isNaN(+x)) {
			x = registers[x];
		}

		registers[y] = +x;
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

		if (+x !== 0) {
			registers['ins'] += +y;
		}
		else {
			registers['ins']++;
		}
	}
}
