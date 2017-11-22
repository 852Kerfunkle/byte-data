
var assert = require('assert');

describe('nibbles to bytes', function() {
    
    let byteData = require('../../index.js');

    // 4-bit / half byte byte signed
    it('should turn 2 4-bit signed int to 2 nibbles (0s)', function() {
        assert.deepEqual(byteData.toBytes([0, 0], 4, {"base": 10}),
            [0, 0]);
    });
    it('should turn 2 4-bit signed int to 2 bytes (-8, 7)', function() {
        assert.deepEqual(byteData.toBytes([-8, 7], 4, {"base": 10}),
            [8, 7]);
    });
    it('should turn 1 4-bit signed int to 1 nibble (-1)', function() {
        assert.deepEqual(byteData.toBytes([-1], 4, {"base": 10}),
            [15]);
    });
    it('should turn 1 4-bit signed int to 1 nibble (-1, 5)', function() {
        assert.deepEqual(byteData.toBytes([-1, 5], 4, {"base": 10}),
            [15, 5]);
    });
    it('should turn 1 4-bit signed int to 1 nibble hex (-1)', function() {
        assert.deepEqual(byteData.toBytes([-1], 4, {"base": 16}),
            ['f']);
    });
    it('should turn 1 4-bit signed int to 1 nibble hex (-8)', function() {
        assert.deepEqual(byteData.toBytes([-8], 4, {"base": 16}),
            ['8']);
    });
    it('should turn 1 4-bit signed int to 1 nibble hex (7)', function() {
        assert.deepEqual(byteData.toBytes([7], 4, {"base": 16}),
            ['7']);
    });
    it('should turn 1 4-bit signed int to 1 nibble bin (6)', function() {
        assert.deepEqual(byteData.toBytes([6], 4, {"base": 2}),
            ['0110']);
    });
});
