class DayTen {
	constructor(input) {
		this.Bots = new Map();
		this.RunFeed(input);

		let res = 1;
		for (let [k,v] of this.Bots.entries()) {
			if (k == 'output 0' || k == 'output 1'  || k == 'output 2') {
				res *= v.Chips[0];
			}
		}
		console.log(`Part 2: ${res}`);
	}

	GiveToBotOrOutputByKey(key, gift) {
		if (!this.Bots.has(key)) {
			this.Bots.set(key, new Bot(key));
		}

		let bot = this.Bots.get(key);
		bot.ReceiveChip(gift);
	}

	GiveInstructionToBotByKey(key, lowKey, highKey) {
		for (let k of [key, lowKey, highKey]) {
			if (!this.Bots.has(k)) {
				this.Bots.set(k, new Bot(k));
			}
		}

		let bot = this.Bots.get(key);
		let low = this.Bots.get(lowKey);
		let high = this.Bots.get(highKey);

		bot.ReceiveInstruction(low, high);
	}

	RunFeed(input) {
		for (let l of input.split('\n')) {
			if (l.startsWith('value')) {
				let values = l.match(/\d+/g);
				this.GiveToBotOrOutputByKey(`bot ${values[1]}`, parseInt(values[0]));
				continue;
			}

			let instructions = l.match(/([\w\s]+\d+)(?:[\w\s]+)((?:output|bot)\s\d+)(?:[\w\s])+((?:output|bot)\s\d+)/);
			instructions.shift();
			this.GiveInstructionToBotByKey(...instructions);
		}
	}
}

class Bot {
	constructor(key) {
		this.Key = key;
		this.Chips = [];
		this.Instructions = []; //[low bot, high bot]
	}

	ReceiveInstruction(lowBot, highBot) {
		this.Instructions.push([lowBot, highBot]);
		this.PassOnChips();
	}

	ReceiveChip(num) {
		if (this.Chips.length == 2) {
			throw new Error('too many chips');
			return;
		}

		if (num > this.Chips[0]) {
			this.Chips.push(num);
		}
		else {
			this.Chips.unshift(num);
		}

		this.PassOnChips();
	}

	PassOnChips() {
		if (this.Chips.length == 2 && this.Instructions.length) {
			if (this.Chips[0] == 17 && this.Chips[1] == 61) {
				console.log(`Part 1: ${this.Key}`);
			}

			let bots = this.Instructions.shift();

			bots[0].ReceiveChip(this.Chips[0]);
			bots[1].ReceiveChip(this.Chips[1]);
		
			this.Chips = [];
		}	
	}
}
