/*
 * byte-data
 * Pack and unpack binary data.
 * Copyright (c) 2017-2018 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

/** @private */
const endianness = require("endianness");
/** @private */
const GenericInteger = require("generic-integer");

/** @private */
let int8 = new Int8Array(4);
/** @private */
let i32 = new Int32Array(int8.buffer, 0, 1);
/** @private */
let f32 = new Float32Array(int8.buffer, 0, 1);
/** @private */
let int8f64 = new Int8Array(8);
/** @private */
let f64 = new Float64Array(int8f64.buffer);
/** @private */
let ui32 = new Uint32Array(int8f64.buffer);

/**
 * @type {Function}
 * @private
 */
let reader_;
/**
 * @type {Function}
 * @private
 */
let writer_;
/**
 * @type {Object}
 * @private
 */
let gInt_;

/**
 * Write a number or fixed-length string to a byte buffer.
 * @param {!number|!string} value The value.
 * @param {!Object} type One of the available types.
 * @param {!number} base The base of the output. Optional. Default is 10.
 *      Possible values are 2, 10 or 16.
 * @return {!Array<number|string>}
 */
function pack(value, type, base=10) {
    assureType_(type, base);
    if (value.constructor == String) {
        return toBytes_(value.slice(0, type["offset"]), type);
    }
    return toBytes_([value], type);
}

/**
 * Read a number or a fixed-length string from a byte buffer.
 * @param {!Array<number|string>|!Uint8Array} buffer An array of bytes.
 * @param {!Object} type One of the available types.
 * @param {!number} base The base of the input. Optional. Default is 10.
 *      Possible values are 2, 10 or 16.
 * @return {number|string}
 */
function unpack(buffer, type, base=10) {
    assureType_(type, base);
    let values = fromBytes_(buffer.slice(0, type["offset"]), type);
    if (type["char"]) {
        values = values.slice(0, type["offset"]);
    } else {
        values = values[0];
    }
    return values;
}

/**
 * Write an array of numbers or a string to a byte buffer.
 * @param {!Array<number>|string} values The values.
 * @param {!Object} type One of the available types.
 * @param {!number} base The base of the output. Optional. Default is 10.
 *      Possible values are 2, 10 or 16.
 * @return {!Array<number|string>}
 */
function packArray(values, type, base=10) {
    assureType_(type, base);
    return toBytes_(values, type);
}

/**
 * Read an array of numbers or a string from a byte buffer.
 * @param {!Array<number|string>|!Uint8Array} buffer The byte array.
 * @param {!Object} type One of the available types.
 * @param {!number} base The base of the input. Optional. Default is 10.
 *      Possible values are 2, 10 or 16.
 * @return {!Array<number>|string|number}
 */
function unpackArray(buffer, type, base=10) {
    assureType_(type, base);
    return fromBytes_(buffer, type);
}

/**
 * Write a struct to a byte buffer.
 * A struct is an array of values of not necessarily the same type.
 * @param {!Array<number|string>} struct The struct values.
 * @param {!Array<!Object>} def The struct type definition.
 * @param {!number} base The base of the output. Optional. Default is 10.
 *      Possible values are 2, 10 or 16.
 * @return {!Array<number|string>}
 */
function packStruct(struct, def, base=10) {
    if (struct.length < def.length) {
        return [];
    }
    let bytes = [];
    for (let i = 0; i < def.length; i++) {
        bytes = bytes.concat(pack(struct[i], def[i], base));
    }
    return bytes;
}

/**
 * Read a struct from a byte buffer.
 * A struct is an array of values of not necessarily the same type.
 * @param {!Array<number|string>|!Uint8Array} buffer The byte buffer.
 * @param {!Array<!Object>} def The struct type definition.
 * @param {!number} base The base of the input. Optional. Default is 10.
 *      Possible values are 2, 10 or 16.
 * @return {Array<number|string>}
 */
