var k,n,m="function"==typeof Object.create?Object.create:function(t){function r(){}return r.prototype=t,new r};if("function"==typeof Object.setPrototypeOf)n=Object.setPrototypeOf;else{var p;t:{var q={B:!0},r={};try{r.__proto__=q,p=r.B;break t}catch(t){}p=!1}n=p?function(t,r){if(t.__proto__=r,t.__proto__!==r)throw new TypeError(t+" is not extensible");return t}:null}var t=n,u="function"==typeof Object.defineProperties?Object.defineProperty:function(t,r,o){t!=Array.prototype&&t!=Object.prototype&&(t[r]=o.value)},v="undefined"!=typeof window&&window===this?this:"undefined"!=typeof global&&null!=global?global:this;function w(t){if(t){for(var r=v,o=["String","prototype","codePointAt"],i=0;i<o.length-1;i++){var n=o[i];n in r||(r[n]={}),r=r[n]}(t=t(i=r[o=o[o.length-1]]))!=i&&null!=t&&u(r,o,{configurable:!0,writable:!0,value:t})}}w(function(t){return t||function(t){if(null==this)throw new TypeError("The 'this' value for String.prototype.codePointAt must not be null or undefined");var r=this.length;if(0<=(t=Number(t)||0)&&t<r){t|=0;var o=this.charCodeAt(t);return 55296>o||56319<o||t+1===r?o:56320>(t=this.charCodeAt(t+1))||57343<t?o:1024*(o-55296)+t+9216}}});var y={unpackString:function(t,r,o){var i=void 0===r?0:r;for(o=null!==(o=void 0===(o=void 0===o?null:o)?null:o)?o+1:t.length,r="",i=void 0===i?0:i;i<o;){var n=128,e=191,a=!1,h=t[i++];if(0<=h&&127>=h)r+=String.fromCharCode(h);else{var s=0;194<=h&&223>=h?s=1:224<=h&&239>=h?(s=2,224===t[i]&&(n=160),237===t[i]&&(e=159)):240<=h&&244>=h?(s=3,240===t[i]&&(n=144),244===t[i]&&(e=143)):a=!0,h&=(1<<8-s-1)-1;for(var f=0;f<s;f++)(t[i]<n||t[i]>e)&&(a=!0),h=h<<6|63&t[i],i++;a?r+=String.fromCharCode(65533):65535>=h?r+=String.fromCharCode(h):(h-=65536,r+=String.fromCharCode(55296+(h>>10&1023),56320+(1023&h)))}}return r},packString:function(t){var r;if("function"==typeof Uint8Array){for(var o=r=0,i=t.length;o<i;o++){var n=t.codePointAt(o);128>n||(2047>=n?r++:65535>=n?r+=2:1114111>=n&&(o++,r+=3)),r++}r=new Uint8Array(r)}else r=[];return x(t,r,0),r},packStringTo:function(t,r,o){return x(t,r,void 0===o?0:o)},pack:function(t,r){var o=[];return(0,y.packTo)(t,r,o),o},packTo:function(t,r,o,i){return(0,y.packArrayTo)([t],r,o,void 0===i?0:i)},packArray:function(t,r){var o=[];return(0,y.packArrayTo)(t,r,o),o},packArrayTo:function(t,r,o,i){i=void 0===i?0:i;var n=new z;n.i(r);for(var e=t.length,a=0;a<e;a++){if(void 0===t[a])throw Error("Undefined value.");var h=t[a];if(null!==h&&h.constructor!=Number&&h.constructor!=Boolean)throw Error("Expected Number, Boolean or Null; found "+h.constructor);for(h=i+n.a;i<h;)i=n.write(o,t[a],i);r.be&&A(o,n.a,i-n.a,i)}return i},unpack:function(t,r,o){o=void 0===o?0:o;var i=new z;if(i.i(r),i.a+o>t.length)throw Error("Bad buffer length.");r.be&&A(t,i.a,o,o+i.a);var n=i.b(t,o);return r.be&&A(t,i.a,o,o+i.a),n},unpackArray:function(t,r,o,i){i=void 0===i?t.length:i;var n=[];return(0,y.unpackArrayTo)(t,r,n,void 0===o?0:o,i),n},unpackArrayTo:function(t,r,o,i,n){i=void 0===i?0:i,n=void 0===n?t.length:n;var e=new z;e.i(r);for(var a=i;(n-i)%e.a;)n--;r.be&&A(t,e.a,i,n);for(var h=0;i<n;i+=e.a)o[h]=e.b(t,i),h++;r.be&&A(t,e.a,a,n)}},exports=y||{};function A(t,r,o,i){if((i=void 0===i?t.length:i)%r)throw Error("Bad buffer length.");for(o=void 0===o?0:o;o<i;o+=r){var n=t,e=r,a=o;e--;for(var h=0;h<e;h++){var s=n[a+h];n[a+h]=n[a+e],n[a+e]=s,e--}}}function x(t,r,o){o=void 0===o?0:o;for(var i=0,n=t.length;i<n;i++){var e=t.codePointAt(i);if(128>e)r[o]=e,o++;else{var a=0,h=0;for(2047>=e?(a=1,h=192):65535>=e?(a=2,h=224):1114111>=e&&(a=3,h=240,i++),r[o]=(e>>6*a)+h,o++;0<a;)r[o]=128|e>>6*(a-1)&63,o++,a--}}return o}function C(){this.l=this.h=this.v=this.f=this.j=this.a=0}function D(t,r){if(r>t.h||r<t.l)throw Error("Integer overflow")}function E(t,r,o,i,n){var e=(1<<i-1)-1;Math.abs(o)>Math.pow(2,e+1)-2*(i+n)&&(o=0>o?-1/0:1/0);var a=0>((o=+o)||1/o)?1:0>o?1:0;o=Math.abs(o);var h=Math.min(Math.floor(Math.log(o)/Math.LN2),1023),s=F(o/Math.pow(2,h)*Math.pow(2,n));for(o!=o?(s=Math.pow(2,n-1),h=(1<<i)-1):0!==o&&(o>=Math.pow(2,1-e)?(2<=s/Math.pow(2,n)&&(h+=1,s=1),h>e?(h=(1<<i)-1,s=0):(h+=e,s=F(s)-Math.pow(2,n))):(s=F(o/Math.pow(2,1-e-n)),h=0)),e=h,(o=[]).push(a),a=i;0<a;--a)o[a]=e%2?1:0,e=Math.floor(e/2);for(a=o.length,e=n;0<e;--e)o[a+e]=s%2?1:0,s=Math.floor(s/2);for(a=o.join(""),i=Math.floor((i+n+1)/8)+r-1,n=r;i>=r;)t[i]=parseInt(a.substring(0,8),2),a=a.substring(8),i--,n++;return n}function G(t,r,o,i){var n=Math.ceil((o+i)/8);i=Math.pow(2,-(8*n-1-o));var e="";for(--n;0<=n;n--){var a=t[n+r].toString(2);e+="00000000".substring(a.length)+a}return t="1"==e.charAt(0)?-1:1,e=e.substring(1),r=parseInt(e.substring(0,o),2),e=e.substring(o),r==(1<<o)-1?0!==parseInt(e,2)?NaN:1/0*t:(0===r?(r+=1,e=parseInt(e,2)):e=parseInt("1"+e,2),t*e*i*Math.pow(2,r-((1<<o-1)-1)))}function F(t){var r=Math.floor(t);return.5>(t-=r)?r:.5<t?r+1:r%2?r+1:r}function z(){C.call(this),this.c="function"==typeof Uint8Array;var t=!1;this.c&&(t=0===new Uint8Array(new Uint32Array([1]).buffer)[0]),this.m=t?1:0,this.o=t?0:1,t=this.c?new Uint8Array(8):null,this.g=this.c?new Uint32Array(t.buffer):null,this.s=this.c?new Float32Array(t.buffer):null,this.u=this.c?new Float64Array(t.buffer):null}Object.defineProperty(y,"__esModule",{value:!0}),C.prototype.i=function(t){this.f=t.bits;var r=Math.pow(2,this.f);t.signed?(this.h=r/2-1,this.l=-r/2):(this.h=r-1,this.l=0),t=8-(1+(this.f-1|7)-this.f),this.v=Math.pow(2,0<t?t:8)-1,this.a=8>this.f?1:Math.ceil(this.f/8),this.j=64===this.f?4:this.a},C.prototype.b=function(t,r){r=void 0===r?0:r;for(var o=0,i=0;i<this.j;i++)o+=t[r+i]*Math.pow(256,i);return(t=o)>this.h&&(t-=2*this.h+2),D(this,o=t),o},C.prototype.write=function(t,r,o){if(o=void 0===o?0:o,r!=r)throw Error("NaN");D(this,r),t[o]=255&(0>r?r+Math.pow(2,this.f):r),o++;for(var i=this.j,n=2;n<i;n++)t[o]=255&Math.floor(r/Math.pow(2,8*(n-1))),o++;return 8<this.f&&(t[o]=Math.floor(r/Math.pow(2,8*(this.j-1)))&this.v,o++),o};var H=z;if(H.prototype=m(C.prototype),H.prototype.constructor=H,t)t(H,C);else for(var I in C)if("prototype"!=I)if(Object.defineProperties){var J=Object.getOwnPropertyDescriptor(C,I);J&&Object.defineProperty(H,I,J)}else H[I]=C[I];H.L=C.prototype,(k=z.prototype).i=function(t){if(!t)throw Error("Undefined type.");if(t.float){if(16!=t.bits&&32!=t.bits&&64!=t.bits)throw Error("Bad float type.")}else if(1>t.bits||53<t.bits)throw Error("Bad type definition.");C.prototype.i.call(this,{bits:t.bits,signed:!t.float&&t.signed}),t.float?16==t.bits?(this.b=this.C,this.write=this.I):32==t.bits?(this.b=this.c?this.D:this.F,this.write=this.c?this.J:this.w):(this.b=this.c?this.G:this.H,this.write=this.c?this.K:this.A):(this.b=C.prototype.b,this.write=C.prototype.write)},k.C=function(t,r){return G(t,void 0===r?0:r,5,11)},k.F=function(t,r){return G(t,void 0===r?0:r,8,23)},k.D=function(t,r){return this.g[0]=C.prototype.b.call(this,t,void 0===r?0:r),this.s[0]},k.H=function(t,r){return G(t,void 0===r?0:r,11,52)},k.G=function(t,r){return r=void 0===r?0:r,this.g[this.m]=C.prototype.b.call(this,t,r),this.g[this.o]=C.prototype.b.call(this,t,r+4),this.u[0]},k.I=function(t,r,o){return E(t,void 0===o?0:o,r,5,11)},k.w=function(t,r,o){return E(t,void 0===o?0:o,r,8,23)},k.J=function(t,r,o){return o=void 0===o?0:o,r!=r?this.w(t,r,o):(this.s[0]=r,C.prototype.write.call(this,t,this.g[0],o))},k.A=function(t,r,o){return E(t,void 0===o?0:o,r,11,52)},k.K=function(t,r,o){return o=void 0===o?0:o,r!=r?this.A(t,r,o):(this.u[0]=r,o=C.prototype.write.call(this,t,this.g[this.m],o),C.prototype.write.call(this,t,this.g[this.o],o))};var byteData=exports;"undefined"!=typeof module?module.exports=exports:"function"==typeof define&&define.amd?define(["exports"],exports):"undefined"!=typeof global&&(global.byteData=exports);
