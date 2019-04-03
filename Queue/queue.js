class Queue {
	constructor() {
		this.first = null;
		this.last = null;
	}

	push(value) {
		let newNode = new QueueNode(value);
		if (this.first == null) {
			this.first = newNode;
			this.last = newNode;
		}
		else {
			this.last.next = newNode;
			this.last = newNode;
		}
	}

	pop(value) {
		let node = this.first;
		this.first = node.next;
		
		if (node.next == null) {
			this.last = null;
		}

		return node.value;	
	}

	[Symbol.iterator]() {
		var current = this.first;

		return {
			next: () => { 
				let value = null;
				let done = current == null;

				if (!done) {
					value = current.value;
					current = current.next;
				}

				return { value: value, done: done }}
		};
	};

}

class QueueNode {
	constructor(value) {
		this.value = value;
		this.next = null;
	}
}