function unpackStruct(buffer, def, base=10) {
    if (buffer.length < getStructDefSize_(def)) {
        return [];
    }
    let struct = [];
    let j = 0;
    for (let i=0; i < def.length; i++) {
        struct = struct.concat(
                unpack(buffer.slice(j, j + def[i]["offset"]), def[i], base)
            );
        j += def[i]["offset"];
    }
    return struct;
}

/**
 * Read int values from bytes.
 * @param {!Array<number>|!Uint8Array} bytes An array of bytes.
 * @param {!number} i The index to read.
 * @return {!number}
 * @private
 */
function readInt_(bytes, i) {
    return gInt_.read(bytes, i);
}

/**
 * Read 1 16-bit float from bytes.
 * Thanks https://stackoverflow.com/a/8796597
 * @param {!Array<number>|!Uint8Array} bytes An array of bytes.
 * @param {!number} i The index to read.
 * @return {!number}
 * @private
 */
function read16F_(bytes, i) {
    let int = gInt_.read(bytes, i);
    let exponent = (int & 0x7C00) >> 10;
    let fraction = int & 0x03FF;
    let floatValue;
    if (exponent) {
        floatValue =  Math.pow(2, exponent - 15) * (1 + fraction / 0x400);
    } else {
        floatValue = 6.103515625e-5 * (fraction / 0x400);
    }
    return floatValue * (int >> 15 ? -1 : 1);
}

/**
 * Read 1 32-bit float from bytes.
 * @param {!Array<number>|!Uint8Array} bytes An array of bytes.
 * @param {!number} i The index to read.
 * @return {!number}
 * @private
 */
function read32F_(bytes, i) {
    i32[0] = gInt_.read(bytes, i);
    return f32[0];
}

/**
 * Read 1 64-bit double from bytes.
 * Thanks https://gist.github.com/kg/2192799
 * @param {!Array<number>|!Uint8Array} bytes An array of bytes.
 * @param {!number} i The index to read.
 * @return {!number}
 * @private
 */
function read64F_(bytes, i) {
    ui32[0] = gInt_.read(bytes, i);
    ui32[1] = gInt_.read(bytes, i + 4);
    return f64[0];
}

/**
 * Read 1 char from bytes.
 * @param {!Array<number>|!Uint8Array} bytes An array of bytes.
 * @param {!number} i The index to read.
 * @return {!string}
 * @private
 */
function readChar_(bytes, i) {
    let chrs = "";
    for(let j=0; j < gInt_.offset; j++) {
        chrs += String.fromCharCode(bytes[i+j]);
    }
    return chrs;
}

/**
 * Write a integer value to a byte buffer.
 * @param {!Array<number>} bytes An array of bytes.
 * @param {!number} number The number to write as bytes.
 * @param {!number} j The index being written in the byte buffer.
 * @return {!number} The next index to write on the byte buffer.
 * @private
 */
function writeInt_(bytes, number, j) {
    return gInt_.write(bytes, number, j);
}

/**
 * Write one 16-bit float as a binary value.
 * @param {!Array<number>} bytes An array of bytes.
 * @param {!number} number The number to write as bytes.
 * @param {!number} j The index being written in the byte buffer.
 * @return {!number} The next index to write on the byte buffer.
 * @private
 */
function write16F_(bytes, number, j) {
    f32[0] = number;
    let x = i32[0];
    let bits = (x >> 16) & 0x8000;
    let m = (x >> 12) & 0x07ff;
    let e = (x >> 23) & 0xff;
    if (e >= 103) {
        bits |= ((e - 112) << 10) | (m >> 1);
        bits += m & 1;
    }
    bytes[j++] = bits & 0xFF;
    bytes[j++] = bits >>> 8 & 0xFF;
    return j;
}

/**
 * Write one 32-bit float as a binary value.
 * @param {!Array<number>} bytes An array of bytes.
 * @param {!number} number The number to write as bytes.
 * @param {!number} j The index being written in the byte buffer.
 * @return {!number} The next index to write on the byte buffer.
 * @private
 */
