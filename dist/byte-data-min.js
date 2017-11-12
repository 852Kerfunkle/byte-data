/*
 byte-data
 Readable data to and from bytes.
 Copyright (c) 2017 Rafael da Silva Rocha.
 https://github.com/rochars/byte-data
 to-half: int bits of half-precision floating point values
 Based on:
 https://mail.mozilla.org/pipermail/es-discuss/2017-April/047994.html
 https://github.com/rochars/byte-data
*/
(function(a){function f(b){if(h[b])return h[b].a;var d=h[b]={Qa:b,fa:!1,a:{}};a[b].call(d.a,d,d.a,f);d.fa=!0;return d.a}var h={};f.Pa=a;f.Ma=h;f.M=function(b,a){f.N(b)||Object.defineProperty(b,"a",{configurable:!1,enumerable:!0,get:a})};f.Na=function(b){var a=b&&b.La?function(){return b["default"]}:function(){return b};f.M(a,a);return a};f.N=function(b){return Object.prototype.hasOwnProperty.call(b,"a")};f.Oa="";return f(f.Ra=7)})([function(a){function f(a){b[0]=a;return d[0]}var h=new Int8Array(4),
b=new Int32Array(h.buffer,0,1),d=new Float32Array(h.buffer,0,1);a.a=f;a.a.ha=f;a.a.za=function(a){d[0]=a;return b[0]}},function(a){a.a.padding=function(a,h,b){var d=a[b].length+1;2==h&&8>a[b].length?d=9:16==h&&(d=3);a[b].length<d-1&&(a[b]=Array(d-a[b].length).join("0")+a[b])};a.a.ka=function(a,h,b){2==h&&4>a[b].length&&(a[b]=Array(5-a[b].length).join("0")+a[b])};a.a.ja=function(a,h,b){(2==h||16==h)&&2>a[b].length&&(a[b]="0"+a[b])};a.a.O=function(a){8>a.length&&(a=Array(9-a.length).join("0")+a);return a}},
function(a){a.a.b=function(a,h){for(var b=a.length,d=0;d<b;){for(var g,k=a,l=d,e=0,c=h-1,m=parseInt(h/2,10);e<m;)g=k[l+e],k[l+e]=k[l+c],k[l+c]=g,e++,c--;d+=h}}},function(a,f,h){var b=h(4),d=h(0),g=h(9);a.a.Ia=function(a,d,e,c){d=b.ra(d[e]);a[c++]=d[1]&255;a[c++]=d[1]>>>8&255;a[c++]=d[1]>>>16&255;a[c++]=d[1]>>>24&255;a[c++]=d[0]&255;a[c++]=d[0]>>>8&255;a[c++]=d[0]>>>16&255;a[c++]=d[0]>>>24&255;return c};a.a.Ha=function(b,a,e,c){b[c++]=a[e]&255;b[c++]=a[e]>>8&255;b[c++]=a[e]>>16&255;b[c++]=a[e]>>24&
255;b[c++]=a[e]/4294967296&255;b[c++]=a[e]/1099511627776&255;return c};a.a.Ga=function(b,a,e,c){b[c++]=a[e]&255;b[c++]=a[e]>>8&255;b[c++]=a[e]>>16&255;b[c++]=a[e]>>24&255;b[c++]=a[e]/4294967296&255;return c};a.a.Fa=function(b,a,e,c){a[e]=d.za(a[e]);b[c++]=a[e]&255;b[c++]=a[e]>>>8&255;b[c++]=a[e]>>>16&255;b[c++]=a[e]>>>24&255;return c};a.a.Ea=function(b,a,e,c){b[c++]=a[e]&255;b[c++]=a[e]>>>8&255;b[c++]=a[e]>>>16&255;b[c++]=a[e]>>>24&255;return c};a.a.Da=function(b,a,e,c){b[c++]=a[e]&255;b[c++]=a[e]>>>
8&255;b[c++]=a[e]>>>16&255;return c};a.a.Ba=function(b,a,e,c){b[c++]=a[e]&255;b[c++]=a[e]>>>8&255;return c};a.a.Ca=function(b,a,e,c){a[e]=g.sa(a[e]);b[c++]=a[e]>>>8&255;b[c++]=a[e]&255;return c};a.a.Ja=function(b,a,e,c){b[c++]=a[e]&255;return c};a.a.Ka=function(b,a,e,c){b[c++]=a.charCodeAt(e);return c}},function(a){a.a.R=function(a){var f=(a&31744)>>10,b=a&1023;return(a>>15?-1:1)*(f?31===f?b?NaN:Infinity:Math.pow(2,f-15)*(1+b/1024):b/1024*.00006103515625)};a.a.P=function(a){if("0,0,0,0,0,0,0,0"==
a.toString())return 0;for(var f="",b,d=0,g=a.length;d<g;){for(b=a[d].toString(2);8>b.length;)b="0"+b;f=b+f;d++}a="1"+f.substr(12,52);b=1;for(d=g=0;d<a.length;)g+=b*parseInt(a.charAt(d),10),b/=2,d++;f=("1"==f.charAt(0)?-1:1)*g*Math.pow(2,parseInt(f.substr(1,11),2)-1023);return 2===f?0:f};a.a.ra=function(a){if(0==a)return[0,0];var f=0;0>=a&&(f=2147483648,a=-a);var b=Math.floor(Math.log(a)/Math.log(2)),d=Math.floor(a/Math.pow(2,b)*Math.pow(2,52));a=d&4294967295;d/=Math.pow(2,32);return[f|b+1023<<20|
d&1048575,a]}},function(a){a.a.f={1:1,2:1,4:1,8:1,16:2,24:3,32:4,40:5,48:6,64:8};a.a.ga={2:4,4:16,8:256,16:65536,24:16777216,32:4294967296,40:1099511627776,48:281474976710656}},function(a,f,h){function b(a,c,b){--b;for(var e="";0<=b;)e+=g.O(a[b+c].toString(2)),b--;return parseInt(e,2)}function d(a,c){return(a[3+c]<<24|a[2+c]<<16|a[1+c]<<8|a[c])>>>0}var g=h(1),k=h(4),l=h(0);a.a.pa=function(a,c){return String.fromCharCode(a[c])};a.a.ma=function(a,c){return parseInt(a[c],2)};a.a.c=function(a,c){return a[c]};
a.a.w=function(a,c){return a[1+c]<<8|a[c]};a.a.la=function(a,c){a=a.slice(c,c+2);c="";for(var b,e=0,d=a.length;e<d;){for(b=a[e].toString(2);8>b.length;)b="0"+b;c+=b;e++}c=parseInt(c,2);return k.R(c)};a.a.A=function(a,c){return a[2+c]<<16|a[1+c]<<8|a[c]};a.a.B=d;a.a.na=function(a,c){return l.ha(d(a,c))};a.a.C=function(a,c){return b(a,c,5)};a.a.D=function(a,c){return b(a,c,6)};a.a.oa=function(a,c){return k.P(a.slice(c,c+8))}},function(a,f,h){f=h(8);var b=h(10),d=h(11);h(3);h(6);a.a.u=d.u;a.a.K=d.K;
a.a.v=d.v;a.a.L=d.L;window.packNibbles=d.ia;window.unpackNibbles=d.Aa;window.findString=function(a,d){for(var g,e=0;e<a.length;e++)if(g=b.F(a.slice(e,e+d.length)),g==d)return e;return-1};window.stringToBytes=f.qa;window.stringFromBytes=b.F;window.doubleTo8Bytes=f.j;window.floatTo8Bytes=f.j;window.floatTo4Bytes=f.T;window.intTo6Bytes=f.da;window.intTo5Bytes=f.ca;window.intTo4Bytes=f.ba;window.intTo3Bytes=f.aa;window.intTo2Bytes=f.$;a.a.i=f.i;window.intTo1Byte=f.Z;window.intToNibble=f.ea;a.a.H=f.H;
a.a.G=f.G;window.floatFrom8Bytes=b.h;window.doubleFrom8Bytes=b.h;a.a.o=b.o;a.a.I=b.I;a.a.m=b.m;window.uIntFrom5Bytes=b.xa;window.intFrom4Bytes=b.X;window.uIntFrom4Bytes=b.wa;window.floatFrom4Bytes=b.S;window.intFrom3Bytes=b.W;window.uIntFrom3Bytes=b.va;a.a.g=b.g;window.intFrom2Bytes=b.V;window.uIntFrom2Bytes=b.ua;window.intFrom1Byte=b.U;window.uIntFrom1Byte=b.ta;window.intFromNibble=b.Y;window.uIntFromNibble=b.ya;a.a.s=b.s;a.a.J=b.J;a.a.l=b.l},function(a,f,h){function b(a,b,g,f,h){for(var c=0,m=0,
p=a.length,l=[];c<p;)m=g(l,a,c,m),c++;d(l,b);h&&k.b(l,e.f[f]);return l}function d(a,b,e){e=void 0===e?g.padding:e;if(10!=b)for(var c=0,d=a.length;c<d;)a[c]=a[c].toString(b),e(a,b,c),c++}h(0);var g=h(1),k=h(2),l=h(3),e=h(5);a.a.Sa=b;a.a.j=function(a,e,d){return b(a,void 0===e?10:e,l.Ia,64,void 0===d?!1:d)};a.a.T=function(a,e,d){return b(a,void 0===e?10:e,l.Fa,32,void 0===d?!1:d)};a.a.i=function(a,e,d){return b(a,void 0===e?10:e,l.Ca,16,void 0===d?!1:d)};a.a.da=function(a,e,d){return b(a,void 0===e?
10:e,l.Ha,48,void 0===d?!1:d)};a.a.ca=function(a,e,d){return b(a,void 0===e?10:e,l.Ga,40,void 0===d?!1:d)};a.a.ba=function(a,e,d){return b(a,void 0===e?10:e,l.Ea,32,void 0===d?!1:d)};a.a.aa=function(a,e,d){return b(a,void 0===e?10:e,l.Da,24,void 0===d?!1:d)};a.a.$=function(a,e,d){return b(a,void 0===e?10:e,l.Ba,16,void 0===d?!1:d)};a.a.Z=function(a,e){return b(a,void 0===e?10:e,l.Ja,8,!1)};a.a.ea=function(a,b){for(var c=0,e=0,f=a.length,k=[];c<f;)k[e++]=a[c]&15,c++;d(k,void 0===b?10:b,g.ka);return k};
a.a.H=function(a,b){for(var c=0,e=0,f=a.length,k=[];c<f;)k[e++]=0>a[c]?a[c]+4:a[c],c++;d(k,void 0===b?10:b,g.ja);return k};a.a.G=function(a,b){for(var c=0,e=0,g=a.length,f=[];c<g;)f[e++]=a[c]?1:0,c++;d(f,void 0===b?10:b,function(){});return f};a.a.qa=function(a,e){return b(a,void 0===e?10:e,l.Ka,8,!1)}},function(a){var f=new Float32Array(1),h=new Int32Array(f.buffer);a.a.sa=function(a){f[0]=a;var b=h[0];a=b>>16&32768;var g=b>>12&2047;b=b>>23&255;return 103>b?a:(a|b-112<<10|g>>1)+(g&1)}},function(a,
f,h){function b(a,b,d,f,g){var c=[],e=0,k=0,h=l.f[f],m=a.length-(h-1);f=l.ga[f];if(10!=b)for(var n=0,p=a.length;n<p;)a[n]=parseInt(a[n],b),n++;if(void 0===g?0:g)for(;e<m;)b=k,g=d(a,e),g>parseInt(f/2,10)-1&&(g-=f),c[b]=g,e+=h,k++;else for(;e<m;)c[k]=d(a,e),e+=h,k++;return c}function d(a,c){return b(a,void 0===c?10:c,k.c,8)}h(1);var g=h(2),k=h(6),l=h(5);a.a.l=function(a,c){return b(a,void 0===c?10:c,k.ma,1)};a.a.s=function(a,c){return b(a,void 0===c?10:c,k.c,2,!0)};a.a.J=d;a.a.Y=function(a,c){return b(a,
void 0===c?10:c,k.c,4,!0)};a.a.ya=d;a.a.U=function(a,c){return b(a,void 0===c?10:c,k.c,8,!0)};a.a.ta=d;a.a.V=function(a,c,d){c=void 0===c?10:c;(void 0===d?0:d)&&g.b(a,2);return b(a,c,k.w,16,!0)};a.a.ua=function(a,c,d){c=void 0===c?10:c;(void 0===d?0:d)&&g.b(a,2);return b(a,c,k.w,16)};a.a.g=function(a,c,d){c=void 0===c?10:c;(void 0===d?0:d)&&g.b(a,2);return b(a,c,k.la,16)};a.a.W=function(a,c,d){c=void 0===c?10:c;(void 0===d?0:d)&&g.b(a,3);return b(a,c,k.A,24,!0)};a.a.va=function(a,c,d){c=void 0===
c?10:c;(void 0===d?0:d)&&g.b(a,3);return b(a,c,k.A,24)};a.a.X=function(a,c,d){c=void 0===c?10:c;(void 0===d?0:d)&&g.b(a,4);return b(a,c,k.B,32,!0)};a.a.wa=function(a,c,d){c=void 0===c?10:c;(void 0===d?0:d)&&g.b(a,4);return b(a,c,k.B,32)};a.a.S=function(a,c,d){c=void 0===c?10:c;(void 0===d?0:d)&&g.b(a,4);return b(a,c,k.na,32)};a.a.m=function(a,c,d){c=void 0===c?10:c;(void 0===d?0:d)&&g.b(a,5);return b(a,c,k.C,40,!0)};a.a.xa=function(a,c,d){c=void 0===c?10:c;(void 0===d?0:d)&&g.b(a,5);return b(a,c,
k.C,40)};a.a.o=function(a,c,d){c=void 0===c?10:c;(void 0===d?0:d)&&g.b(a,6);return b(a,c,k.D,48,!0)};a.a.I=function(a,c,d){c=void 0===c?10:c;(void 0===d?0:d)&&g.b(a,6);return b(a,c,k.D,48)};a.a.h=function(a,c,d){c=void 0===c?10:c;(void 0===d?0:d)&&g.b(a,8);return b(a,c,k.oa,64)};a.a.F=function(a,c){return b(a,void 0===c?10:c,k.pa,8).join("")}},function(a){function f(a,d){for(;a.length<d;)a="0"+a;return a}function h(a,d){var b=0,f=a.length%d;if(f)for(f=-1*(f-d);b<f;)a.push(0),b++}a.a.u=function(a){var b=
[],g=0,k=0;h(a,8);for(var l=a.length-7;g<l;)b[k++]=parseInt(f(a[g].toString(2),1)+f(a[g+1].toString(2),1)+f(a[g+2].toString(2),1)+f(a[g+3].toString(2),1)+f(a[g+4].toString(2),1)+f(a[g+5].toString(2),1)+f(a[g+6].toString(2),1)+f(a[g+7].toString(2),1),2),g+=8;return b};a.a.K=function(a){for(var b=[],g=0,k=0,h=a.length,e;g<h;)e=f(a[g].toString(2),8),b[k++]=parseInt(e[0],2),b[k++]=parseInt(e[1],2),b[k++]=parseInt(e[2],2),b[k++]=parseInt(e[3],2),b[k++]=parseInt(e[4],2),b[k++]=parseInt(e[5],2),b[k++]=parseInt(e[6],
2),b[k++]=parseInt(e[7],2),g++;return b};a.a.v=function(a){var b=[],g=0,k=0;h(a,4);for(var l=a.length-3;g<l;)b[k++]=parseInt(f(a[g].toString(2),2)+f(a[g+1].toString(2),2)+f(a[g+2].toString(2),2)+f(a[g+3].toString(2),2),2),g+=4;return b};a.a.L=function(a){var b=[],g=0,k=0,h=a.length;for(console.log(h);g<h;){var e=f(a[g].toString(2),8);b[k++]=parseInt(e[0]+e[1],2);b[k++]=parseInt(e[2]+e[3],2);b[k++]=parseInt(e[4]+e[5],2);b[k++]=parseInt(e[6]+e[7],2);g++}return b};a.a.ia=function(a){var b=[],f=0,k=0,
h=a.length;for(h%2&&a.push(0);f<h;)b[k++]=parseInt(a[f].toString(16)+a[f+1].toString(16),16),f+=2;return b};a.a.Aa=function(a){for(var b=[],f=0,k=0,h=a.length;f<h;)b[k++]=parseInt(a[f].toString(16)[0],16),b[k++]=parseInt(a[f].toString(16)[1],16),f++;return b}}]);
