var test = require("tape")

var Walker = require("../index")

var smallSample = ["div", {}, [
    ["p", {}, [
        ["span", {}, [
            ["#text", { value: "hello" }, []]
        ]],
        ["b", {}, [
            ["#text", { value: "world" }, []]
        ]]
    ]]
]]
var samplePage = ["html", {}, [
    ["head", { className: "head" }, [
        ["meta", { charset: "utf-8" }, []],
        ["title", {}, [
            ["#text", { value: "Process dashboard" }, []]
        ]],
        ["link", { rel: "stylesheet", href: "/less/main"}, []]
    ]],
    ["body", { class: "main" }, [
        ["script", { src: "/browserify/main" }, []]
    ]]
]]

var primitiveTree = ["div", {}, [
    { color: "red", primitive: "color", elem: ["span", {}, [
        ["#text", { value: "red" }, []]
    ]] },
    { color: "blue", primitive: "color", elem: ["span", {}, [
        ["#text", { value: "blue" }, []]
    ]] },
    { color: "green", primitive: "color", elem: ["span", {}, [
        ["#text", { value: "green" }, []]
    ]] }
]]

function appendContext(opts, item) {
    var context = opts.parent.context
    context.push(item)
    return context
}

test("Walker is a function", function (assert) {
    assert.equal(typeof Walker, "function")
    assert.end()
})

test("count tag names Walker", function (assert) {
    var countTagNames = Walker({
        onNode: function (opts, selector) {
            return appendContext(opts, selector)
        },
        createContext: function () {
            return []
        }
    })

    var tagNames = countTagNames(smallSample)

    assert.deepEqual(tagNames, ["div", "p", "span", "#text", "b", "#text"])

    var pageTags = countTagNames(samplePage)

    assert.deepEqual(pageTags, [
        "html", "head", "meta", "title", "#text", "link", "body", "script"
    ])

    assert.end()
})

test("can serializeTags", function (assert) {
    var serializeTags = Walker({
        onNode: function (opts, selector) {
            if (selector === "#text") {
                return opts.parent.context
            }

            return appendContext(opts, "<" + selector + ">")
        },
        onNodeAfter: function (opts, selector) {
            if (selector === "#text") {
                return opts.parent.context
            }

            return appendContext(opts, "</" + selector + ">")
        },
        createContext: function () {
            return []
        }
    })

    var smallHtml = serializeTags(smallSample).join("")

    assert.deepEqual(smallHtml, "<div><p><span></span><b></b></p></div>")

    var pageHtml = serializeTags(samplePage).join("")

    assert.deepEqual(pageHtml,
        "<html><head><meta></meta><title></title><link></link></head>" +
            "<body><script></script></body></html>")

    assert.end()
})

test("can build dom tree", function (assert) {
    var buildDOMTree = Walker({
        onNode: function (opts, selector) {
            var parentElem = opts.parent.context

            var elem = { tagName: selector, childNodes: [] }

            if (parentElem) {
                parentElem.childNodes.push(elem)
            }

            return elem
        }
    })

    var smallTree = buildDOMTree(smallSample)

    assert.equal(getTagName(smallTree, []), "div")
    assert.equal(getTagName(smallTree, [0]), "p")
    assert.equal(getTagName(smallTree, [0, 0]), "span")
    assert.equal(getTagName(smallTree, [0, 0, 0]), "#text")
    assert.equal(getTagName(smallTree, [0, 1]), "b")
    assert.equal(getTagName(smallTree, [0, 1, 0]), "#text")

    var pageTree = buildDOMTree(samplePage)

    assert.equal(getTagName(pageTree, []), "html")
    assert.equal(getTagName(pageTree, [0]), "head")
    assert.equal(getTagName(pageTree, [0, 0]), "meta")
    assert.equal(getTagName(pageTree, [0, 1]), "title")
    assert.equal(getTagName(pageTree, [0, 1, 0]), "#text")
    assert.equal(getTagName(pageTree, [0, 2]), "link")
    assert.equal(getTagName(pageTree, [1]), "body")
    assert.equal(getTagName(pageTree, [1, 0]), "script")

    assert.end()

    function getTagName(root, path) {
        var elem = root
        path.forEach(function (index) {
            elem = elem.childNodes[index]
        })
        return elem.tagName
    }
})

test("can parse primitives", function (assert) {
    var stringifyAndPrimitive = Walker({
        onNode: function (opts, selector) {
            return appendContext(opts, "<" + selector + ">")
        },
        onNodeAfter: function (opts, selector) {
            return appendContext(opts, "</" + selector + ">")
        },
        onPrimitive: function (opts, tree) {
            var primitives = opts.primitives
            var primitive = primitives[tree.primitive]

            return primitive(opts, tree)
        },
        createContext: function () {
            return []
        }
    })

    var primitives = { color: function (opts, tree) {
        var elem = tree.elem
        var color = tree.color

        return stringifyAndPrimitive(["span." + color, {}, [
            elem
        ]], opts)
    } }

    var tree = stringifyAndPrimitive(primitiveTree, {
        primitives: primitives
    }).join("")

    assert.equal(tree, "<div>" +
        "<span.red><span><#text></#text></span></span.red>" +
        "<span.blue><span><#text></#text></span></span.blue>" +
        "<span.green><span><#text></#text></span></span.green>" +
        "</div>")

    assert.end()
})
