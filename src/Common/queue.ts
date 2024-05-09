export class Node {
  item: number[]
  next: Node | null
  constructor(item: number[]) {
    this.item = item
    this.next = null
  }
}

export class Queue {
  head: Node | null
  tail: Node | null
  length: number
  constructor() {
    this.head = null
    this.tail = null
    this.length = 0
  }

  push(item: number[]) {
    const node = new Node(item)
    if (this.head == null) {
      this.head = node
    } else {
      if (this.tail) this.tail.next = node
    }

    this.tail = node
    this.length += 1
  }

  pop() {
    const popItem = this.head
    if (this.head) this.head = this.head.next
    this.length -= 1
    return popItem?.item
  }
}
