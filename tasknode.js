class Node {
    constructor(data, execute, cb, next) {
        this.data = data
        this.execute = execute
        this.cb = cb
        this.next = null
    }
}

class LinkedList {
    constructor(head) {
        this.head = head
        this._length = 0
        this.generator = undefined
    }
}

LinkedList.prototype.add = function(node) {
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

LinkedList.prototype.getNodeByIndex = function(index) {
    if (index < 0 || index >= this._length) return `Error: Index ${index} is out of range`
    let currentNode = this.head
    for (let i = 0; i < this._length; ++i) {
        if (i === index) return currentNode
        currentNode = currentNode.next
    }
    return `Error: could not find the node`
}

LinkedList.prototype.execute = function*(node) {
    let args = undefined, tempNode = node
    while (node) {
        args = yield node.execute(this.generator, args)
        if (args['err']) {
            console.log(`Node ${node.data} yielded an argument : ${args['err']}`)
            node = node.cb
        }
        else node = node.next
    }
}

// Success Callback Functions

const f1 = (generator, args) => {
    console.log(`waiting for 5 seconds, received args: ${JSON.stringify(args, null, 3)}`)
    setTimeout(() => {
        generator.next({
            arg: 'argument'
        })
    }, 3000)
}

const f2 = (generator, args) => {
    console.log(`waiting for 6 seconds, received args: ${JSON.stringify(args, null, 3)}`)
    setTimeout(() => {
        generator.next({
            // err: 'Error in f2, begin rolling back'
            arg: 'argument'
        })
    }, 4000)
}

const f3 = (generator, args) => {
    console.log(`waiting for 7 seconds, received args: ${JSON.stringify(args, null, 3)}`)
    setTimeout(() => {
        generator.next({
            // arg: 'argument'
            err: 'Error in f3()'
        })
    }, 5000)
}

const f4 = (generator, args) => console.log(`Finished with sequence, received args: ${JSON.stringify(args, null, 3)}`)

// Error Callback Functions

const f1cb = (generator, args) => console.log(`Finished with callback sequence, received args: ${JSON.stringify(args, null, 3)}`)

const f2cb = (generator, args) => {
    console.log(`undoing 5 second timeout, received args: ${JSON.stringify(args, null, 3)}`)
    setTimeout(() => {
        generator.next({
            arg: 'argument'
        })
    }, 3000)
}

const f3cb = (generator, args) => {
    console.log(`undoing 6 second timeout, received args: ${JSON.stringify(args, null, 3)}`)
    setTimeout(() => {
        generator.next({
            arg: 'argument'
        })
    }, 4000)
}

const f4cb = (generator, args) => {
    console.log(`undoing 7 second timeout, received args: ${JSON.stringify(args, null, 3)}`)
    setTimeout(() => {
        generator.next({
            arg: 'argument'
        })
    }, 5000)
}



// Define Callback Nodes + Callback LinkedList
const CallbackNodes = [
    new Node('cbtask4', f4cb),
    new Node('cbtask3', f3cb),
    new Node('cbtask2', f2cb),
    new Node('cbtask1', f1cb)
]
const CbNodeLL = new LinkedList()
CallbackNodes.forEach((value, index) => index + 1 <= CallbackNodes.length && CbNodeLL.add(value))

// Create Task Linked List + Add Task Task Nodes
const TaskNodeLL = new LinkedList()
const TaskNodes = [
    new Node('task1', f1, CbNodeLL.getNodeByIndex(3)),
    new Node('task2', f2, CbNodeLL.getNodeByIndex(2)),
    new Node('task3', f3, CbNodeLL.getNodeByIndex(1)),
    new Node('task4', f4, CbNodeLL.getNodeByIndex(0))
]

TaskNodes.forEach((value, index) => index + 1 <= TaskNodes.length && TaskNodeLL.add(value) )

// Begin LinkedList generator sequence
TaskNodeLL.generator.next()
