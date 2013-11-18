# jsonml-walk

<!--
    [![build status][1]][2]
    [![NPM version][3]][4]
    [![Coverage Status][5]][6]
    [![gemnasium Dependency Status][7]][8]
    [![Davis Dependency status][9]][10]
-->

<!-- [![browser support][11]][12] -->

Walk a loose jsonml tree with hooks

## Example

```js
var Walker = require("jsonml-walk")

var countTagNames = Walker({
    onNode: function (selector, opts) {
        var text = selector
        if (selector === "#text" && opts.value) {
            text += ":" + opts.value
        }
        console.log(text)
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

// -> div
// -> p
// -> span
// -> #text:hello
// -> b
// -> #text:world
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
