parcelRequire=function(e,r,n){var t="function"==typeof parcelRequire&&parcelRequire,i="function"==typeof require&&require;function u(n,o){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!o&&f)return f(n,!0);if(t)return t(n,!0);if(i&&"string"==typeof n)return i(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}a.resolve=function(r){return e[n][1][r]||r};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,a,l,l.exports)}return r[n].exports;function a(e){return u(a.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=t;for(var o=0;o<n.length;o++)u(n[o]);return u}({3:[function(require,module,exports) {
"use strict";var t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},e={cipher:{},hash:{},keyexchange:{},mode:{},misc:{},codec:{},exception:{corrupt:function(t){this.toString=function(){return"CORRUPT: "+this.message},this.message=t},invalid:function(t){this.toString=function(){return"INVALID: "+this.message},this.message=t},bug:function(t){this.toString=function(){return"BUG: "+this.message},this.message=t},notReady:function(t){this.toString=function(){return"NOT READY: "+this.message},this.message=t}}};"undefined"!=typeof module&&module.exports&&(module.exports=e),e.cipher.aes=function(t){this.h[0][0][0]||this.w();var i,n,r,o,s=this.h[0][4],a=this.h[1],c=1;if(4!==(i=t.length)&&6!==i&&8!==i)throw new e.exception.invalid("invalid aes key size");for(this.a=[r=t.slice(0),o=[]],t=i;t<4*i+28;t++)n=r[t-1],(t%i==0||8===i&&t%i==4)&&(n=s[n>>>24]<<24^s[n>>16&255]<<16^s[n>>8&255]<<8^s[255&n],t%i==0&&(n=n<<8^n>>>24^c<<24,c=c<<1^283*(c>>7))),r[t]=r[t-i]^n;for(i=0;t;i++,t--)n=r[3&i?t:t-4],o[i]=t<=4||i<4?n:a[0][s[n>>>24]]^a[1][s[n>>16&255]]^a[2][s[n>>8&255]]^a[3][s[255&n]]},e.cipher.aes.prototype={encrypt:function(t){return this.H(t,0)},decrypt:function(t){return this.H(t,1)},h:[[[],[],[],[],[]],[[],[],[],[],[]]],w:function(){var t,e,i,n,r,o,s,a=this.h[0],c=this.h[1],h=a[4],f=c[4],u=[],d=[];for(t=0;t<256;t++)d[(u[t]=t<<1^283*(t>>7))^t]=t;for(e=i=0;!h[e];e^=n||1,i=d[i]||1)for(o=(o=i^i<<1^i<<2^i<<3^i<<4)>>8^255&o^99,h[e]=o,f[o]=e,s=16843009*(r=u[t=u[n=u[e]]])^65537*t^257*n^16843008*e,r=257*u[o]^16843008*o,t=0;t<4;t++)a[t][e]=r=r<<24^r>>>8,c[t][o]=s=s<<24^s>>>8;for(t=0;t<5;t++)a[t]=a[t].slice(0),c[t]=c[t].slice(0)},H:function(t,i){if(4!==t.length)throw new e.exception.invalid("invalid aes block size");var n=this.a[i],r=t[0]^n[0],o=t[i?3:1]^n[1],s=t[2]^n[2];t=t[i?1:3]^n[3];var a,c,h,f,u=n.length/4-2,d=4,l=[0,0,0,0],p=(a=this.h[i])[0],m=a[1],g=a[2],y=a[3],b=a[4];for(f=0;f<u;f++)a=p[r>>>24]^m[o>>16&255]^g[s>>8&255]^y[255&t]^n[d],c=p[o>>>24]^m[s>>16&255]^g[t>>8&255]^y[255&r]^n[d+1],h=p[s>>>24]^m[t>>16&255]^g[r>>8&255]^y[255&o]^n[d+2],t=p[t>>>24]^m[r>>16&255]^g[o>>8&255]^y[255&s]^n[d+3],d+=4,r=a,o=c,s=h;for(f=0;f<4;f++)l[i?3&-f:f]=b[r>>>24]<<24^b[o>>16&255]<<16^b[s>>8&255]<<8^b[255&t]^n[d++],a=r,r=o,o=s,s=t,t=a;return l}},e.bitArray={bitSlice:function(t,i,n){return t=e.bitArray.P(t.slice(i/32),32-(31&i)).slice(1),void 0===n?t:e.bitArray.clamp(t,n-i)},extract:function(t,e,i){var n=Math.floor(-e-i&31);return(-32&(e+i-1^e)?t[e/32|0]<<32-n^t[e/32+1|0]>>>n:t[e/32|0]>>>n)&(1<<i)-1},concat:function(t,i){if(0===t.length||0===i.length)return t.concat(i);var n=t[t.length-1],r=e.bitArray.getPartial(n);return 32===r?t.concat(i):e.bitArray.P(i,r,0|n,t.slice(0,t.length-1))},bitLength:function(t){var i=t.length;return 0===i?0:32*(i-1)+e.bitArray.getPartial(t[i-1])},clamp:function(t,i){if(32*t.length<i)return t;var n=(t=t.slice(0,Math.ceil(i/32))).length;return i&=31,n>0&&i&&(t[n-1]=e.bitArray.partial(i,t[n-1]&2147483648>>i-1,1)),t},partial:function(t,e,i){return 32===t?e:(i?0|e:e<<32-t)+1099511627776*t},getPartial:function(t){return Math.round(t/1099511627776)||32},equal:function(t,i){if(e.bitArray.bitLength(t)!==e.bitArray.bitLength(i))return!1;var n,r=0;for(n=0;n<t.length;n++)r|=t[n]^i[n];return 0===r},P:function(t,i,n,r){var o;for(o=0,void 0===r&&(r=[]);i>=32;i-=32)r.push(n),n=0;if(0===i)return r.concat(t);for(o=0;o<t.length;o++)r.push(n|t[o]>>>i),n=t[o]<<32-i;return o=t.length?t[t.length-1]:0,t=e.bitArray.getPartial(o),r.push(e.bitArray.partial(i+t&31,i+t>32?n:r.pop(),1)),r},k:function(t,e){return[t[0]^e[0],t[1]^e[1],t[2]^e[2],t[3]^e[3]]}},e.codec.utf8String={fromBits:function(t){var i,n,r="",o=e.bitArray.bitLength(t);for(i=0;i<o/8;i++)0==(3&i)&&(n=t[i/4]),r+=String.fromCharCode(n>>>24),n<<=8;return decodeURIComponent(escape(r))},toBits:function(t){t=unescape(encodeURIComponent(t));var i,n=[],r=0;for(i=0;i<t.length;i++)r=r<<8|t.charCodeAt(i),3==(3&i)&&(n.push(r),r=0);return 3&i&&n.push(e.bitArray.partial(8*(3&i),r)),n}},e.codec.hex={fromBits:function(t){var i,n="";for(i=0;i<t.length;i++)n+=(0xf00000000000+(0|t[i])).toString(16).substr(4);return n.substr(0,e.bitArray.bitLength(t)/4)},toBits:function(t){var i,n,r=[];for(n=(t=t.replace(/\s|0x/g,"")).length,t+="00000000",i=0;i<t.length;i+=8)r.push(0^parseInt(t.substr(i,8),16));return e.bitArray.clamp(r,4*n)}},e.codec.base64={D:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",fromBits:function(t,i,n){var r="",o=0,s=e.codec.base64.D,a=0,c=e.bitArray.bitLength(t);for(n&&(s=s.substr(0,62)+"-_"),n=0;6*r.length<c;)r+=s.charAt((a^t[n]>>>o)>>>26),o<6?(a=t[n]<<6-o,o+=26,n++):(a<<=6,o-=6);for(;3&r.length&&!i;)r+="=";return r},toBits:function(t,i){t=t.replace(/\s|=/g,"");var n,r=[],o=0,s=e.codec.base64.D,a=0;for(i&&(s=s.substr(0,62)+"-_"),i=0;i<t.length;i++){if((n=s.indexOf(t.charAt(i)))<0)throw new e.exception.invalid("this isn't base64!");o>26?(o-=26,r.push(a^n>>>o),a=n<<32-o):a^=n<<32-(o+=6)}return 56&o&&r.push(e.bitArray.partial(56&o,a,1)),r}},e.codec.base64url={fromBits:function(t){return e.codec.base64.fromBits(t,1,1)},toBits:function(t){return e.codec.base64.toBits(t,1)}},e.hash.sha256=function(t){this.a[0]||this.w(),t?(this.n=t.n.slice(0),this.i=t.i.slice(0),this.e=t.e):this.reset()},e.hash.sha256.hash=function(t){return(new e.hash.sha256).update(t).finalize()},e.hash.sha256.prototype={blockSize:512,reset:function(){return this.n=this.N.slice(0),this.i=[],this.e=0,this},update:function(t){"string"==typeof t&&(t=e.codec.utf8String.toBits(t));var i,n=this.i=e.bitArray.concat(this.i,t);for(i=this.e,t=this.e=i+e.bitArray.bitLength(t),i=512+i&-512;i<=t;i+=512)this.C(n.splice(0,16));return this},finalize:function(){var t,i=this.i,n=this.n;for(t=(i=e.bitArray.concat(i,[e.bitArray.partial(1,1)])).length+2;15&t;t++)i.push(0);for(i.push(Math.floor(this.e/4294967296)),i.push(0|this.e);i.length;)this.C(i.splice(0,16));return this.reset(),n},N:[],a:[],w:function(){function t(t){return 4294967296*(t-Math.floor(t))|0}var e,i=0,n=2;t:for(;i<64;n++){for(e=2;e*e<=n;e++)if(n%e==0)continue t;i<8&&(this.N[i]=t(Math.pow(n,.5))),this.a[i]=t(Math.pow(n,1/3)),i++}},C:function(t){var e,i,n=t.slice(0),r=this.n,o=this.a,s=r[0],a=r[1],c=r[2],h=r[3],f=r[4],u=r[5],d=r[6],l=r[7];for(t=0;t<64;t++)t<16?e=n[t]:(e=n[t+1&15],i=n[t+14&15],e=n[15&t]=(e>>>7^e>>>18^e>>>3^e<<25^e<<14)+(i>>>17^i>>>19^i>>>10^i<<15^i<<13)+n[15&t]+n[t+9&15]|0),e=e+l+(f>>>6^f>>>11^f>>>25^f<<26^f<<21^f<<7)+(d^f&(u^d))+o[t],l=d,d=u,u=f,f=h+e|0,h=c,c=a,s=e+((a=s)&c^h&(a^c))+(a>>>2^a>>>13^a>>>22^a<<30^a<<19^a<<10)|0;r[0]=r[0]+s|0,r[1]=r[1]+a|0,r[2]=r[2]+c|0,r[3]=r[3]+h|0,r[4]=r[4]+f|0,r[5]=r[5]+u|0,r[6]=r[6]+d|0,r[7]=r[7]+l|0}},e.mode.ccm={name:"ccm",encrypt:function(t,i,n,r,o){var s,a=i.slice(0),c=e.bitArray,h=c.bitLength(n)/8,f=c.bitLength(a)/8;if(o=o||64,r=r||[],h<7)throw new e.exception.invalid("ccm: iv must be at least 7 bytes");for(s=2;s<4&&f>>>8*s;s++);return s<15-h&&(s=15-h),n=c.clamp(n,8*(15-s)),i=e.mode.ccm.G(t,i,n,r,o,s),a=e.mode.ccm.I(t,a,n,i,o,s),c.concat(a.data,a.tag)},decrypt:function(t,i,n,r,o){o=o||64,r=r||[];var s=e.bitArray,a=s.bitLength(n)/8,c=s.bitLength(i),h=s.clamp(i,c-o),f=s.bitSlice(i,c-o);if(c=(c-o)/8,a<7)throw new e.exception.invalid("ccm: iv must be at least 7 bytes");for(i=2;i<4&&c>>>8*i;i++);if(i<15-a&&(i=15-a),n=s.clamp(n,8*(15-i)),h=e.mode.ccm.I(t,h,n,f,o,i),t=e.mode.ccm.G(t,h.data,n,r,o,i),!s.equal(h.tag,t))throw new e.exception.corrupt("ccm: tag doesn't match");return h.data},G:function(t,i,n,r,o,s){var a=[],c=e.bitArray,h=c.k;if((o/=8)%2||o<4||o>16)throw new e.exception.invalid("ccm: invalid tag length");if(r.length>4294967295||i.length>4294967295)throw new e.exception.bug("ccm: can't deal with 4GiB or more data");if(s=[c.partial(8,(r.length?64:0)|o-2<<2|s-1)],(s=c.concat(s,n))[3]|=c.bitLength(i)/8,s=t.encrypt(s),r.length)for((n=c.bitLength(r)/8)<=65279?a=[c.partial(16,n)]:n<=4294967295&&(a=c.concat([c.partial(16,65534)],[n])),a=c.concat(a,r),r=0;r<a.length;r+=4)s=t.encrypt(h(s,a.slice(r,r+4).concat([0,0,0])));for(r=0;r<i.length;r+=4)s=t.encrypt(h(s,i.slice(r,r+4).concat([0,0,0])));return c.clamp(s,8*o)},I:function(t,i,n,r,o,s){var a,c=e.bitArray;a=c.k;var h=i.length,f=c.bitLength(i);if(n=c.concat([c.partial(8,s-1)],n).concat([0,0,0]).slice(0,4),r=c.bitSlice(a(r,t.encrypt(n)),0,o),!h)return{tag:r,data:[]};for(a=0;a<h;a+=4)n[3]++,o=t.encrypt(n),i[a]^=o[0],i[a+1]^=o[1],i[a+2]^=o[2],i[a+3]^=o[3];return{tag:r,data:c.clamp(i,f)}}},e.mode.ocb2={name:"ocb2",encrypt:function(t,i,n,r,o,s){if(128!==e.bitArray.bitLength(n))throw new e.exception.invalid("ocb iv must be 128 bits");var a,c=e.mode.ocb2.A,h=e.bitArray,f=h.k,u=[0,0,0,0];n=c(t.encrypt(n));var d,l=[];for(r=r||[],o=o||64,a=0;a+4<i.length;a+=4)u=f(u,d=i.slice(a,a+4)),l=l.concat(f(n,t.encrypt(f(n,d)))),n=c(n);return d=i.slice(a),i=h.bitLength(d),a=t.encrypt(f(n,[0,0,0,i])),u=f(u,f((d=h.clamp(f(d.concat([0,0,0]),a),i)).concat([0,0,0]),a)),u=t.encrypt(f(u,f(n,c(n)))),r.length&&(u=f(u,s?r:e.mode.ocb2.pmac(t,r))),l.concat(h.concat(d,h.clamp(u,o)))},decrypt:function(t,i,n,r,o,s){if(128!==e.bitArray.bitLength(n))throw new e.exception.invalid("ocb iv must be 128 bits");o=o||64;var a,c,h=e.mode.ocb2.A,f=e.bitArray,u=f.k,d=[0,0,0,0],l=h(t.encrypt(n)),p=e.bitArray.bitLength(i)-o,m=[];for(r=r||[],n=0;n+4<p/32;n+=4)d=u(d,a=u(l,t.decrypt(u(l,i.slice(n,n+4))))),m=m.concat(a),l=h(l);if(c=p-32*n,d=u(d,a=u(a=t.encrypt(u(l,[0,0,0,c])),f.clamp(i.slice(n),c).concat([0,0,0]))),d=t.encrypt(u(d,u(l,h(l)))),r.length&&(d=u(d,s?r:e.mode.ocb2.pmac(t,r))),!f.equal(f.clamp(d,o),f.bitSlice(i,p)))throw new e.exception.corrupt("ocb: tag doesn't match");return m.concat(f.clamp(a,c))},pmac:function(t,i){var n,r=e.mode.ocb2.A,o=e.bitArray,s=o.k,a=[0,0,0,0],c=t.encrypt([0,0,0,0]);for(c=s(c,r(r(c))),n=0;n+4<i.length;n+=4)c=r(c),a=s(a,t.encrypt(s(c,i.slice(n,n+4))));return i=i.slice(n),o.bitLength(i)<128&&(c=s(c,r(c)),i=o.concat(i,[-2147483648,0,0,0])),a=s(a,i),t.encrypt(s(r(s(c,r(c))),a))},A:function(t){return[t[0]<<1^t[1]>>>31,t[1]<<1^t[2]>>>31,t[2]<<1^t[3]>>>31,t[3]<<1^135*(t[0]>>>31)]}},e.misc.hmac=function(t,i){this.M=i=i||e.hash.sha256;var n=[[],[]],r=i.prototype.blockSize/32;for(this.l=[new i,new i],t.length>r&&(t=i.hash(t)),i=0;i<r;i++)n[0][i]=909522486^t[i],n[1][i]=1549556828^t[i];this.l[0].update(n[0]),this.l[1].update(n[1])},e.misc.hmac.prototype.encrypt=e.misc.hmac.prototype.mac=function(t,e){return t=new this.M(this.l[0]).update(t,e).finalize(),new this.M(this.l[1]).update(t).finalize()},e.misc.pbkdf2=function(t,i,n,r,o){if(n=n||1e3,r<0||n<0)throw e.exception.invalid("invalid params to pbkdf2");"string"==typeof t&&(t=e.codec.utf8String.toBits(t)),t=new(o=o||e.misc.hmac)(t);var s,a,c,h,f=[],u=e.bitArray;for(h=1;32*f.length<(r||1);h++){for(o=s=t.encrypt(u.concat(i,[h])),a=1;a<n;a++)for(s=t.encrypt(s),c=0;c<s.length;c++)o[c]^=s[c];f=f.concat(o)}return r&&(f=u.clamp(f,r)),f},e.random={randomWords:function(t,i){var n,r=[];if(0===(i=this.isReady(i)))throw new e.exception.notReady("generator isn't seeded");for(2&i&&this.U(!(1&i)),i=0;i<t;i+=4)(i+1)%65536==0&&this.L(),n=this.u(),r.push(n[0],n[1],n[2],n[3]);return this.L(),r.slice(0,t)},setDefaultParanoia:function(t){this.t=t},addEntropy:function(i,n,r){r=r||"user";var o,s,a=(new Date).valueOf(),c=this.q[r],h=this.isReady();switch(void 0===(o=this.F[r])&&(o=this.F[r]=this.R++),void 0===c&&(c=this.q[r]=0),this.q[r]=(this.q[r]+1)%this.b.length,void 0===i?"undefined":t(i)){case"number":break;case"object":if(void 0===n)for(r=n=0;r<i.length;r++)for(s=i[r];s>0;)n++,s>>>=1;this.b[c].update([o,this.J++,2,n,a,i.length].concat(i));break;case"string":void 0===n&&(n=i.length),this.b[c].update([o,this.J++,3,n,a,i.length]),this.b[c].update(i);break;default:throw new e.exception.bug("random: addEntropy only supports number, array or string")}this.j[c]+=n,this.f+=n,0===h&&(0!==this.isReady()&&this.K("seeded",Math.max(this.g,this.f)),this.K("progress",this.getProgress()))},isReady:function(t){return t=this.B[void 0!==t?t:this.t],this.g&&this.g>=t?this.j[0]>80&&(new Date).valueOf()>this.O?3:1:this.f>=t?2:0},getProgress:function(t){return t=this.B[t||this.t],this.g>=t?1:this.f>t?1:this.f/t},startCollectors:function(){if(!this.m){if(window.addEventListener)window.addEventListener("load",this.o,!1),window.addEventListener("mousemove",this.p,!1);else{if(!document.attachEvent)throw new e.exception.bug("can't attach event");document.attachEvent("onload",this.o),document.attachEvent("onmousemove",this.p)}this.m=!0}},stopCollectors:function(){this.m&&(window.removeEventListener?(window.removeEventListener("load",this.o,!1),window.removeEventListener("mousemove",this.p,!1)):window.detachEvent&&(window.detachEvent("onload",this.o),window.detachEvent("onmousemove",this.p)),this.m=!1)},addEventListener:function(t,e){this.r[t][this.Q++]=e},removeEventListener:function(t,e){var i;t=this.r[t];var n=[];for(i in t)t.hasOwnProperty(i)&&t[i]===e&&n.push(i);for(e=0;e<n.length;e++)delete t[i=n[e]]},b:[new e.hash.sha256],j:[0],z:0,q:{},J:0,F:{},R:0,g:0,f:0,O:0,a:[0,0,0,0,0,0,0,0],d:[0,0,0,0],s:void 0,t:6,m:!1,r:{progress:{},seeded:{}},Q:0,B:[0,48,64,96,128,192,256,384,512,768,1024],u:function(){for(var t=0;t<4&&(this.d[t]=this.d[t]+1|0,!this.d[t]);t++);return this.s.encrypt(this.d)},L:function(){this.a=this.u().concat(this.u()),this.s=new e.cipher.aes(this.a)},T:function(t){for(this.a=e.hash.sha256.hash(this.a.concat(t)),this.s=new e.cipher.aes(this.a),t=0;t<4&&(this.d[t]=this.d[t]+1|0,!this.d[t]);t++);},U:function(t){var i,n=[],r=0;for(this.O=n[0]=(new Date).valueOf()+3e4,i=0;i<16;i++)n.push(4294967296*Math.random()|0);for(i=0;i<this.b.length&&(n=n.concat(this.b[i].finalize()),r+=this.j[i],this.j[i]=0,t||!(this.z&1<<i));i++);this.z>=1<<this.b.length&&(this.b.push(new e.hash.sha256),this.j.push(0)),this.f-=r,r>this.g&&(this.g=r),this.z++,this.T(n)},p:function(t){e.random.addEntropy([t.x||t.clientX||t.offsetX,t.y||t.clientY||t.offsetY],2,"mouse")},o:function(){e.random.addEntropy(new Date,2,"loadtime")},K:function(t,i){var n;t=e.random.r[t];var r=[];for(n in t)t.hasOwnProperty(n)&&r.push(t[n]);for(n=0;n<r.length;n++)r[n](i)}};try{var i=new Uint32Array(32);crypto.getRandomValues(i),e.random.addEntropy(i,1024,"crypto['getRandomValues']")}catch(t){}e.json={defaults:{v:1,iter:1e3,ks:128,ts:64,mode:"ccm",adata:"",cipher:"aes"},encrypt:function(t,i,n,r){n=n||{},r=r||{};var o,s=e.json,a=s.c({iv:e.random.randomWords(4,0)},s.defaults);if(s.c(a,n),n=a.adata,"string"==typeof a.salt&&(a.salt=e.codec.base64.toBits(a.salt)),"string"==typeof a.iv&&(a.iv=e.codec.base64.toBits(a.iv)),!e.mode[a.mode]||!e.cipher[a.cipher]||"string"==typeof t&&a.iter<=100||64!==a.ts&&96!==a.ts&&128!==a.ts||128!==a.ks&&192!==a.ks&&256!==a.ks||a.iv.length<2||a.iv.length>4)throw new e.exception.invalid("json encrypt: invalid parameters");return"string"==typeof t&&(t=(o=e.misc.cachedPbkdf2(t,a)).key.slice(0,a.ks/32),a.salt=o.salt),"string"==typeof i&&(i=e.codec.utf8String.toBits(i)),"string"==typeof n&&(n=e.codec.utf8String.toBits(n)),o=new e.cipher[a.cipher](t),s.c(r,a),r.key=t,a.ct=e.mode[a.mode].encrypt(o,i,a.iv,n,a.ts),s.encode(a)},decrypt:function(t,i,n,r){n=n||{},r=r||{};var o,s=e.json;if(n=(i=s.c(s.c(s.c({},s.defaults),s.decode(i)),n,!0)).adata,"string"==typeof i.salt&&(i.salt=e.codec.base64.toBits(i.salt)),"string"==typeof i.iv&&(i.iv=e.codec.base64.toBits(i.iv)),!e.mode[i.mode]||!e.cipher[i.cipher]||"string"==typeof t&&i.iter<=100||64!==i.ts&&96!==i.ts&&128!==i.ts||128!==i.ks&&192!==i.ks&&256!==i.ks||!i.iv||i.iv.length<2||i.iv.length>4)throw new e.exception.invalid("json decrypt: invalid parameters");return"string"==typeof t&&(t=(o=e.misc.cachedPbkdf2(t,i)).key.slice(0,i.ks/32),i.salt=o.salt),"string"==typeof n&&(n=e.codec.utf8String.toBits(n)),o=new e.cipher[i.cipher](t),n=e.mode[i.mode].decrypt(o,i.ct,i.iv,n,i.ts),s.c(r,i),r.key=t,e.codec.utf8String.fromBits(n)},encode:function(i){var n,r="{",o="";for(n in i)if(i.hasOwnProperty(n)){if(!n.match(/^[a-z0-9]+$/i))throw new e.exception.invalid("json encode: invalid property name");switch(r+=o+'"'+n+'":',o=",",t(i[n])){case"number":case"boolean":r+=i[n];break;case"string":r+='"'+escape(i[n])+'"';break;case"object":r+='"'+e.codec.base64.fromBits(i[n],1)+'"';break;default:throw new e.exception.bug("json encode: unsupported type")}}return r+"}"},decode:function(t){if(!(t=t.replace(/\s/g,"")).match(/^\{.*\}$/))throw new e.exception.invalid("json decode: this isn't json!");t=t.replace(/^\{|\}$/g,"").split(/,/);var i,n,r={};for(i=0;i<t.length;i++){if(!(n=t[i].match(/^(?:(["']?)([a-z][a-z0-9]*)\1):(?:(\d+)|"([a-z0-9+\/%*_.@=\-]*)")$/i)))throw new e.exception.invalid("json decode: this isn't json!");r[n[2]]=n[3]?parseInt(n[3],10):n[2].match(/^(ct|salt|iv)$/)?e.codec.base64.toBits(n[4]):unescape(n[4])}return r},c:function(t,i,n){if(void 0===t&&(t={}),void 0===i)return t;var r;for(r in i)if(i.hasOwnProperty(r)){if(n&&void 0!==t[r]&&t[r]!==i[r])throw new e.exception.invalid("required parameter overridden");t[r]=i[r]}return t},W:function(t,e){var i,n={};for(i in t)t.hasOwnProperty(i)&&t[i]!==e[i]&&(n[i]=t[i]);return n},V:function(t,e){var i,n={};for(i=0;i<e.length;i++)void 0!==t[e[i]]&&(n[e[i]]=t[e[i]]);return n}},e.encrypt=e.json.encrypt,e.decrypt=e.json.decrypt,e.misc.S={},e.misc.cachedPbkdf2=function(t,i){var n,r=e.misc.S;return n=(i=i||{}).iter||1e3,(n=(r=r[t]=r[t]||{})[n]=r[n]||{firstSalt:i.salt&&i.salt.length?i.salt.slice(0):e.random.randomWords(2,0)})[r=void 0===i.salt?n.firstSalt:i.salt]=n[r]||e.misc.pbkdf2(t,r,i.iter),{key:n[r].slice(0),salt:r.slice(0)}};
},{}],1:[function(require,module,exports) {
var e=require("./sjcl");window.onload=function(){document.getElementById("file").addEventListener("change",n),document.getElementById("encode").addEventListener("click",a),document.getElementById("decode").addEventListener("click",r)};var t=1e3,n=function(e){var t=new FileReader;t.onload=function(e){var t=e.target;document.getElementById("preview").style.display="block",document.getElementById("preview").src=t.result,document.getElementById("message").value="",document.getElementById("password").value="",document.getElementById("password2").value="",document.getElementById("messageDecoded").innerHTML="";var n=new Image;n.onload=function(){var e=document.getElementById("canvas").getContext("2d");e.canvas.width=n.width,e.canvas.height=n.height,e.drawImage(n,0,0),r()},n.src=t.result},t.readAsDataURL(e.target.files[0])},a=function(){var n=document.getElementById("message").value,a=document.getElementById("password").value,r=document.getElementById("output"),d=document.getElementById("canvas"),o=d.getContext("2d");n=a.length>0?e.encrypt(a,n):JSON.stringify({text:n});var c=o.canvas.width*o.canvas.height;if(16*(n.length+1)>4*c*.75)alert("加密后图像过大！");else if(n.length>t)alert("Message is too big.");else{var l=o.getImageData(0,0,o.canvas.width,o.canvas.height);g(l.data,e.hash.sha256.hash(a),n),o.putImageData(l,0,0),r.src=d.toDataURL(),alert("信息加密成功！右键另存为加密后的图像")}},r=function(){var t,n=document.getElementById("password2").value,a=document.getElementById("canvas").getContext("2d"),r=a.getImageData(0,0,a.canvas.width,a.canvas.height),d=i(r.data,e.hash.sha256.hash(n)),o=null;try{o=JSON.parse(d)}catch(e){document.getElementById("choose").style.display="block",document.getElementById("reveal").style.display="none",n.length>0&&alert("密码不正确或没有加密的信息")}if(o){if(document.getElementById("choose").style.display="none",document.getElementById("reveal").style.display="block",o.ct)try{o.text=e.decrypt(n,d)}catch(e){alert("密码不正确或没有加密的信息")}var c={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","\n":"<br/>"};document.getElementById("messageDecoded").innerHTML=(t=o.text,String(t).replace(/[&<>"'\/\n]/g,function(e){return c[e]}))}},d=function(e,t){return e>>t&1},o=function(e,t,n){return e&~(1<<t)|n<<t},c=function(e){for(var t=[],n=0;n<16;n++)t.push(d(e,n));return t},l=function(e,t,n){for(var a=0,r=0;r<16;){var c=u(t,n,e.length),l=d(e[c],0);a=o(a,r,l),r++}return a},s=function(e){for(var t=[],n=0;n<e.length;n++){var a=e.charCodeAt(n);t=t.concat(c(a))}return t},u=function(e,t,n){for(var a=e.length,r=Math.abs(t[a%t.length]*(a+1))%n;;)if(r>=n)r=0;else if(e.indexOf(r)>=0)r++;else{if((r+1)%4!=0)return e.push(r),r;r++}},g=function(e,t,n){var a=c(n.length);a=a.concat(s(n));for(var r=[],d=0;d<a.length;){var l=u(r,t,e.length);for(e[l]=o(e[l],0,a[d]);(l+1)%4!=0;)l++;e[l]=255,d++}},i=function(e,n){var a=[],r=l(e,a,n);if(16*(r+1)>.75*e.length)return"";if(0===r||r>t)return"";for(var d=[],o=0;o<r;o++){var c=l(e,a,n);d.push(String.fromCharCode(c))}return d.join("")};
},{"./sjcl":3}]},{},[1])
//# sourceMappingURL=/Steganography.2f5cc112.map