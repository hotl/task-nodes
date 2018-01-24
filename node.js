class Node {
    constructor(data, execute, cb, next) {
        this.data = data
        this.execute = execute
        this.cb = cb
        this.next = null
    }
}

module.exports = Node