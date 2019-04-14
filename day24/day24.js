class DayTwentyFour {
	constructor() {
	}

	Solution(inputText, sX, sY, numbers) {
		let rows = inputText.split('\n');
		let visited = new Set();
		var queue = new Queue();
		queue.push({x: sX, y: sY, dist: 0, numString: '0', part2: false });
		let smallest = 100000;
		let smallestPt2 = 10000;
		//let part2 = false;

		while (queue.first != null) {
			let now = queue.pop();
			let coords = [[now.x-1, now.y], [now.x+1, now.y], [now.x,now.y-1], [now.x,now.y+1]];

			for (let c of coords) {
				//out of bounds
				if (c[0] < 0 || c[1] < 0 || c[0] >= rows[0].length || c[1] > rows.length)
					continue;

				//a wall
				if (rows[c[1]][c[0]] == '#' || (now.dist + 1 >= smallestPt2)) 
					continue;

				let numString = now.numString;
				if (!isNaN(+rows[c[1]][c[0]])) {
					let char = rows[c[1]][c[0]];
					if (!numString.includes(char) || (now.part2 && char === '0')) {
						numString += char;
					}
				}

				//part 1
				let part2 = now.part2;
				if (!part2 && numString.length == numbers && now.dist + 1 < smallest) {
					smallest = now.dist + 1;
				}
				
				if (!part2 && numString.length == numbers) {
					part2 = true;
				}

				//part 2
				if (numString.length > numbers && now.dist + 1 < smallestPt2) {
					smallestPt2 = now.dist + 1;
					continue;
				}

				let hash = `${c[0]},${c[1]},${numString}`;

				if (!visited.has(hash)) {
					visited.add(hash);
					queue.push({x: c[0], y: c[1], dist: now.dist + 1, numString: numString, part2: part2});
				}
			}
		}
		return [smallest, smallestPt2];

	}

}
