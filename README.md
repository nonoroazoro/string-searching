# string-searching [![NPM Verison](https://img.shields.io/npm/v/string-searching.svg)](https://www.npmjs.com/package/string-searching) [![Build Status](https://travis-ci.org/nonoroazoro/string-searching.svg?branch=master)](https://travis-ci.org/nonoroazoro/string-searching)

### Features:
Fast string searching algorithms, including:

- [Boyer-Moore Algorithm](https://en.wikipedia.org/wiki/Boyer%E2%80%93Moore_string_search_algorithm)

### Installation:
```bash
$ npm install --save string-searching
```

### Syntax
```js
.boyer_moore(text, pattern[, recursive])
```

### Example:
```js
const ss = require("string-searching");
const text = "HERE IS A SIMPLE EXAMPLE";
const pattern = "EXAMPLE";

// search first index of pattern (like the String.prototype.indexOf() do).
const index = ss.boyer_moore(text, pattern);

// or passing true to search all patterns.
const indexes = ss.boyer_moore(text, pattern, true);
```