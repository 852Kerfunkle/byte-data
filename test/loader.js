/**
 * Copyright (c) 2017-2018 Rafael da Silva Rocha.
 * https://github.com/rochars/byte-data
 *
 */

let byteData;
let types = require("binary-data-types");

// UMD bundle
if (process.argv[3] == '--umd') {
	console.log('umd tests');
	byteData = require('../dist/byte-data.umd.js');

// ES6 dist
} else if (process.argv[3] == '--esm') {
	require = require("esm")(module);
	global.module = module;
	console.log("esm");
	byteData = require('../dist/byte-data.js');

// Source
} else {
	require = require("esm")(module);
	global.module = module;
	console.log('Source tests');
	byteData = require('../main.js');
}

byteData.types = types;
module.exports = byteData;
