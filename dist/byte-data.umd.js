(function (global, factory) {typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :typeof define === 'function' && define.amd ? define(['exports'], factory) :(factory((global.byteData = {})));}(this, (function (exports) {;'use strict';Object.defineProperty(exports, '__esModule', { value: true });var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.checkStringArgs=function(a,g,f){if(null==a)throw new TypeError("The 'this' value for String.prototype."+f+" must not be null or undefined");if(g instanceof RegExp)throw new TypeError("First argument to String.prototype."+f+" must not be a regular expression");return a+""};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;
$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(a,g,f){a!=Array.prototype&&a!=Object.prototype&&(a[g]=f.value)};$jscomp.getGlobal=function(a){return"undefined"!=typeof window&&window===a?a:"undefined"!=typeof global&&null!=global?global:a};$jscomp.global=$jscomp.getGlobal(this);
$jscomp.polyfill=function(a,g,f,n){if(g){f=$jscomp.global;a=a.split(".");for(n=0;n<a.length-1;n++){var k=a[n];k in f||(f[k]={});f=f[k]}a=a[a.length-1];n=f[a];g=g(n);g!=n&&null!=g&&$jscomp.defineProperty(f,a,{configurable:!0,writable:!0,value:g})}};
$jscomp.polyfill("String.prototype.codePointAt",function(a){return a?a:function(a){var f=$jscomp.checkStringArgs(this,null,"codePointAt"),g=f.length;a=Number(a)||0;if(0<=a&&a<g){a|=0;var k=f.charCodeAt(a);if(55296>k||56319<k||a+1===g)return k;a=f.charCodeAt(a+1);return 56320>a||57343<a?k:1024*(k-55296)+a+9216}}},"es6","es3");
var byteData=function(a){function g(b,c,d,e){d=void 0===d?0:d;e=void 0===e?b.length:e;if(e%c)throw Error("Bad buffer length.");for(;d<e;d+=c){var a=b,m=c,h=d;m--;for(var f=0;f<m;f++){var g=a[h+f];a[h+f]=a[h+m];a[h+m]=g;m--}}}function f(b){if(!b)throw Error("Undefined type.");if(b.float){if(-1==[16,32,64].indexOf(b.bits))throw Error("Bad float type.");}else if(1>b.bits||53<b.bits)throw Error("Bad type definition.");b.offset=8>b.bits?1:Math.ceil(b.bits/8);v=b.float?16==b.bits?k:32==b.bits?E:F:n;w=b.float?
16==b.bits?G:32==b.bits?H:I:J;l=new p(64==b.bits?32:b.bits,b.float?!1:b.signed)}function n(b,c){return l.read(b,c)}function k(b,c){b=l.read(b,c);c=(b&31744)>>10;var d=b&1023;return(c?Math.pow(2,c-15)*(1+d/1024):d/1024*.00006103515625)*(b>>15?-1:1)}function E(b,c){q[0]=l.read(b,c);return t[0]}function F(b,c){q[x]=l.read(b,c);q[y]=l.read(b,c+4);return z[0]}function J(b,c,d){return l.write(b,c,d)}function G(b,c,d){t[0]=c;var e=q[0];c=e>>16&32768;var a=e>>12&2047;e=e>>23&255;103<=e&&(c=(c|e-112<<10|a>>
1)+(a&1));b[d++]=c&255;b[d++]=c>>>8&255;return d}function H(b,c,d){t[0]=c;return l.write(b,q[0],d)}function I(b,c,d){z[0]=c;d=l.write(b,q[x],d);return l.write(b,q[y],d)}function A(b){for(var c=[],d=0;d<b.length;d++){var e=b.codePointAt(d);if(128>e)c.push(e);else{var a=0,f=0;2047>=e?(a=1,f=192):65535>=e?(a=2,f=224):1114111>=e&&(a=3,f=240,d++);for(c.push((e>>6*a)+f);0<a;)c.push(128|e>>6*(a-1)&63),a--}}return c}function B(b,c,d,e){return u([b],c,d,void 0===e?0:e)}function u(b,c,d,e){e=void 0===e?0:e;
f(c);for(var a=0;a<b.length;a++){if(void 0===b[a])throw Error("Undefined value.");var m=b[a];if(null!==m&&-1==[Number,Boolean].indexOf(m.constructor))throw Error("Expected Number, Boolean or Null; found "+m.constructor);for(m=e+c.offset;e<m;)e=w(d,b[a],e);c.be&&g(d,c.offset,e-c.offset,e)}return e}function C(b,c,d){d=void 0===d?0:d;f(c);if(c.offset+d>b.length)throw Error("Bad buffer length.");c.be&&g(b,c.offset,d,d+c.offset);var a=v(b,d);c.be&&g(b,c.offset,d,d+c.offset);return a}function D(b,c,d,a,
g){a=void 0===a?0:a;g=void 0===g?b.length:g;for(f(c);(g-a)%c.offset;)g--;for(var e=0;a<g;a+=c.offset,e++)d[e]=C(b,c,a)}var p=function(b,c){this.bits_=b;this.offset_=0;this.realBits_=this.bits_;this.lastByteMask_=255;b=Math.pow(2,this.bits_);c?(this.max_=b/2-1,this.min_=-b/2):(this.max_=b-1,this.min_=0);this.build_()};p.prototype.read=function(b,c){c=void 0===c?0:c;for(var d=0,a=0;a<this.offset_;a++)d+=b[c+a]*Math.pow(256,a);return this.overflow_(this.sign_(d))};p.prototype.write=function(b,c,a){a=
void 0===a?0:a;a=this.writeFirstByte_(b,this.overflow_(c),a);for(var d=2;d<this.offset_;d++,a++)b[a]=Math.floor(c/Math.pow(2,8*(d-1)))&255;8<this.bits_&&(b[a]=Math.floor(c/Math.pow(2,8*(this.offset_-1)))&this.lastByteMask_,a++);return a};p.prototype.build_=function(){this.setRealBits_();this.setLastByteMask_();this.offset_=8>this.bits_?1:Math.ceil(this.realBits_/8)};p.prototype.sign_=function(b){b>this.max_&&(b-=2*this.max_+2);return b};p.prototype.overflow_=function(b){if(b>this.max_)throw Error("Overflow.");
if(b<this.min_)throw Error("Underflow.");return b};p.prototype.setRealBits_=function(){this.realBits_=(this.bits_-1|7)+1};p.prototype.setLastByteMask_=function(){var b=8-(this.realBits_-this.bits_);this.lastByteMask_=Math.pow(2,0<b?b:8)-1};p.prototype.writeFirstByte_=function(b,a,d){b[d]=8>this.bits_?0>a?a+Math.pow(2,this.bits_):a:a&255;return d+1};var r=0===(new Uint8Array((new Uint32Array([1])).buffer))[0],x=r?1:0,y=r?0:1;r=new Int8Array(8);var q=new Uint32Array(r.buffer),t=new Float32Array(r.buffer),
z=new Float64Array(r.buffer),v,w,l={};a.unpackString=function(b,a,d){a=void 0===a?0:a;d=void 0===d?null:d;d=null!==d?a+d:b.length;for(var c="";a<d;){var f=128,g=191,h=b[a++];if(0<=h&&127>=h)c+=String.fromCharCode(h);else{if(194<=h&&223>=h)var k=1;else if(224<=h&&239>=h)k=2,224===b[a]&&(f=160),237===b[a]&&(g=159);else if(240<=h&&244>=h)k=3,240===b[a]&&(f=144),244===b[a]&&(g=143);else throw Error("Invalid UTF-8 character.");h&=(1<<8-k-1)-1;for(var l=0;l<k;l++){h=h<<6|b[a]&63;if(b[a]<f||b[a]>g)throw Error("Invalid UTF-8 character.");
a++}65535>=h?c+=String.fromCharCode(h):(h-=65536,c+=String.fromCharCode((h>>10&1023)+55296,(h&1023)+56320))}}return c};a.packString=A;a.packStringTo=function(a,c,d){d=void 0===d?0:d;a=A(a);for(var b=0;b<a.length;b++)c[d++]=a[b];return d};a.pack=function(a,c){var b=[];B(a,c,b);return b};a.packTo=B;a.packArray=function(a,c){var b=[];u(a,c,b);return b};a.packArrayTo=u;a.unpack=C;a.unpackArray=function(a,c,d,e){e=void 0===e?a.length:e;var b=[];D(a,c,b,void 0===d?0:d,e);return b};a.unpackArrayTo=D;return a}({});exports.unpackString = byteData.unpackString;exports.packString = byteData.packString;exports.packStringTo = byteData.packStringTo;exports.pack = byteData.pack;exports.packArray = byteData.packArray;exports.packTo = byteData.packTo;exports.packArrayTo = byteData.packArrayTo;exports.unpack = byteData.unpack;exports.unpackArray = byteData.unpackArray;exports.unpackArrayTo = byteData.unpackArrayTo;})));
