class DayTwenty {
	constructor() {
	}

	static solution(input, max) {
		//Part 1 and 2 merged.
		//Sorts all of the given numbers. We then go through each until we find a gap
		//that gap is the answer to part 1.
		//For part 2, we just continue this process to the end, incrementing a total of allowed ips as we go.
		let rows = [];
		for (let r of input.split('\n')) {
			rows.push(r.match(/\d+/g).map(x => parseInt(x)));
		}

		rows = rows.sort((a,b) => a[0] > b[0]);
		let lowestI = 0;
		let i = 0;
		let total = 0;
		for (let r of rows) {
			if (i < r[0]) {
				total += r[0]-i;
				if (!lowestI)
					lowestI = i;
			}

			if (i <= r[1])
				i = r[1] + 1;
		}

		if (i < max) {
			total += max - i + 1;
		}
		else if (rows[rows.length-1][1] < max && i == max) {
			total++;
		}

		return [lowestI == 0 && total > 0 ? i : lowestI, total];
	}
}
