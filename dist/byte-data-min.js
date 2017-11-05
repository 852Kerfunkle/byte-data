/*
 byte-data
 Bytes to and from numbers and strings.
 Copyright (c) 2017 Rafael da Silva Rocha.
 https://github.com/rochars/byte-data
*/
(function(k){function h(g){if(n[g])return n[g].a;var m=n[g]={$:g,L:!1,a:{}};k[g].call(m.a,m,m.a,h);m.L=!0;return m.a}var n={};h.Z=k;h.W=n;h.m=function(g,k){h.o(g)||Object.defineProperty(g,"a",{configurable:!1,enumerable:!0,get:k})};h.X=function(g){var k=g&&g.V?function(){return g["default"]}:function(){return g};h.m(k,k);return k};h.o=function(g){return Object.prototype.hasOwnProperty.call(g,"a")};h.Y="";return h(h.aa=2)})([function(k){function h(h){g[0]=h;return m[0]}var n=new Int8Array(4),g=new Int32Array(n.buffer,
0,1),m=new Float32Array(n.buffer,0,1);k.a=h;k.a.h=h;k.a.l=function(h){m[0]=h;return g[0]}},function(k){k.a.padding=function(h,k,g){var m=h[g].length+1;2==k&&8>h[g].length?m=9:16==k&&(m=3);h[g].length<m-1&&(h[g]=Array(m-h[g].length).join("0")+h[g])};k.a.M=function(h,k,g){2==k&&4>h[g].length?h[g]=Array(5-h[g].length).join("0")+h[g]:16==k&&2==h[g].length&&"0"==h[g][0]&&(h[g]=h[g][1])};k.a.b=function(h,k){var g=h.length+1;2==k?g=9:16==k&&(g=3);h.length<g-1&&(h=Array(g-h.length).join("0")+h);return h}},
function(k,h,n){h=n(3);var g=n(4);window.packNibbles=function(g){var h=[],f=0,b=0,a=g.length;for(a%2&&g.push(0);f<a;)h[b++]=parseInt(g[f].toString(16)+g[f+1].toString(16),16),f+=2;return h};window.unpackNibbles=function(g){for(var h=[],f=0,b=0,a=g.length;f<a;)h[b++]=parseInt(g[f].toString(16)[0],16),h[b++]=parseInt(g[f].toString(16)[1],16),f++;return h};window.findString=function(h,k){for(var f,b=0;b<h.length;b++)if(f=g.i(h.slice(b,b+k.length)),f==k)return b;return-1};window.stringToBytes=h.N;window.stringFromBytes=
g.i;window.doubleTo8Bytes=h.f;window.floatTo8Bytes=h.f;window.floatTo4Bytes=h.u;window.intTo6Bytes=h.J;window.intTo5Bytes=h.I;window.intTo4Bytes=h.H;window.intTo3Bytes=h.G;window.intTo2Bytes=h.F;window.intTo1Byte=h.D;window.intToNibble=h.K;k.a.j=h.j;window.floatFrom8Bytes=g.c;window.doubleFrom8Bytes=g.c;window.uIntFrom5Bytes=g.T;window.intFrom4Bytes=g.B;window.uIntFrom4Bytes=g.S;window.floatFrom4Bytes=g.s;window.intFrom3Bytes=g.A;window.uIntFrom3Bytes=g.R;window.intFrom2Bytes=g.w;window.uIntFrom2Bytes=
g.P;window.intFrom1Byte=g.v;window.uIntFrom1Byte=g.O;window.intFromNibble=g.C;window.uIntFromNibble=g.U;k.a.g=g.g},function(k,h,n){function g(f){var b=0;0>=f&&(b=2147483648,f=-f);var a=Math.floor(Math.log(f)/Math.log(2)),c=Math.floor(f/Math.pow(2,a)*Math.pow(2,52));f=c&4294967295;c/=Math.pow(2,32);return[b|a+1023<<20|c&1048575,f]}var m=n(0),l=n(1);k.a.f=function(f,b){b=void 0===b?10:b;var a=0,c=0,e=f.length,d=[];if(10==b)for(;a<e;)0==f[a]?(d=d.concat([0,0,0,0,0,0,0,0]),c+=8):(f[a]=g(f[a]),d[c++]=
f[a][1]&255,d[c++]=f[a][1]>>>8&255,d[c++]=f[a][1]>>>16&255,d[c++]=f[a][1]>>>24&255,d[c++]=f[a][0]&255,d[c++]=f[a][0]>>>8&255,d[c++]=f[a][0]>>>16&255,d[c++]=f[a][0]>>>24&255),a++;else for(;a<e;)0==f[a]?(d=d.concat([0,0,0,0,0,0,0,0]),c+=8):(f[a]=g(f[a]),d[c++]=(f[a][1]&255).toString(b),l.padding(d,b,c-1),d[c++]=(f[a][1]>>>8&255).toString(b),l.padding(d,b,c-1),d[c++]=(f[a][1]>>>16&255).toString(b),l.padding(d,b,c-1),d[c++]=(f[a][1]>>>24&255).toString(b),l.padding(d,b,c-1),d[c++]=(f[a][0]&255).toString(b),
l.padding(d,b,c-1),d[c++]=(f[a][0]>>>8&255).toString(b),l.padding(d,b,c-1),d[c++]=(f[a][0]>>>16&255).toString(b),l.padding(d,b,c-1),d[c++]=(f[a][0]>>>24&255).toString(b),l.padding(d,b,c-1)),a++;return d};k.a.u=function(f,b){b=void 0===b?10:b;var a=0,c=0,e=f.length,d=[];if(10==b)for(;a<e;)f[a]=m.l(f[a]),d[c++]=f[a]&255,d[c++]=f[a]>>>8&255,d[c++]=f[a]>>>16&255,d[c++]=f[a]>>>24&255,a++;else for(;a<e;)f[a]=m.l(f[a]),d[c++]=(f[a]&255).toString(b),l.padding(d,b,c-1),d[c++]=(f[a]>>>8&255).toString(b),l.padding(d,
b,c-1),d[c++]=(f[a]>>>16&255).toString(b),l.padding(d,b,c-1),d[c++]=(f[a]>>>24&255).toString(b),l.padding(d,b,c-1),a++;return d};k.a.J=function(f,b){b=void 0===b?10:b;var a=0,c=0,e=f.length,d=[];if(10==b)for(;a<e;)d[c++]=f[a]&255,d[c++]=f[a]>>8&255,d[c++]=f[a]>>16&255,d[c++]=f[a]>>24&255,d[c++]=f[a]/4294967296&255,d[c++]=f[a]/1099511627776&255,a++;else for(;a<e;)d[c++]=(f[a]&255).toString(b),l.padding(d,b,c-1),d[c++]=(f[a]>>8&255).toString(b),l.padding(d,b,c-1),d[c++]=(f[a]>>16&255).toString(b),l.padding(d,
b,c-1),d[c++]=(f[a]>>24&255).toString(b),l.padding(d,b,c-1),d[c++]=(f[a]/4294967296&255).toString(b),l.padding(d,b,c-1),d[c++]=(f[a]/1099511627776&255).toString(b),l.padding(d,b,c-1),a++;return d};k.a.I=function(f,b){b=void 0===b?10:b;var a=0,c=0,e=f.length,d=[];if(10==b)for(;a<e;)d[c++]=f[a]&255,d[c++]=f[a]>>8&255,d[c++]=f[a]>>16&255,d[c++]=f[a]>>24&255,d[c++]=f[a]/4294967296&255,a++;else for(;a<e;)d[c++]=(f[a]&255).toString(b),l.padding(d,b,c-1),d[c++]=(f[a]>>8&255).toString(b),l.padding(d,b,c-
1),d[c++]=(f[a]>>16&255).toString(b),l.padding(d,b,c-1),d[c++]=(f[a]>>24&255).toString(b),l.padding(d,b,c-1),d[c++]=(f[a]/4294967296&255).toString(b),l.padding(d,b,c-1),a++;return d};k.a.H=function(f,b){b=void 0===b?10:b;var a=0,c=0,e=f.length,d=[];if(10==b)for(;a<e;)d[c++]=f[a]&255,d[c++]=f[a]>>>8&255,d[c++]=f[a]>>>16&255,d[c++]=f[a]>>>24&255,a++;else for(;a<e;)d[c++]=(f[a]&255).toString(b),l.padding(d,b,c-1),d[c++]=(f[a]>>>8&255).toString(b),l.padding(d,b,c-1),d[c++]=(f[a]>>>16&255).toString(b),
l.padding(d,b,c-1),d[c++]=(f[a]>>>24&255).toString(b),l.padding(d,b,c-1),a++;return d};k.a.G=function(f,b){b=void 0===b?10:b;var a=0,c=0,e=f.length,d=[];if(10==b)for(;a<e;)d[c++]=f[a]&255,d[c++]=f[a]>>>8&255,d[c++]=f[a]>>>16&255,a++;else for(;a<e;)d[c++]=(f[a]&255).toString(b),l.padding(d,b,c-1),d[c++]=(f[a]>>>8&255).toString(b),l.padding(d,b,c-1),d[c++]=(f[a]>>>16&255).toString(b),l.padding(d,b,c-1),a++;return d};k.a.F=function(f,b){b=void 0===b?10:b;var a=0,c=0,e=f.length,d=[];if(10==b)for(;a<e;)d[c++]=
f[a]&255,d[c++]=f[a]>>>8&255,a++;else for(;a<e;)d[c++]=(f[a]&255).toString(b),l.padding(d,b,c-1),d[c++]=(f[a]>>>8&255).toString(b),l.padding(d,b,c-1),a++;return d};k.a.D=function(f,b){b=void 0===b?10:b;var a=0,c=0,e=f.length,d=[];if(10==b)for(;a<e;)d[c++]=f[a]&255,a++;else for(;a<e;)d[c++]=(f[a]&255).toString(b),l.padding(d,b,c-1),a++;return d};k.a.K=function(f,b){b=void 0===b?10:b;var a=0,c=0,e=f.length,d=[];if(10==b)for(;a<e;)d[c++]=f[a]&15,a++;else for(;a<e;)d[c++]=(f[a]&15).toString(b),l.padding(d,
b,c-1),2==b&&(d[c-1]=d[c-1].slice(4,8)),l.M(d,b,c-1),a++;return d};k.a.j=function(f,b){var a=0,c=0,e=f.length,d=[];if(10==(void 0===b?10:b))for(;a<e;)d[c++]=f[a]?1:0,a++;else for(;a<e;)d[c++]=f[a]?"1":"0",a++;return d};k.a.N=function(f,b){b=void 0===b?10:b;var a=0,c=0,e=f.length,d=[];if(10==b)for(;a<e;)d[c++]=f.charCodeAt(a),l.padding(d,b,c-1),a++;else for(;a<e;)d[c++]=f.charCodeAt(a).toString(b),a++;return d}},function(k,h,n){function g(b){if("0,0,0,0,0,0,0,0"==b.toString())return 0;for(var a="",
c,e=0,d=b.length;e<d;){for(c=b[e].toString(2);8>c.length;)c="0"+c;a=c+a;e++}b="1"+a.substr(12,52);c=1;for(e=d=0;e<b.length;)d+=c*parseInt(b.charAt(e),10),c/=2,e++;a=("1"==a.charAt(0)?-1:1)*d*Math.pow(2,parseInt(a.substr(1,11),2)-1023);return 2===a?0:a}function m(b,a){a=void 0===a?10:a;if(10==a)return[].slice.call(b);for(var c=[],e=0,d=b.length;e<d;)c[e]=parseInt(b[e],a),e++;return c}var l=n(0),f=n(1);k.a.g=function(b,a){a=void 0===a?10:a;for(var c=[],e=0,d=b.length;e<d;)c[e]=parseInt(parseInt(b[e],
a),2),e++;return c};k.a.C=function(b,a){a=void 0===a?10:a;var c=[],e=0,d=b.length;if(10==a)for(;e<d;)c[e]=b[e],7<c[e]&&(c[e]-=16),e++;else for(;e<d;)c[e]=parseInt(b[e],a),7<c[e]&&(c[e]-=16),e++;return c};k.a.U=m;k.a.v=function(b,a){a=void 0===a?10:a;var c=[],e=0,d=b.length;if(10==a)for(;e<d;)c[e]=b[e],127<c[e]&&(c[e]-=256),e++;else for(;e<d;)c[e]=parseInt(b[e],a),127<c[e]&&(c[e]-=256),e++;return c};k.a.O=m;k.a.w=function(b,a){a=void 0===a?10:a;var c=[],e=0,d=0,f=b.length;if(10==a)for(;e<f;)c[d]=b[1+
e]<<8|b[e],b[1+e]&128&&(c[d]|=4294901760),d++,e+=2;else for(;e<f;)c[d]=parseInt(b[1+e],a)<<8|parseInt(b[e],a),parseInt(b[1+e],a)&128&&(c[d]|=4294901760),d++,e+=2;return c};k.a.P=function(b,a){a=void 0===a?10:a;var c=[],e=0,d=0,f=b.length;if(10==a)for(;e<f;)c[d]=b[1+e]<<8|b[e],d++,e+=2;else for(;e<f;)c[d]=parseInt(b[1+e],a)<<8|parseInt(b[e],a),d++,e+=2;return c};k.a.A=function(b,a){a=void 0===a?10:a;var c=[],e=0,d=0,f=b.length;if(10==a)for(;e<f;)c[d]=b[2+e]<<16|b[1+e]<<8|b[e],c[d]=0<(c[d]&8388608)?
c[d]|4278190080:c[d]&16777215,d++,e+=3;else for(;e<f;)c[d]=parseInt(b[2+e],a)<<16|parseInt(b[1+e],a)<<8|parseInt(b[e],a),c[d]=0<(c[d]&8388608)?c[d]|4278190080:c[d]&16777215,d++,e+=3;return c};k.a.R=function(b,a){a=void 0===a?10:a;var c=[],e=0,d=0,f=b.length;if(10==a)for(;e<f;)c[d]=b[2+e]<<16|b[1+e]<<8|b[e],d++,e+=3;else for(;e<f;)c[d]=parseInt(b[2+e],a)<<16|parseInt(b[1+e],a)<<8|parseInt(b[e],a),d++,e+=3;return c};k.a.B=function(b,a){a=void 0===a?10:a;var c=[],e=0,d=0,f=b.length;if(10==a)for(;e<f;)c[d]=
b[3+e]<<24|b[2+e]<<16|b[1+e]<<8|b[e],0>(c[d]&2147483648)&&(c[d]&=4294967295),d++,e+=4;else for(;e<f;)c[d]=parseInt(b[3+e],a)<<24|parseInt(b[2+e],a)<<16|parseInt(b[1+e],a)<<8|parseInt(b[e],a),0>(c[d]&2147483648)&&(c[d]&=4294967295),d++,e+=4;return c};k.a.S=function(b,a){a=void 0===a?10:a;var c=[],e=0,d=0,f=b.length;if(10==a)for(;e<f;)c[d]=b[3+e]<<24|b[2+e]<<16|b[1+e]<<8|b[e],c[d]>>>=0,d++,e+=4;else for(;e<f;)c[d]=parseInt(b[3+e],a)<<24|parseInt(b[2+e],a)<<16|parseInt(b[1+e],a)<<8|parseInt(b[e],a),
c[d]>>>=0,d++,e+=4;return c};k.a.s=function(b,a){a=void 0===a?10:a;var c=[],e=0,d=0,f=b.length;if(10==a)for(;e<f;)c[d]=l.h(b[3+e]<<24|b[2+e]<<16|b[1+e]<<8|b[e]),d++,e+=4;else for(;e<f;)c[d]=l.h(parseInt(b[3+e],a)<<24|parseInt(b[2+e],a)<<16|parseInt(b[1+e],a)<<8|parseInt(b[e],a)),d++,e+=4;return c};k.a.T=function(b,a){a=void 0===a?10:a;var c=[],e=0,d=0,g=b.length;if(10==a)for(;e<g;)c[d]=parseInt(b[4+e].toString(2)+b[3+e].toString(2)+b[2+e].toString(2)+b[1+e].toString(2)+b[e].toString(2),2),d++,e+=
5;else for(;e<g;)c[d]=parseInt(f.b(b[4+e],a)+f.b(b[3+e],a)+f.b(b[2+e],a)+f.b(b[1+e],a)+f.b(b[e],a),a),d++,e+=5;return c};k.a.c=function(b,a){a=void 0===a?10:a;var c=[],e=0,d=0,f=b.length;if(10==a)for(;e<f;)c[d]=g([b[e],b[1+e],b[2+e],b[3+e],b[4+e],b[5+e],b[6+e],b[7+e]]),d++,e+=8;else for(;e<f;)c[d]=g([parseInt(b[e],a),parseInt(b[e+1],a),parseInt(b[e+2],a),parseInt(b[e+3],a),parseInt(b[e+4],a),parseInt(b[e+5],a),parseInt(b[e+6],a),parseInt(b[e+7],a)]),d++,e+=8;return c};k.a.i=function(b,a){a=void 0===
a?10:a;var c="",e=0,d=b.length;if(10==a)for(;e<d;)c+=String.fromCharCode(b[e]),e++;else for(;e<d;)c+=String.fromCharCode(parseInt(b[e],a)),e++;return c}}]);
