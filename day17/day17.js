class DaySeventeen {
	constructor() {
	}

	/**
	* This is just another BFS path find.
	* The exception here is that we don't keep track of visited.
	* Instead we track the path in the queue, and build up that queue as we go.
	* We keep exploring a path until either it gets locked in or it makes it to the end... this can get time involved.
	* I'm making the assumption that the examples and supplied input has been tested that there is a final deadend. 
	* Otherwise an infinite loop is 100% possible
	**/
	Solution(seed) {
		let dirs = ['U', 'D', 'L', 'R'];
		let maxXY = 3;

		let part1 = false;
		let part2 = 0;

		let queue = new Queue();
		queue.push({'x': 0, 'y': 0, 'dist': 0, 'hist': ''});

		while (queue.first != null) {
			let cur = queue.pop();
			let hash =  SparkMD5.hash(seed + cur.hist);
			let doors = this.OpenDoors(hash);

			let coords = [{'x': cur.x, 'y': cur.y-1}, {'x': cur.x, 'y': cur.y+1}, {'x': cur.x-1, 'y': cur.y}, {'x': cur.x+1, 'y': cur.y}];

			for (let i = 0; i < 4; i++) {
				if (doors[i] && coords[i].x == maxXY && coords[i].y == maxXY) {
					if (!part1) {
						part1 = cur.hist + dirs[i];
					}
					if (part2 < (cur.hist + dirs[i]).length) {
						part2 = (cur.hist + dirs[i]).length;
					}
					continue;
				}

				if (coords[i].x < 0 || coords[i].x > maxXY || coords[i].y < 0 || coords[i].y > maxXY) {
					continue;
				}

				if (doors[i]) {
					queue.push({'x': coords[i].x, 'y': coords[i].y, 'dist': cur.dist + 1, 'hist': cur.hist + dirs[i]});
				}
			}
		}

		return [part1, part2];
	}

	OpenDoors(hash) {
		let open = ['b','c','d','e','f'];
		let states = [];
		for (let i = 0; i < 4; i++) {
			states.push(open.includes(hash[i]));
		}

		return states;
	}

}
