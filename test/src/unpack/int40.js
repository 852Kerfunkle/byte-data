/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let assert = require('assert');
let byteData = require('../../../test/loader.js');
let int40 = byteData.int40;

describe('40-bit from bytes', function() {
    
    
    it('should turn 5 bytes (hex) to 1 signed 40-bit int  (-32768)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                ["0","80","ff","ff","ff"], int40, 16),
            [-32768]);
    });
    it('should turn 5 bytes (hex) to 1 signed 40-bit int  (-65535)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                ["1","0","ff","ff","ff"], int40, 16),
            [-65535]);
    });
    it('should turn 6 bytes (hex) to 1 signed 40-bit int (ignore the extra byte) (-65535)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                ["1","0","ff","ff","ff","fe"], int40, 16),
            [-65535]);
    });
    it('should turn 9 bytes (hex) to 1 signed 40-bit int  (ignore the extra bytes) (-65535)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                ["1","0","ff","ff","ff","ff","ff","ff","ff"], int40, 16),
            [-65535]);
    });
    it('should turn 5 bytes (hex) to 1 signed 40-bit int  (-1)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                ["ff","ff","ff","ff","ff"], int40, 16),
            [-1]);
    });
    it('should turn 5 bytes (hex) to 1 signed 40-bit int  (-2)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                ["fe","ff","ff","ff","ff"], int40, 16),
            [-2]);
    });
    it('should turn 5 bytes (hex) to 1 signed 40-bit int  (-3)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                ["fd","ff","ff","ff","ff"], int40, 16),
            [-3]);
    });
    it('should turn 5 bytes (hex) to 1 signed 40-bit int  (-10)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                ["f6","ff","ff","ff","ff"], int40, 16),
            [-10]);
    });
    it('should turn 5 bytes (hex) to 1 signed 40-bit int  (-100)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                ["9c","ff","ff","ff","ff"], int40, 16),
            [-100]);
    });
    it('should turn 5 bytes (hex) to 1 signed 40-bit int  (-1000)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                ["18","fc","ff","ff","ff"], int40, 16),
            [-1000]);
    });
    it('should turn 5 bytes (hex) to 1 signed 40-bit int  (-10000)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                ["f0","d8","ff","ff","ff"], int40, 16),
            [-10000]);
    });
    it('should turn 5 bytes (hex) to 1 signed 40-bit int  (-100000)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                ["60", "79","fe","ff","ff"], int40, 16),
            [-100000]);
    });
    it('should turn 5 bytes (hex) to 1 signed 40-bit int  (-1000000)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                ["c0", "bd","f0","ff","ff"], int40, 16),
            [-1000000]);
    });
    it('should turn 5 bytes (hex) to 1 signed 40-bit int  (-32768)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                ["0","80","ff","ff","ff"], int40, 16),
            [-32768]);
    });
    it('should turn 5 bytes (hex) to 1 signed 40-bit int  (-32768)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                ["8","80","ff","ff","ff"], int40, 16),
            [-32760]);
    });
    it('should turn 5 bytes (hex) to 1 signed 40-bit int  (-12345)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                ["c7","cf","ff","ff","ff"], int40, 16),
            [-12345]);
    });
    it('should turn 5 bytes (hex) to 1 signed 40-bit int  (-12345)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                ["00","00","00","00","80"], int40, 16),
            [-549755813888]);
    });
    it('should turn 5 bytes (bin) to 1 signed 40-bit int (65535)',
            function() {
        assert.deepEqual(
            byteData.unpackArray(
                ["ff","ff","0","0","0"], int40, 16),
            [65535]);
    });
});