function write32F_(bytes, number, j) {
    f32[0] = number;
    j = gInt_.write(bytes, i32[0], j);
    return j;
}

/**
 * Write one 64-bit float as a binary value.
 * @param {!Array<number>} bytes An array of bytes.
 * @param {!number} number The number to write as bytes.
 * @param {!number} j The index being written in the byte buffer.
 * @return {!number} The next index to write on the byte buffer.
 * @private
 */
function write64F_(bytes, number, j) {
    f64[0] = number;
    j = gInt_.write(bytes, ui32[0], j);
    return gInt_.write(bytes, ui32[1], j);
}

/**
 * Write one char as a byte.
 * @param {!Array<number>} bytes An array of bytes.
 * @param {!string} string The string to write as bytes.
 * @param {!number} j The index being written in the byte buffer.
 * @return {!number} The next index to write on the byte buffer.
 * @private
 */
function writeChar_(bytes, string, j) {
    bytes[j++] = string.charCodeAt(0);
    return j;
}

/**
 * Get the length in bytes of a struct definition.
 * @param {!Array<Object>} def The struct type definition.
 * @return {!number} The length of the structure in bytes.
 * @private
 */
function getStructDefSize_(def) {
    let bits = 0;
    for (let i = 0; i < def.length; i++) {
        bits += def[i]["offset"];
    }
    return bits;
}

/**
 * Turn a byte buffer into what the bytes represent.
 * @param {!Array<number|string>|!Uint8Array} buffer An array of bytes.
 * @param {!Object} type One of the available types.
 * @return {!Array<number>|number|string}
 * @private
 */
function fromBytes_(buffer, type) {
    if (type["be"]) {
        endianness(buffer, type["offset"]);
    }
    if (type["base"] != 10) {
        bytesFromBase_(buffer, type["base"]);
    }
    return readBytes_(buffer, type);
}

/**
 * Turn numbers and strings to bytes.
 * @param {!Array<!number|!string>|string} values The data.
 * @param {Object} type One of the available types.
 * @return {!Array<number|string>} the data as a byte buffer.
 * @private
 */
function toBytes_(values, type) {
    let bytes = writeBytes_(values, type);
    if (type["be"]) {
        endianness(bytes, type["offset"]);
    }
    if (type["base"] != 10) {
        bytes = bytesToBase_(bytes, type["base"]);
        formatOutput_(bytes, type);
    }
    return bytes;
}

/**
 * Read values from an array of bytes.
 * @param {!Array<!number>|!Uint8Array} bytes An array of bytes.
 * @param {!Object} type The type.
 * @return {!Array<!number>|string}
 * @private
 */
function readBytes_(bytes, type) {
    let values = [];
    let i = 0;
    let len = bytes.length - (type["offset"] - 1);
    while (i < len) {
        values.push(reader_(bytes, i));
        i += type["offset"];
    }
    if (type["char"]) {
        values = values.join("");
    }
    return values;
}

/**
 * Write values as bytes.
 * @param {!Array<number|string>|string} values The data.
 * @param {Object} type One of the available types.
 * @return {!Array<number>} the bytes.
 * @private
 */
function writeBytes_(values, type) {
    let j = 0;
    let bytes = [];
    for(let i=0; i < values.length; i++) {
        j = writer_(bytes, values[i], j);
    }
    return bytes;
}

/**
 * Fill a byte string with zeros on the left.
 * @param {!Array<!string>} bytes The bytes.
 * @param {!Object} type The type.
 * @private
 */
function formatOutput_(bytes, type) {
    let offset = (type["base"] == 2 ? 8 : 2) + 1;
    for(let i =0; i < bytes.length; i++) {
        bytes[i] = Array(offset - bytes[i].length).join("0") + bytes[i];
    }
}

