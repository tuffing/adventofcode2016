class DayThirteen {
	constructor() {
	}

	Solution(x,y, fav) {
		let queue = new Queue();
		let visited = new Map();
		queue.push({'x': 1,'y': 1,'d':0});
		visited.set(`0,0`, 0);

		let target = 0;
		let count = 0;

		while (queue.first != null) {
			let n = queue.pop();

			if (n.d <= 50)
				count++;

			if (n.x === x && n.y === y) {
				target = n.d;
			}

			let coords = [[n.x-1,n.y],[n.x+1,n.y], [n.x,n.y-1],[n.x,n.y+1]];

			for (let c of coords) {
				if (c[0] < 0 || c[1] < 0 || c[0] > 50 || c[1] > 50)
					continue;

				if (this.IsOpen(c[0],c[1], fav) && !visited.has(`${c[0]},${c[1]}`)) {
					visited.set(`${n.x},${n.y}`, n.d + 1);
					queue.push({'x': c[0],'y': c[1],'d': n.d + 1});
				}
			}
		}

		return [target, count];
	}

	IsOpen(x,y,fav) {
		if (x < 0 || y < 0) {
			return false;
		}

		let seed = (x*x) + (3*x )+ (2*x*y) + y + (y*y);
		seed += fav;
		let test = (seed >>> 0).toString(2);
		let ones = (seed >>> 0).toString(2).match(/1/g).length; 

		return ones % 2 === 0;
	}

}
