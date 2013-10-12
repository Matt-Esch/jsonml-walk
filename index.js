var normalize = require("./normalize.js")
var isArray = require("./lib/is-array.js")
var isObject = require("./lib/is-object.js")
var isString = require("./lib/is-string.js")

module.exports = walk

function walk(node, opts) {
    opts = opts || {}
    var beforeAll = opts.beforeAll
    var afterAll = opts.afterAll
    beforeAll && beforeAll(node, opts)
    recursiveWalk(node, opts)
    afterAll && afterAll(node, opts)
}

function recursiveWalk(node, opts) {
    var parents = opts.parents || (opts.parents = [])
    var before = opts.before
    var after = opts.after
    var plugin = opts.plugin
    var textNode = opts.textNode

    if (!isArray(node)) {
        if (isObject(node)) {
            return plugin && plugin(node, opts)
        } else if (isString(node)) {
            return textNode && textNode(node)
        } else {
            throw new Error("Invalid node type")
        }
    }

    var normal = normalize(node)
    var children = normal.children

    // Process the head
    before && before(normal, opts)

    // Process the children
    if (children.length > 0) {
        parents.unshift(node)
        for (var i = 0; i < children.length; i += 1) {
            recursiveWalk(children[i], opts)
        }
        parents.shift()
    }

    after && after(normal, opts)
}
