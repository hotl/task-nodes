const LinkedList = require('./linkedlist')
const Node       = require('./node')
const tasks      = require('./tasks')
const callbacks  = require('./callbacks')

// Define Callback Nodes + Callback LinkedList
const CbNodeLL = new LinkedList()
const CallbackNodes = [
    new Node('cbtask4'),
    new Node('cbtask3'),
    new Node('cbtask2'),
    new Node('cbtask1')
]

CallbackNodes.forEach((value, index) => value.execute = callbacks[callbacks.length - index])
CallbackNodes.forEach((value, index) => index + 1 <= CallbackNodes.length && CbNodeLL.add(value))

// Create Task Linked List + Add Task Task Nodes
const TaskNodeLL = new LinkedList()
const TaskNodes = [
    new Node('task1'),
    new Node('task2'),
    new Node('task3'),
    new Node('task4')
]

TaskNodes.forEach((value, index) => {
    value.execute = tasks[index]
    value.cb = CbNodeLL.getNodeByIndex(index)
})
TaskNodes.forEach((value, index) => index + 1 <= TaskNodes.length && TaskNodeLL.add(value) )

// Begin LinkedList generator sequence
TaskNodeLL.generator.next()
