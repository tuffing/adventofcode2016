class DayTwentyTwo {
	constructor() {
	}

	/**
    Node A is not empty (its Used is not zero).
    Nodes A and B are not the same node.
    The data on node A (its Used) would fit on node B (its Avail).
	*/
	part1(input) {
		//493 too low
		let rows = input.split('\n');
		rows = rows.map(x => x.match(/(\d+)/g).map(y => parseInt(y, 10)));
		//console.table(rows);

		//Filesystem(x y)              Size  Used  Avail  Use%
		let count = 0;

		for (let i = 0; i < rows.length; i++) {
			let nodeA = rows[i];
			if (nodeA[3] === 0) {
				console.log(nodeA);
				continue;
			}

			count += rows.filter(r => r != nodeA && r[4] >= nodeA[3]).length;
		}


		return count;
	}

	part2(puzzle, startX, startY, gStartX, gStartY) {
		let visited = new Map();
		//var queue = new PriorityQueue({ comparator: function(a, b) { return a.score - b.score; }});
		var queue = new Queue();
		queue.push({x: startX, y: startY, gX: gStartX, gY: gStartY, dist: 0});

		while (queue.first != null) {
			let now = queue.pop();
			let coords = [[now.x-1, now.y], [now.x+1, now.y], [now.x,now.y-1], [now.x,now.y+1]];

			for (let c of coords) {
				if (!puzzle.has(`${c[0]},${c[1]}`) || puzzle.get(`${c[0]},${c[1]}`) == '#')
					continue;

				let newGX = now.gX;
				let newGY = now.gY;

				if (c[0] === newGX && c[1] === newGY) {
					newGX = now.x;
					newGY = now.y;
				}

				if (newGX === 0 && newGY === 0)
					return now.dist + 1;

				let hash = `${c[0]},${c[1]},${newGX},${newGY}`;
				let tests= visited.get(hash);
				if (!visited.has(hash)) {
					visited.set(hash, now.dist+1);
					//let score = Math.abs((Math.abs(c[0]) - Math.abs(newGX)) + (Math.abs(c[1]) - Math.abs(newGY)));
					queue.push({x: c[0], y: c[1], gX: newGX, gY: newGY, dist: now.dist + 1});
				}
			}
			//console.log('a');
		}

		return 0;
	}

	convertToPuzzle(input, gX, gY) {
		let rows = input.split('\n');
		rows = rows.map(x => x.match(/(\d+)/g).map(y => parseInt(y, 10)));

		let puzzle = new Map();
		let startX = 0;
		let startY = 0;

		for (let r of rows) {
			let val = '.';
			if (r[3] === 0) {
				//val = '_';	
				startX = r[0]		
				startY = r[1]		
			}
			else if (r[3] > 100) {
				val = '#';
			}

			//if (r[0] === gX && r[1] === gY) 
			//	val = 'G';

			puzzle.set(`${r[0]},${r[1]}`, val);
		}

		return {startX: startX, startY: startY, puzzle: puzzle};
	}
}