/**
 * Turn bytes to base 10 from base 2 or 16.
 * @param {!Array<number>|Uint8Array} bytes The bytes as binary or hex strings.
 * @param {!number} base The base.
 * @private
 */
function bytesFromBase_(bytes, base) {
    for(let i=0; i < bytes.length; i++) {
        bytes[i] = parseInt(bytes[i], base);
    }
}

/**
 * Turn bytes from base 10 to base 2 or 16.
 * @param {!Array<string|number>} bytes The bytes.
 * @param {!number} base The base.
 * @return {!Array<!string>}
 * @private
 */
function bytesToBase_(bytes, base) {
    for(let i=0; i < bytes.length; i++) {
        bytes[i] = bytes[i].toString(base);
    }
    return bytes;
}

/**
 * @param {!Object} type The type definition.
 * @param {!number} base The base.
 * @private
 */
function assureType_(type, base) {
    type["offset"] = type["bits"] < 8 ? 1 : Math.ceil(type["bits"] / 8);
    type["base"] = base;
    setReader_(type);
    setWriter_(type);
    setGenericInteger_(type);
}

/**
 * @param {!Object} type The type definition.
 * @private
 */
function setGenericInteger_(type) {
    if (type["float"]) {
        if (type["bits"] == 64) {
            gInt_ = new GenericInteger(32, false);
        } else if(type["bits"] == 32) {
            gInt_ = new GenericInteger(32, true);
        } else {
            gInt_ = new GenericInteger(16, false);
        }
    } else {
        gInt_ = new GenericInteger(type["bits"], type["signed"]);
    }
}

/**
 * Set the function to read data of this type.
 * @param {!Object} type The type definition.
 * @private
 */
function setReader_(type) {
    if (type["float"]) {
        if (type["bits"] == 16) {
            reader_ = read16F_;
        } else if(type["bits"] == 32) {
            reader_ = read32F_;
        } else if(type["bits"] == 64) {
            reader_ = read64F_;
        }
    } else if (type["char"]) {
        reader_ = readChar_;
    } else {
        reader_ = readInt_;
    }
}

/**
 * Set the function to write data of this type.
 * @param {!Object} type The type definition.
 * @private
 */
function setWriter_(type) {
    if (type["float"]) {
        if (type["bits"] == 16) {
            writer_ = write16F_;
        } else if(type["bits"] == 32) {
            writer_ = write32F_;
        } else if(type["bits"] == 64) {
            writer_ = write64F_;
        }
    } else if (type["char"]) {
        writer_ = writeChar_;
    } else {
        writer_ = writeInt_;
    }   
}

// interface
module.exports.pack = pack;
module.exports.unpack = unpack;
module.exports.packArray = packArray;
module.exports.unpackArray = unpackArray;
module.exports.unpackStruct = unpackStruct;
module.exports.packStruct = packStruct;

/** 
 * A char.
 * @type {Object}
 */
module.exports.chr = {"bits": 8, "char": true};
/**
 * A 4-char string
 * @type {Object}
 */
module.exports.fourCC = {"bits": 32, "char": true};
/**
 * Booleans
 * @type {Object}
 */
module.exports.bool = {"bits": 1};
/**
 * Signed 2-bit integers
 * @type {Object}
 */
module.exports.int2 = {"bits": 2, "signed": true};
/**
 * Unsigned 2-bit integers
 * @type {Object}
 */
module.exports.uInt2 = {"bits": 2};
/**
 * Signed 4-bit integers
 * @type {Object}
 */
module.exports.int4 = {"bits": 4, "signed": true};
/**
 * Unsigned 4-bit integers
 * @type {Object}
 */
module.exports.uInt4 = {"bits": 4};
/**
 * Signed 8-bit integers
 * @type {Object}
 */
module.exports.int8 = {"bits": 8, "signed": true};
/**
 * Unsigned 4-bit integers
 * @type {Object}
 */
