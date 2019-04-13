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
}
