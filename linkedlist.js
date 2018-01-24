const Node = require('./node')

class LinkedList {
    constructor(head) {
        this.head = head
        this._length = 0
        this.generator = undefined
    }
}

LinkedList.prototype.add = function (node) {
    const newNode = new Node(node.data, node.execute, node.cb, node.next)
    let currentNode = this.head
    if (!currentNode) {
        this.head = newNode
        this.generator = this.execute(this.head)
        ++this._length
        return newNode
    }

    while (currentNode.next) {
        currentNode = currentNode.next
    }

    currentNode.next = newNode
    ++this._length

    return newNode
}

LinkedList.prototype.getNodeByIndex = function (index) {
    if (index < 0 || index >= this._length) return `Error: Index ${index} is out of range`
    let currentNode = this.head
    for (let i = 0; i < this._length; ++i) {
        if (i === index) return currentNode
        currentNode = currentNode.next
    }
    return `Error: could not find the node`
}

LinkedList.prototype.execute = function* (node) {
    let args = undefined
    while (node) {
        args = yield node.execute(this.generator, args)
        if (args['err']) {
            console.log(`Node ${node.data} yielded an argument : ${args['err']}`)
            node = node.cb
        }
        else node = node.next
    }
}

module.exports = LinkedList