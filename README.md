# byte-data
Readable data to and from byte buffers.  
Copyright (c) 2017 Rafael da Silva Rocha.  
https://github.com/rochars/byte-data

[![Build Status](https://travis-ci.org/rochars/byte-data.svg?branch=master)](https://travis-ci.org/rochars/byte-data) [![Build status](https://ci.appveyor.com/api/projects/status/g2ellp44s7a0kvid?svg=true)](https://ci.appveyor.com/project/rochars/byte-data) [![codecov](https://codecov.io/gh/rochars/byte-data/branch/master/graph/badge.svg)](https://codecov.io/gh/rochars/byte-data) [![NPM version](https://img.shields.io/npm/v/byte-data.svg?style=flat)](https://www.npmjs.com/package/byte-data) [![NPM downloads](https://img.shields.io/npm/dm/byte-data.svg?style=flat)](https://www.npmjs.com/package/byte-data)

## Install
```
npm install byte-data
```

For Node.js and the browser.

### Support:
- booleans
- 2-bit integers (signed/unsigned)
- 4-bit integers (signed/unsigned)
- 8-bit integers (signed/unsigned)
- 16-bit integers (signed/unsigned)
- 16-bit half precision floating point numbers
- 24-bit integers (signed/unsigned)
- 32-bit integers (signed/unsigned)
- 32-bit single precision floating point numbers
- 40-bit integers (signed/unsigned)
- 48-bit integers (signed/unsigned)
- 64-bit double precision floating point numbers
- Strings

## Example
```javascript
let byteData = require('byte-data');

// Signed 24-bit integers from a byte buffer
let numbers = byteData.fromBytes(buffer, 24, {"signed": true});

// 16-bit half-precision float numbers from bytes represented as binary strings
console.log(
    byteData.fromBytes(
        ["00110101", "01010101"],
        16, 
        {"base": 2, "float": true}
    )
);
// 0.33325

// 32-bit floating point numbers to bytes represented as hexadecimal values
byteData.toBytes([2.1474836], 32, {"base": 16,  "float": true});
// ["5f","70","9","40"]

// 32-bit signed integers to and from binary form
byteData.toBytes([-2147483648, 2147483647], 32);
//[0,0,0,128,255,255,255,127]
byteData.fromBytes([0,0,0,128,255,255,255,127], 32, {"signed": true});
//[-2147483648, 2147483647]
```

## Use
```javascript
/**
 * Turn numbers and strings to bytes.
 * @param {!Array<number>|string} values The data.
 * @param {number} bitDepth The bit depth of the data.
 *   Possible values are 1, 2, 4, 8, 16, 24, 32, 40, 48 or 64.
 * @param {Object} options The options:
 *   - "float": True for floating point numbers. Default is false.
 *       This option is available for 16, 32 and 64-bit numbers.
 *   - "base": The base of the output. Default is 10. Can be 2, 10 or 16.
 *   - "char": If the bytes represent a string. Default is false.
 *   - "be": If the values are big endian. Default is false (little endian).
 *   - "buffer": If the bytes should be returned as a Uint8Array.
 *       Default is false (bytes are returned as a regular array).
 * @return {!Array<number>|Uint8Array} the data as a byte buffer.
 */
toBytes(numbers, bitDepth);

/**
 * Turn a byte buffer into what the bytes represent.
 * @param {!Array<number>|Uint8Array} buffer An array of bytes.
 * @param {number} bitDepth The bit depth of the data.
 *   Possible values are 1, 2, 4, 8, 16, 24, 32, 40, 48 or 64.
 * @param {Object} options The options. They are:
 *   - "signed": If the numbers are signed. Default is false (unsigned).
 *   - "float": True for floating point numbers. Default is false.
 *       This option is available for 16, 32 and 64-bit numbers.
 *   - "base": The base of the input. Default is 10. Can be 2, 10 or 16.
 *   - "char": If the bytes represent a string. Default is false.
 *   - "be": If the values are big endian. Default is false (little endian).
 *   - "single": If it should return a single value instead of an array.
 *       Default is false.
 * @return {!Array<number>|string}
 */
fromBytes(buffer, bitDepth);

/**
 * Find and return the start index of some string.
 * Return -1 if the string is not found.
 * @param {!Array<number>|Uint8Array} bytes Array of bytes.
 * @param {string} chunk Some string to look for.
 * @return {number} The start index of the first occurrence, -1 if not found
 */
byteData.findString(bytes, "chunk");

// Presets for options
floatLE // {"float": true, "single": true};
intLE // {"signed": true, "single": true};
uIntLE // {"single": true};
floatBE // {"float": true, "single": true, "be": true};
intBE // {"signed": true, "single": true, "be": true};
uIntBE // {"single": true, "be": true};
char // {"char": true, "single": true};

floatArrayLE // {"float": true};
intArrayLE // {"signed": true};
uIntArrayLE // {};
floatArrayBE // {"float": true, "be": true};
intArrayBE // {"signed": true, "be": true};
uIntArrayBE // {"be": true};
str // {"char": true};

// Using a preset
byteData.fromBytes([0,0,0,128,255,255,255,127], 32, byteData.intArrayLE);
// [-2147483648, 2147483647]

byteData.fromBytes([0,0,0,128,255,255,255,127], 32, byteData.intLE);
// -2147483648
```

### Pack your nibbles
Packing nibbles:
```javascript
byteData.packNibbles([15, 15, 1, 4, 1, 15]);
//[255, 20, 31]);
```
This will pack 2 nibbles into one byte.

Unpacking nibbles:
```javascript
byteData.unpackNibbles([255, 20, 31]);
//[15, 15, 1, 4, 1, 15]
```

### Pack your crumbs
Packing crumbs:
```javascript
byteData.packCrumbs([3,3,3,3,1,2,3,0,1,1,0,0]);
//[255, 108, 80]);
```
This will pack 4 crumbs into one byte.

Unpacking crumbs:
```javascript
byteData.unpackCrumbs([108]);
//[1, 2, 3, 0]
```

### Pack your booleans
Packing booleans:
```javascript
byteData.packBooleans([0,0,0,0,0,0,0,0,0,1,0,0,1,1,0,0]);
//[0,76]);
```
This will pack 8 booleans into one byte.

Unpacking booleans:
```javascript
byteData.unpackBooleans([77]);
//[0,1,0,0,1,1,0,1]
```

## LICENSE
Copyright (c) 2017 Rafael da Silva Rocha.

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
