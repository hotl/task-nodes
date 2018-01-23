<h1>Task Nodes</h1>

<p>This repository contains custom Linked List + Node classes</p>
<p>This is essentially a POC to migrate our provisioning services away from dependency on the async module</p>

<ul>
Current Issues with provisioning service:<br>
    &nbsp;&nbsp;=> No rollback enabled. Created resources are no longer manageable in the event of a failure<br>
        <ul>
        &nbsp;&nbsp;&nbsp;&nbsp;=> Resources are not connected to dependencies<br>
        &nbsp;&nbsp;&nbsp;&nbsp;=> Resources cannot be destroyed by provisioning service<br>
        &nbsp;&nbsp;&nbsp;&nbsp;=> Resources exist on multiple platforms. This makes it troublesome to destroy a stack<br>
        </ul>
    &nbsp;&nbsp;=> Dependency on async module<br>
        <ul>
        &nbsp;&nbsp;&nbsp;&nbsp;=> Code style is restricted to fit the needs of the async module<br>
        &nbsp;&nbsp;&nbsp;&nbsp;=> Code style often falls victim to 'Callback Hell' by newer members of the team<br>
        </ul>
</ul>

<ul>
Requirements:<br>
    &nbsp;&nbsp;=> Must enfore synchronous behavior for tasks<br>
    &nbsp;&nbsp;=> Must be capable of rolling back upon encountering errors<br>
    &nbsp;&nbsp;=> Must enforce canonical order<br>
    &nbsp;&nbsp;=> Must allow Nodes to execute custom defined logic<br>
    &nbsp;&nbsp;=> Must be overridable<br>
        &nbsp;&nbsp;&nbsp;&nbsp;=> Developing LinkedList class as a generic allows for further extendability<br>
    &nbsp;&nbsp;&nbsp;&nbsp;=> Nodes should be lexical containers for logic<br>
        &nbsp;&nbsp;&nbsp;&nbsp;=> Node instances should represent wrappers around functions<br>
        &nbsp;&nbsp;&nbsp;&nbsp;=> Function-to-Node instance must have 1:1 relationship<br>
</ul>
Overview:

***************************
    identifier: meta-data about the node instance to serve as identification (i.e. function name, function purpose, node sequence identifier etc)
    execute:    logic to be executed when yielded by LinkedList
    callback:   Node instance to assume new LinkedList head
                Sequence will continue according to this Node
                This node property should only be called upon encountering error(s)
    next:       Node instance next in the sequence

    Node {
        String identifier
        function execute
        Node callback
        Node next
    }

***************************
    

***************************
    head:      Node instance representing the beginning of the LinkedList instance
    _length:   Integer representing the number of Node instances encapsulated in LinkedList instance
    generator: Iterator to yield Nodes synchronous for execution

    LinkedList {
        Node head
        int _length
        iterator generator
    }

    add:            function to add a Node to the LinkedList
    getNodeByIndex: function to return a Node based on indexing
    execute:        function to yield the next Node's execution logic in the LinkedList sequence

    LinkedList.prototype {
        function add
        function getNodeByIndex
        execute
    }

***************************
