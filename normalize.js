var Node = require("./node.js")

var isArray = require("./lib/is-array.js")
var isObject = require("./lib/is-object.js")
var isString = require("./lib/is-string.js")

module.exports = normalize

function normalize(node) {
    var head = node[0]
    var properties
    var children

    if (!isString(head)) {
        throw new Error("head should be a string")
    }

    if (node.length > 3) {
        throw new Error("Invalid node length")
    } else if (node.length === 1) {
        properties = {}
        children = []
    } else if (node.length === 2) {
        properties = node[1]
        if (isArray(properties)) {
            children = properties
            properties = {}
        } else if (!isObject(properties)) {
            children = []
        } else {
            throw new Error("Node type should be [String, Object, Array]")
        }
    } else if (node.length === 3) {
        properties = node[1]
        children = node[2]

        if (!isObject(properties)) {
            throw new Error("Invalid properties type")
        }

        if (!isArray(children)) {
            throw new Error("Invalid child list")
        }
    }

    return new Node(head, properties, children)
}
