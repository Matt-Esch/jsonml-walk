var walk = require("./index.js")
var console = require("console")

// Log all tag names pre-order
walk(["div", [
    ["p", [
        ["span", ["hello"]],
        ["b", ["world"]]
    ]]
]], {
    before: function(node, opts) {
        console.log(node.head)
    }
})
// -> div
// -> p
// -> span
// -> b

walk(["div", [
    ["p", [
        ["span", ["hello"]],
        ["b", ["world"]]
    ]]
]], {
    textNode: function(text, opts) {
        console.log(text)
    }
})
// -> hello
// -> world