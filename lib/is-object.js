var toString = Object.prototype.toString

module.exports = isObject

function isObject(obj) {
    return toString.call(obj) === "[object Object]"
}
