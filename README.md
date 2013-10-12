# jsonml-walk

<!--
    [![build status][1]][2]
    [![NPM version][3]][4]
    [![Coverage Status][5]][6]
    [![gemnasium Dependency Status][7]][8]
    [![Davis Dependency status][9]][10]
-->

<!-- [![browser support][11]][12] -->

Walk a jsonml

## Example

```js
var walk = require("jsonml-walk")

// Log all tag names pre-order
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

// Log all text nodes pre-order
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
```

## Installation

`npm install jsonml-walk`

## Contributors

 - Matt-Esch

## MIT Licenced

  [1]: https://secure.travis-ci.org/Matt-Esch/jsonml-walk.png
  [2]: https://travis-ci.org/Matt-Esch/jsonml-walk
  [3]: https://badge.fury.io/js/jsonml-walk.png
  [4]: https://badge.fury.io/js/jsonml-walk
  [5]: https://coveralls.io/repos/Matt-Esch/jsonml-walk/badge.png
  [6]: https://coveralls.io/r/Matt-Esch/jsonml-walk
  [7]: https://gemnasium.com/Matt-Esch/jsonml-walk.png
  [8]: https://gemnasium.com/Matt-Esch/jsonml-walk
  [9]: https://david-dm.org/Matt-Esch/jsonml-walk.png
  [10]: https://david-dm.org/Matt-Esch/jsonml-walk
  [11]: https://ci.testling.com/Matt-Esch/jsonml-walk.png
  [12]: https://ci.testling.com/Matt-Esch/jsonml-walk
