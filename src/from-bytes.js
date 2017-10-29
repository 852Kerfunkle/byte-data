/*
 * from-bytes: convert bytes to numbers and strings.
 * 64-bit IEEE values must be in the -1.0 to 1.0 range.
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

const intBits = require("int-bits");

/**
 * Turn an array of bytes into a float 64.
 * Thanks https://gist.github.com/kg/2192799
 * @param {!Array<number>} bytes 8 bytes representing a float 64.
 */
function decodeFloat(bytes) {
    let binary = "";
    let bits;
    let i = 0;
    let bytesLength = bytes.length;
    while(i < bytesLength) {
        bits = bytes[i].toString(2);
        while (bits.length < 8) {
            bits = "0" + bits;
        }
        binary = bits + binary;
        i++;
    }
    let significandBin = "1" + binary.substr(1 + 11, 52);
    let val = 1;
    let significand = 0;
    i = 0;
    while (i < significandBin.length) {
        significand += val * parseInt(significandBin.charAt(i), 10);
        val = val / 2;
        i++;
    }
    let sign = (binary.charAt(0) == "1") ? -1 : 1;
    let doubleValue = sign * significand *
        Math.pow(2, parseInt(binary.substr(1, 11), 2) - 1023);
    return doubleValue === 2 ? 0 : doubleValue;
}

/**
 * Read 8-bit samples from an array of bytes representing a wave file.
 * @param {Uint8Array} bytes Wave file as an array of bytes.
 */
function uIntFrom1Byte(bytes) {
    let samples = [];
    let i = 0;
    let j = 0;
    while (i < bytes.length) {
        samples[j] = bytes[i];
        j++;
        i++;
    }
    return samples;
}

/**
 * Read 16-bit samples from an array of bytes representing a wave file.
 * @param {Uint8Array} bytes Wave file as an array of bytes.
 */
function intFrom2Bytes(bytes) {
    let samples = [];
    let i = 0;
    let j = 0;
    while (i < bytes.length) {
        samples[j] = (bytes[1 + i] << 8) | bytes[i];
        j++;
        i+=2;
    }
    return samples;
}

/**
 * Read 24-bit samples from an array of bytes representing a wave file.
 * @param {Uint8Array} bytes Wave file as an array of bytes.
 */
function intFrom3Bytes(bytes) {
    let samples = [];
    let i = 0;
    let j = 0;
    while (i < bytes.length) {
        samples[j] = (
                bytes[2 + i] << 16 |
                bytes[1 + i] << 8 |
                bytes[i]
            );
        j++;
        i+=3;
    }
    return samples;
}

/**
 * Read 32-bit samples from an array of bytes representing a wave file.
 * @param {Uint8Array} bytes Wave file as an array of bytes.
 */
function intFrom4Bytes(bytes) {
    let samples = [];
    let i = 0;
    let j = 0;
    while (i < bytes.length) {
        samples[j] = (
                bytes[3 + i] << 24 |
                bytes[2 + i] << 16 |
                bytes[1 + i] << 8 |
                bytes[i]
            );
        j++;
        i+=4;
    }
    return samples;
}

/**
 * Read 8-bit IEEE samples from an array of bytes representing a wave file.
 * @param {Uint8Array} bytes Wave file as an array of bytes.
 */
function floatFrom4Bytes(bytes) {
    let samples = [];
    let i = 0;
    let j = 0;
    while (i < bytes.length) {
        samples[j] = intBits.pack(
                bytes[3 + i] << 24 |
                bytes[2 + i] << 16 |
                bytes[1 + i] << 8 |
                bytes[i]
            );
        j++;
        i+=4;
    }
    return samples;
}

/**
 * Read 64-bit samples from an array of bytes representing a wave file.
 * @param {Uint8Array} bytes Wave file as an array of bytes.
 */
function floatFrom8Bytes(bytes) {
    let samples = [];
    let i = 0;
    let j = 0;
    while (i < bytes.length) {
        samples[j] = decodeFloat([
                bytes[i],
                bytes[1 + i],
                bytes[2 + i],
                bytes[3 + i],
                bytes[4 + i],
                bytes[5 + i],
                bytes[6 + i],
                bytes[7 + i]
            ]);
        j++;
        i+=8;
    }
    return samples;
}

/**
 * Convert an array of bytes to a string.
 * @param {Uint8Array} bytes An array of bytes.
 * @returns {string} The string.
 */
function stringFromBytes(bytes) {
    let string = "";
    let i = 0;
    while (i < bytes.length) {
        string += String.fromCharCode(bytes[i]);
        i++;
    }    
    return string;
}

module.exports.uIntFrom1Byte = uIntFrom1Byte;
module.exports.intFrom2Bytes = intFrom2Bytes;
module.exports.intFrom3Bytes = intFrom3Bytes;
module.exports.intFrom4Bytes = intFrom4Bytes;
module.exports.floatFrom4Bytes = floatFrom4Bytes;
module.exports.floatFrom8Bytes = floatFrom8Bytes;
module.exports.stringFromBytes = stringFromBytes;