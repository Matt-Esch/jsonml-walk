var test = require("tape")

var Walker = require("../index")

test("Walker is a function", function (assert) {
    assert.equal(typeof Walker, "function")
    assert.end()
})

test("count tag names Walker", function (assert) {
    var countTagNames = Walker({
        onNode: function (selector, _, $, opts) {
            var context = opts.parent.context
            context.push(selector)
            return context
        },
        createContext: function () {
            return []
        }
    })

    var tagNames = countTagNames(["div", {}, [
        ["p", {}, [
            ["span", {}, [
                ["#text", { value: "hello" }, []]
            ]],
            ["b", {}, [
                ["#text", { value: "world" }, []]
            ]]
        ]]
    ]])

    assert.deepEqual(tagNames, ["div", "p", "span", "#text", "b", "#text"])
    assert.end()
})
