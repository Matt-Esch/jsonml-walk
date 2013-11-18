var extend = require("xtend")

module.exports = Walker

/*  
    type WalkerOptions<ContextT, OptionsT> := OptionsT & {
        parent: null | { context: ContextT, tree: JsonML },
        parents: Array<{ context: ContextT, tree: JsonML }>
    }

    Walker := ({
        onNode: (
            selector: String,
            properties: Object,
            children: Array<JsonML>,
            options: WalkerOptions<ContextT, OptionsT>
        ) => ContextT,
        onNodeAfter: (
            selector: String,
            properties: Object,
            children: Array<JsonML>,
            options: WalkerOptions<ContextT, OptionsT>
        ) => ContextT,
        onPlugin: (
            plugin: Object, 
            options: WalkerOptions<ContextT, OptionsT>
        ) => ContextT
    }) => (tree: JsonML, options: OptionsT) => ContextT

*/
function Walker(options) {
    var onPlugin = options.onPlugin
    var onNode = options.onNode
    var onNodeAfter = options.onNodeAfter
    var createContext = options.createContext

    return walker

    function walker(tree, opts) {
        opts = opts || {}

        if (!opts.parent) {
            var context = createContext ? createContext(tree, opts) : null
            opts.parent = { context: context, tree: null }
        }
        if (!opts.parents) {
            opts.parents = []
        }

        var isArray = Array.isArray(tree)

        if (isArray) {
            var selector = tree[0]
            var properties = tree[1]
            var children = tree[2]

            var context = onNode(selector, properties, children, opts)
            var parent = { context: context, tree: tree }
            var childOpts = extend(opts, {
                parent: parent,
                parents: opts.parents.concat(parent)
            })

            for (var i = 0; i < children.length; i++) {
                walker(children[i], childOpts)
            }

            if (onNodeAfter) {
                context = onNodeAfter(selector, properties, children, opts)
            }
            return context
        } else if (isPlugin(tree, isArray)) {
            return onPlugin(tree, opts)
        } else {
            throw new Error("invalid JsonML tree: " + JSON.stringify(tree))
        }
    }
}

function isPlugin(obj, isArray) {
    return !isArray && (isObject(obj) || typeof obj === "function")
}

function isObject(obj) {
    return typeof obj === "object" && obj !== null
}
