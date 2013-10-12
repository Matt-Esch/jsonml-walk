var test = require("tape")

var jsonmlWalk = require("../index")

test("jsonmlWalk is a function", function (assert) {
    assert.equal(typeof jsonmlWalk, "function")
    assert.end()
})