module.exports.uInt8 = {"bits": 8};
// LE
/**
 * Signed 16-bit integers little-endian
 * @type {Object}
 */
module.exports.int16  = {"bits": 16, "signed": true};
/**
 * Unsigned 16-bit integers little-endian
 * @type {Object}
 */
module.exports.uInt16 = {"bits": 16};
/**
 * Half-precision floating-point numbers little-endian
 * @type {Object}
 */
module.exports.float16 = {"bits": 16, "float": true};
/**
 * Signed 24-bit integers little-endian
 * @type {Object}
 */
module.exports.int24 = {"bits": 24, "signed": true};
/**
 * Unsigned 24-bit integers little-endian
 * @type {Object}
 */
module.exports.uInt24 = {"bits": 24};
/**
 * Signed 32-bit integers little-endian
 * @type {Object}
 */
module.exports.int32 = {"bits": 32, "signed": true};
/**
 * Unsigned 32-bit integers little-endian
 * @type {Object}
 */
module.exports.uInt32 = {"bits": 32};
/**
 * Single-precision floating-point numbers little-endian
 * @type {Object}
 */
module.exports.float32 = {"bits": 32, "float": true};
/**
 * Signed 40-bit integers little-endian
 * @type {Object}
 */
module.exports.int40 = {"bits": 40, "signed": true};
/**
 * Unsigned 40-bit integers little-endian
 * @type {Object}
 */
module.exports.uInt40 = {"bits": 40};
/**
 * Signed 48-bit integers little-endian
 * @type {Object}
 */
module.exports.int48 = {"bits": 48, "signed": true};
/**
 * Unsigned 48-bit integers little-endian
 * @type {Object}
 */
module.exports.uInt48 = {"bits": 48};
/**
 * Double-precision floating-point numbers little-endian
 * @type {Object}
 */
module.exports.float64 = {"bits": 64, "float": true};
// BE
/**
 * Signed 16-bit integers big-endian
 * @type {Object}
 */
module.exports.int16BE  = {"bits": 16, "signed": true, "be": true};
/**
 * Unsigned 16-bit integers big-endian
 * @type {Object}
 */
module.exports.uInt16BE = {"bits": 16, "be": true};
/**
 * Half-precision floating-point numbers big-endian
 * @type {Object}
 */
module.exports.float16BE = {"bits": 16, "float": true, "be": true};
/**
 * Signed 24-bit integers big-endian
 * @type {Object}
 */
module.exports.int24BE = {"bits": 24, "signed": true, "be": true};
/**
 * Unsigned 24-bit integers big-endian
 * @type {Object}
 */
module.exports.uInt24BE = {"bits": 24, "be": true};
/**
 * Signed 32-bit integers big-endian
 * @type {Object}
 */
module.exports.int32BE = {"bits": 32, "signed": true, "be": true};
/**
 * Unsigned 32-bit integers big-endian
 * @type {Object}
 */
module.exports.uInt32BE = {"bits": 32, "be": true};
/**
 * Single-precision floating-point numbers big-endian
 * @type {Object}
 */
module.exports.float32BE = {"bits": 32, "float": true, "be": true};
/**
 * Signed 40-bit integers big-endian
 * @type {Object}
 */
module.exports.int40BE = {"bits": 40, "signed": true, "be": true};
/**
 * Unsigned 40-bit integers big-endian
 * @type {Object}
 */
module.exports.uInt40BE = {"bits": 40, "be": true};
/**
 * Signed 48-bit integers big-endian
 * @type {Object}
 */
module.exports.int48BE = {"bits": 48, "signed": true, "be": true};
/**
 * Unsigned 48-bit integers big-endian
 * @type {Object}
 */
module.exports.uInt48BE = {"bits": 48, "be": true};
/**
 * Double-precision floating-point numbers big-endian
 * @type {Object}
 */
module.exports.float64BE = {"bits": 64, "float": true, "be": true};
