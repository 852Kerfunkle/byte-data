const fs = require('fs');
const licenses = fs.readFileSync('./docs/LICENSES', 'utf-8');

module.exports = {
  entry: './index.js',
  output: {
    // This is the file Google Closure Compiler will use
    // to create dist/dist-min.js. If you change the filename
    // here, be sure to change in package.json under "compile"
    filename: './dist/byte-data.js'
  },
  module: {
    loaders: [
      {
        test:  /index\.js$/,
        loader: 'string-replace-loader',
        query: {
          multiple: [
            {
              search: '%LICENSES%',
              replace: licenses,
            },
            // from
            {
              search: 'module.exports.floatTo8Bytes',
              replace: "window['floatTo8Bytes']",
            },
            {
              search: 'module.exports.floatTo4Bytes',
              replace: "window['floatTo4Bytes']",
            },
            {
              search: 'module.exports.intTo4Bytes',
              replace: "window['intTo4Bytes']",
            },
            {
              search: 'module.exports.intTo3Bytes',
              replace: "window['intTo3Bytes']",
            },
            {
              search: 'module.exports.intTo2Bytes',
              replace: "window['intTo2Bytes']",
            },
            {
              search: 'module.exports.uIntTo1Byte',
              replace: "window['uIntTo1Byte']",
            },
            {
              search: 'module.exports.stringToBytes',
              replace: "window['stringToBytes']",
            },

            // from
            {
              search: 'module.exports.uIntFrom1Byte',
              replace: "window['uIntFrom1Byte']",
            },
            {
              search: 'module.exports.intFrom2Bytes',
              replace: "window['intFrom2Bytes']",
            },
            {
              search: 'module.exports.intFrom3Bytes',
              replace: "window['intFrom3Bytes']",
            },
            {
              search: 'module.exports.intFrom4Bytes',
              replace: "window['intFrom4Bytes']",
            },
            {
              search: 'module.exports.floatFrom4Bytes',
              replace: "window['floatFrom4Bytes']",
            },
            {
              search: 'module.exports.floatFrom8Bytes',
              replace: "window['floatFrom8Bytes']",
            },
            {
              search: 'module.exports.stringFromBytes',
              replace: "window['stringFromBytes']",
            },
          ]
        }
      }
    ]
  }
};