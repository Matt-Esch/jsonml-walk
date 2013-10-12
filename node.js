module.exports = Node

function Node(head, properties, children) {
    if (!this instanceof Node) {
        return new Node(head, properties, children)
    }

    this.head = head || ""
    this.properties = properties || {}
    this.children = children || []
}
