This repository contains custom Linked List + Node classes
This is essentially a POC to migrate our provisioning services away from dependency on the async module

Current Issues with provisioning service:
    => No rollback enabled. Created resources are no longer manageable in the event of a failure
        => Resources are not connected to dependencies
        => Resources cannot be destroyed by provisioning service
        => Resources exist on multiple platforms. This makes it troublesome to destroy a stack
    => Dependency on async module
        => Code style is restricted to fit the needs of the async module
        => Code style often falls victim to 'Callback Hell' by newer members of the team

Requirements:
    => Must enfore synchronous behavior for tasks
    => Must be capable of rolling back upon encountering errors
    => Must enforce canonical order
    => Must allow Nodes to execute custom defined logic
    => Must be overridable
        => Developing LinkedList class as a generic allows for further extendability
    => Nodes should be lexical containers for logic
        => Node instances should represent wrappers around functions
        => Function-to-Node instance must have 1:1 relationship

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