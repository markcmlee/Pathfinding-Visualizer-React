import { text } from "body-parser";

export default class PriorityQueue {
  constructor(comparator = (a, b) => a.prio - b.prio) {
    this.items = [];
    this.comparator = comparator;
    this.length = 0;
  }

  enqueue(value) {
    this.length += 1;
    this.items.push(value);
    this.bubbleUp();
  }

  dequeue(index = 0) {
    if (!this.length || this.length === 0) return null;
    this.swap(index, this.length - 1);
    const value = this.items.pop();
    this.bubbleDown(index);
    this.length -= 1;
    return value;
  }

  peek() {
    return this.items[0];
  }

  clear() {
    this.items = [];
    this.length = 0;
  }

  bubbleUp() {
    let index = this.length - 1;
    const parent = (i) => Math.ceil(i / 2 - 1);
    while (parent(index) >= 0 && this.comparator(parent(index), index) > 0) {
      this.swap(parent(index), index);
      index = parent(index);
    }
  }

  bubbleDown(index = 0) {
    let curr = index;
    const left = (i) => 2 * i + 1;
    const right = (i) => 2 * i + 2;
    const getTopChild = (i) =>
      right(i) < this.length && this.comparator(left(i), right(i)) > 0
        ? right(i)
        : left(i);

    while (
      left(curr) < this.length &&
      this.comparator(curr, getTopChild(curr)) > 0
    ) {
      const next = getTopChild(curr);
      this.swap(curr, next);
      curr = next;
    }
  }

  swap(a, b) {
    const temp = a;
    a = b;
    b = temp;
  }
}

const test = new PriorityQueue();
console.log(test.length);
test.enqueue({ x: 1, y: 1, prio: 1 });
console.log(test.length);
test.enqueue({ x: 2, y: 2, prio: 2 });
console.log(test.length);
test.enqueue({ x: 3, y: 3, prio: 3 });
console.log(test.length);

console.log(test.peek());
// test.clear()
// console.log(test.length);

console.log(test.dequeue());
console.log(test.length);
console.log(test.dequeue());
console.log(test.length);
console.log(test.dequeue());
console.log(test.length);
