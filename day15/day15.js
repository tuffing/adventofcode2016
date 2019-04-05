class DayFifteen {
	constructor() {
	}

	/**todays problem was so trivial it was faster to just hard code in the input**/
	Part1() {
		let i = 0;
		while (true) {
			/*Disc #1 has 7 positions; at time=0, it is at position 0.
			Disc #2 has 13 positions; at time=0, it is at position 0. 121834
			Disc #3 has 3 positions; at time=0, it is at position 2.
			Disc #4 has 5 positions; at time=0, it is at position 2.
			Disc #5 has 17 positions; at time=0, it is at position 0.
			Disc #6 has 19 positions; at time=0, it is at position 7.*/
			if ((1+0+i) % 7 === 0 
				&& (2+0+i) % 13 === 0 
				&& (3+2+i) % 3 === 0 
				&& (4+2+i) % 5  === 0 
				&& (5+0+i) % 17 === 0 
				&& (6+7+i) % 19  === 0) {
				//&& (7+0+i) % 11  === 0) {
				return i;
			}
			i++;
		}

		return null;
	}

	Part2() {
		let i = 0;
		while (true) {
			if ((1+0+i) % 7 === 0 
				&& (2+0+i) % 13 === 0 
				&& (3+2+i) % 3 === 0 
				&& (4+2+i) % 5  === 0 
				&& (5+0+i) % 17 === 0 
				&& (6+7+i) % 19  === 0
				&& (7+0+i) % 11  === 0) {
				return i;
			}
			i++;
		}

		return null;
	}

	Gcd(a,b) {
		if (!b) {
			return a;
		}
		console.log(`${a},${b}`);
		return this.Gcd(b, a % b);
	}

	/*Find the inverse of a prime mod (https://www.geeksforgeeks.org/multiplicative-inverse-under-modulo-m/)
	Fermat's little theorem */
	Power(x,y,m) {
		if (y == 0)
			return 1;

		let p = this.Power(x,parseInt(y/2),m) %m;
		p = (p*p)%m;

		return (y%2==0)?p:(x*p) %m;
	}


	/*
	  Chinese Remainder theorem.
	  http://homepages.math.uic.edu/~leon/mcs425-s08/handouts/chinese_remainder.pdf

	  jist of the algorithm is: 
	  1. get the result of multiplying all the mods together.
	  2. calculate the expecting remainder per disc (this would be the (discs mod - step - starting position) % the discs mod )
	  	note: % in this case means mod, not remainder. so will need to handle negatives correctly.
	  3. get the result of the mod of every other disc but this one multiplied (aka step 1 / this discs mod)
	  4. Find the inverse mod of step 3 and the discs mod. As our mods are always prime numbers we can use Fermats theorom.
	  5. To a running total across all the discs add (step2 * step3 * step4)
	  6. Once this running total is completed our answer is: this running total % step 1
	*/
	CRTSol(vals) {
		let m = vals.reduce((a,b) => { return a * b.m }, 1);
		//console.log(m);
		let running = 0;
		vals.forEach((x) => {
			//expected remainer shifts based on what step it is and the starting position
			let r = x.m - x.s - x.p;
			r = r < 0 ? x.m + r : r % x.m;

			let z = m / x.m;
			
			let modi = this.Power(z, x.m-2, x.m);
			
			let w = r * z * modi;
			
			running += w;
		});

		return running % m;
	}
}
