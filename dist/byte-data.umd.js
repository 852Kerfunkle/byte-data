/*!
 * byte-data Copyright (c) 2017-2018 Rafael da Silva Rocha. MIT license.
 */
var window=window||{};var k="function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){a!=Array.prototype&&a!=Object.prototype&&(a[b]=c.value)},l="undefined"!=typeof window&&window===this?this:"undefined"!=typeof global&&null!=global?global:this;function n(a){if(a){for(var b=l,c=["String","prototype","codePointAt"],d=0;d<c.length-1;d++){var e=c[d];e in b||(b[e]={});b=b[e]}c=c[c.length-1];d=b[c];a=a(d);a!=d&&null!=a&&k(b,c,{configurable:!0,writable:!0,value:a})}}
n(function(a){return a?a:function(b){if(null==this)throw new TypeError("The 'this' value for String.prototype.codePointAt must not be null or undefined");var a=this.length;b=Number(b)||0;if(0<=b&&b<a){b|=0;var d=this.charCodeAt(b);if(55296>d||56319<d||b+1===a)return d;b=this.charCodeAt(b+1);return 56320>b||57343<b?d:1024*(d-55296)+b+9216}}});
var p={unpackString:function(a,b,c){b=void 0===b?0:b;c=void 0===c?null:c;c=null!==c?b+c:a.length;for(var d="";b<c;){var e=128,f=191,h=!1,g=a[b++];if(0<=g&&127>=g)d+=String.fromCharCode(g);else{var m=0;194<=g&&223>=g?m=1:224<=g&&239>=g?(m=2,224===a[b]&&(e=160),237===a[b]&&(f=159)):240<=g&&244>=g?(m=3,240===a[b]&&(e=144),244===a[b]&&(f=143)):h=!0;g&=(1<<8-m-1)-1;for(var v=0;v<m;v++){if(a[b]<e||a[b]>f)h=!0;g=g<<6|a[b]&63;b++}h?d+=String.fromCharCode(65533):65535>=g?d+=String.fromCharCode(g):(g-=65536,
d+=String.fromCharCode((g>>10&1023)+55296,(g&1023)+56320))}}return d},packString:function(a){for(var b=new Uint8Array((0,p.countString)(a)),c=0,d=0;d<a.length;d++){var e=a.codePointAt(d);if(128>e)b[c]=e,c++;else{var f=0,h=0;2047>=e?(f=1,h=192):65535>=e?(f=2,h=224):1114111>=e&&(f=3,h=240,d++);b[c]=(e>>6*f)+h;for(c++;0<f;)b[c]=128|e>>6*(f-1)&63,c++,f--}}return b},countString:function(a){for(var b=0,c=0;c<a.length;c++){var d=a.codePointAt(c);128>d||(2047>=d?b++:65535>=d?b+=2:1114111>=d&&(c++,b+=3));
b++}return b},packStringTo:function(a,b,c){c=void 0===c?0:c;a=(0,p.packString)(a);for(var d=0;d<a.length;d++)b[c++]=a[d];return c},pack:function(a,b){var c=[];(0,p.packTo)(a,b,c);return c},packTo:function(a,b,c,d){return(0,p.packArrayTo)([a],b,c,void 0===d?0:d)},packArray:function(a,b){var c=[];(0,p.packArrayTo)(a,b,c);return c},packArrayTo:function(a,b,c,d){d=void 0===d?0:d;q(b);for(var e=0;e<a.length;e++){if(void 0===a[e])throw Error("Undefined value.");var f=a[e];if(null!==f&&-1==[Number,Boolean].indexOf(f.constructor))throw Error("Expected Number, Boolean or Null; found "+
f.constructor);for(f=d+b.offset;d<f;)d=r(c,a[e],d);b.be&&t(c,b.offset,d-b.offset,d)}return d},unpack:function(a,b,c){c=void 0===c?0:c;q(b);if(b.offset+c>a.length)throw Error("Bad buffer length.");b.be&&t(a,b.offset,c,c+b.offset);var d=u(a,c);b.be&&t(a,b.offset,c,c+b.offset);return d},unpackArray:function(a,b,c,d){d=void 0===d?a.length:d;var e=[];(0,p.unpackArrayTo)(a,b,e,void 0===c?0:c,d);return e},unpackArrayTo:function(a,b,c,d,e){d=void 0===d?0:d;e=void 0===e?a.length:e;for(q(b);(e-d)%b.offset;)e--;
for(var f=0;d<e;d+=b.offset,f++)c[f]=(0,p.unpack)(a,b,d)}},exports=p||{};window.byteData=p;"use strict";Object.defineProperty(p,"__esModule",{value:!0});function t(a,b,c,d){c=void 0===c?0:c;d=void 0===d?a.length:d;if(d%b)throw Error("Bad buffer length.");for(;c<d;c+=b){var e=a,f=b,h=c;f--;for(var g=0;g<f;g++){var m=e[h+g];e[h+g]=e[h+f];e[h+f]=m;f--}}}
function w(a,b){this.a=a;this.c=0;this.f=this.a;this.g=255;a=Math.pow(2,this.a);b?(this.b=a/2-1,this.h=-a/2):(this.b=a-1,this.h=0);this.f=(this.a-1|7)+1;b=8-(this.f-this.a);this.g=Math.pow(2,0<b?b:8)-1;this.c=8>this.a?1:Math.ceil(this.f/8)}w.prototype.read=function(a,b){b=void 0===b?0:b;for(var c=0,d=0;d<this.c;d++)c+=a[b+d]*Math.pow(256,d);a=c;a>this.b&&(a-=2*this.b+2);return x(this,a)};
w.prototype.write=function(a,b,c){c=void 0===c?0:c;var d=x(this,b);a[c]=8>this.a?0>d?d+Math.pow(2,this.a):d:d&255;c+=1;for(d=2;d<this.c;d++,c++)a[c]=Math.floor(b/Math.pow(2,8*(d-1)))&255;8<this.a&&(a[c]=Math.floor(b/Math.pow(2,8*(this.c-1)))&this.g,c++);return c};function x(a,b){if(b>a.b)throw Error("Overflow.");if(b<a.h)throw Error("Underflow.");return b}
var y=0===(new Uint8Array((new Uint32Array([1])).buffer))[0],z=y?1:0,A=y?0:1,B=new Int8Array(8),C=new Uint32Array(B.buffer),D=new Float32Array(B.buffer),E=new Float64Array(B.buffer),u,r,F={};
function q(a){if(!a)throw Error("Undefined type.");if(a.float){if(-1==[16,32,64].indexOf(a.bits))throw Error("Bad float type.");}else if(1>a.bits||53<a.bits)throw Error("Bad type definition.");a.offset=8>a.bits?1:Math.ceil(a.bits/8);u=a.float?16==a.bits?G:32==a.bits?H:I:J;r=a.float?16==a.bits?K:32==a.bits?L:M:N;F=new w(64==a.bits?32:a.bits,a.float?!1:a.signed)}function J(a,b){return F.read(a,b)}
function G(a,b){a=F.read(a,b);b=(a&31744)>>10;var c=a&1023;return(b?Math.pow(2,b-15)*(1+c/1024):c/1024*.00006103515625)*(a>>15?-1:1)}function H(a,b){C[0]=F.read(a,b);return D[0]}function I(a,b){C[z]=F.read(a,b);C[A]=F.read(a,b+4);return E[0]}function N(a,b,c){return F.write(a,b,c)}function K(a,b,c){D[0]=b;var d=C[0];b=d>>16&32768;var e=d>>12&2047;d=d>>23&255;103<=d&&(b=(b|d-112<<10|e>>1)+(e&1));a[c++]=b&255;a[c++]=b>>>8&255;return c}function L(a,b,c){D[0]=b;return F.write(a,C[0],c)}
function M(a,b,c){E[0]=b;c=F.write(a,C[z],c);return F.write(a,C[A],c)};var module=module||{};module.exports=exports;var define=define||function(){};define(["exports"],function(exports){return module.exports;});
