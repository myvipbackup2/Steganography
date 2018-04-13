// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({20:[function(require,module,exports) {
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var sjcl = { cipher: {}, hash: {}, keyexchange: {}, mode: {}, misc: {}, codec: {}, exception: { corrupt: function corrupt(a) {
            this.toString = function () {
                return "CORRUPT: " + this.message;
            };this.message = a;
        }, invalid: function invalid(a) {
            this.toString = function () {
                return "INVALID: " + this.message;
            };this.message = a;
        }, bug: function bug(a) {
            this.toString = function () {
                return "BUG: " + this.message;
            };this.message = a;
        }, notReady: function notReady(a) {
            this.toString = function () {
                return "NOT READY: " + this.message;
            };this.message = a;
        } } };
if (typeof module != "undefined" && module.exports) module.exports = sjcl;
sjcl.cipher.aes = function (a) {
    this.h[0][0][0] || this.w();var b,
        c,
        d,
        e,
        f = this.h[0][4],
        g = this.h[1];b = a.length;var h = 1;if (b !== 4 && b !== 6 && b !== 8) throw new sjcl.exception.invalid("invalid aes key size");this.a = [d = a.slice(0), e = []];for (a = b; a < 4 * b + 28; a++) {
        c = d[a - 1];if (a % b === 0 || b === 8 && a % b === 4) {
            c = f[c >>> 24] << 24 ^ f[c >> 16 & 255] << 16 ^ f[c >> 8 & 255] << 8 ^ f[c & 255];if (a % b === 0) {
                c = c << 8 ^ c >>> 24 ^ h << 24;h = h << 1 ^ (h >> 7) * 283;
            }
        }d[a] = d[a - b] ^ c;
    }for (b = 0; a; b++, a--) {
        c = d[b & 3 ? a : a - 4];e[b] = a <= 4 || b < 4 ? c : g[0][f[c >>> 24]] ^ g[1][f[c >> 16 & 255]] ^ g[2][f[c >> 8 & 255]] ^ g[3][f[c & 255]];
    }
};
sjcl.cipher.aes.prototype = { encrypt: function encrypt(a) {
        return this.H(a, 0);
    }, decrypt: function decrypt(a) {
        return this.H(a, 1);
    }, h: [[[], [], [], [], []], [[], [], [], [], []]], w: function w() {
        var a = this.h[0],
            b = this.h[1],
            c = a[4],
            d = b[4],
            e,
            f,
            g,
            h = [],
            i = [],
            k,
            j,
            l,
            m;for (e = 0; e < 0x100; e++) {
            i[(h[e] = e << 1 ^ (e >> 7) * 283) ^ e] = e;
        }for (f = g = 0; !c[f]; f ^= k || 1, g = i[g] || 1) {
            l = g ^ g << 1 ^ g << 2 ^ g << 3 ^ g << 4;l = l >> 8 ^ l & 255 ^ 99;c[f] = l;d[l] = f;j = h[e = h[k = h[f]]];m = j * 0x1010101 ^ e * 0x10001 ^ k * 0x101 ^ f * 0x1010100;j = h[l] * 0x101 ^ l * 0x1010100;for (e = 0; e < 4; e++) {
                a[e][f] = j = j << 24 ^ j >>> 8;b[e][l] = m = m << 24 ^ m >>> 8;
            }
        }for (e = 0; e < 5; e++) {
            a[e] = a[e].slice(0);b[e] = b[e].slice(0);
        }
    }, H: function H(a, b) {
        if (a.length !== 4) throw new sjcl.exception.invalid("invalid aes block size");var c = this.a[b],
            d = a[0] ^ c[0],
            e = a[b ? 3 : 1] ^ c[1],
            f = a[2] ^ c[2];a = a[b ? 1 : 3] ^ c[3];var g,
            h,
            i,
            k = c.length / 4 - 2,
            j,
            l = 4,
            m = [0, 0, 0, 0];g = this.h[b];var n = g[0],
            o = g[1],
            p = g[2],
            q = g[3],
            r = g[4];for (j = 0; j < k; j++) {
            g = n[d >>> 24] ^ o[e >> 16 & 255] ^ p[f >> 8 & 255] ^ q[a & 255] ^ c[l];h = n[e >>> 24] ^ o[f >> 16 & 255] ^ p[a >> 8 & 255] ^ q[d & 255] ^ c[l + 1];i = n[f >>> 24] ^ o[a >> 16 & 255] ^ p[d >> 8 & 255] ^ q[e & 255] ^ c[l + 2];a = n[a >>> 24] ^ o[d >> 16 & 255] ^ p[e >> 8 & 255] ^ q[f & 255] ^ c[l + 3];l += 4;d = g;e = h;f = i;
        }for (j = 0; j < 4; j++) {
            m[b ? 3 & -j : j] = r[d >>> 24] << 24 ^ r[e >> 16 & 255] << 16 ^ r[f >> 8 & 255] << 8 ^ r[a & 255] ^ c[l++];g = d;d = e;e = f;f = a;a = g;
        }return m;
    } };
sjcl.bitArray = { bitSlice: function bitSlice(a, b, c) {
        a = sjcl.bitArray.P(a.slice(b / 32), 32 - (b & 31)).slice(1);return c === undefined ? a : sjcl.bitArray.clamp(a, c - b);
    }, extract: function extract(a, b, c) {
        var d = Math.floor(-b - c & 31);return ((b + c - 1 ^ b) & -32 ? a[b / 32 | 0] << 32 - d ^ a[b / 32 + 1 | 0] >>> d : a[b / 32 | 0] >>> d) & (1 << c) - 1;
    }, concat: function concat(a, b) {
        if (a.length === 0 || b.length === 0) return a.concat(b);var c = a[a.length - 1],
            d = sjcl.bitArray.getPartial(c);return d === 32 ? a.concat(b) : sjcl.bitArray.P(b, d, c | 0, a.slice(0, a.length - 1));
    }, bitLength: function bitLength(a) {
        var b = a.length;
        if (b === 0) return 0;return (b - 1) * 32 + sjcl.bitArray.getPartial(a[b - 1]);
    }, clamp: function clamp(a, b) {
        if (a.length * 32 < b) return a;a = a.slice(0, Math.ceil(b / 32));var c = a.length;b &= 31;if (c > 0 && b) a[c - 1] = sjcl.bitArray.partial(b, a[c - 1] & 2147483648 >> b - 1, 1);return a;
    }, partial: function partial(a, b, c) {
        if (a === 32) return b;return (c ? b | 0 : b << 32 - a) + a * 0x10000000000;
    }, getPartial: function getPartial(a) {
        return Math.round(a / 0x10000000000) || 32;
    }, equal: function equal(a, b) {
        if (sjcl.bitArray.bitLength(a) !== sjcl.bitArray.bitLength(b)) return false;var c = 0,
            d;for (d = 0; d < a.length; d++) {
            c |= a[d] ^ b[d];
        }return c === 0;
    }, P: function P(a, b, c, d) {
        var e;e = 0;if (d === undefined) d = [];for (; b >= 32; b -= 32) {
            d.push(c);c = 0;
        }if (b === 0) return d.concat(a);for (e = 0; e < a.length; e++) {
            d.push(c | a[e] >>> b);c = a[e] << 32 - b;
        }e = a.length ? a[a.length - 1] : 0;a = sjcl.bitArray.getPartial(e);d.push(sjcl.bitArray.partial(b + a & 31, b + a > 32 ? c : d.pop(), 1));return d;
    }, k: function k(a, b) {
        return [a[0] ^ b[0], a[1] ^ b[1], a[2] ^ b[2], a[3] ^ b[3]];
    } };
sjcl.codec.utf8String = { fromBits: function fromBits(a) {
        var b = "",
            c = sjcl.bitArray.bitLength(a),
            d,
            e;for (d = 0; d < c / 8; d++) {
            if ((d & 3) === 0) e = a[d / 4];b += String.fromCharCode(e >>> 24);e <<= 8;
        }return decodeURIComponent(escape(b));
    }, toBits: function toBits(a) {
        a = unescape(encodeURIComponent(a));var b = [],
            c,
            d = 0;for (c = 0; c < a.length; c++) {
            d = d << 8 | a.charCodeAt(c);if ((c & 3) === 3) {
                b.push(d);d = 0;
            }
        }c & 3 && b.push(sjcl.bitArray.partial(8 * (c & 3), d));return b;
    } };
sjcl.codec.hex = { fromBits: function fromBits(a) {
        var b = "",
            c;for (c = 0; c < a.length; c++) {
            b += ((a[c] | 0) + 0xf00000000000).toString(16).substr(4);
        }return b.substr(0, sjcl.bitArray.bitLength(a) / 4);
    }, toBits: function toBits(a) {
        var b,
            c = [],
            d;a = a.replace(/\s|0x/g, "");d = a.length;a += "00000000";for (b = 0; b < a.length; b += 8) {
            c.push(parseInt(a.substr(b, 8), 16) ^ 0);
        }return sjcl.bitArray.clamp(c, d * 4);
    } };
sjcl.codec.base64 = { D: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", fromBits: function fromBits(a, b, c) {
        var d = "",
            e = 0,
            f = sjcl.codec.base64.D,
            g = 0,
            h = sjcl.bitArray.bitLength(a);if (c) f = f.substr(0, 62) + "-_";for (c = 0; d.length * 6 < h;) {
            d += f.charAt((g ^ a[c] >>> e) >>> 26);if (e < 6) {
                g = a[c] << 6 - e;e += 26;c++;
            } else {
                g <<= 6;e -= 6;
            }
        }for (; d.length & 3 && !b;) {
            d += "=";
        }return d;
    }, toBits: function toBits(a, b) {
        a = a.replace(/\s|=/g, "");var c = [],
            d = 0,
            e = sjcl.codec.base64.D,
            f = 0,
            g;if (b) e = e.substr(0, 62) + "-_";for (b = 0; b < a.length; b++) {
            g = e.indexOf(a.charAt(b));
            if (g < 0) throw new sjcl.exception.invalid("this isn't base64!");if (d > 26) {
                d -= 26;c.push(f ^ g >>> d);f = g << 32 - d;
            } else {
                d += 6;f ^= g << 32 - d;
            }
        }d & 56 && c.push(sjcl.bitArray.partial(d & 56, f, 1));return c;
    } };sjcl.codec.base64url = { fromBits: function fromBits(a) {
        return sjcl.codec.base64.fromBits(a, 1, 1);
    }, toBits: function toBits(a) {
        return sjcl.codec.base64.toBits(a, 1);
    } };sjcl.hash.sha256 = function (a) {
    this.a[0] || this.w();if (a) {
        this.n = a.n.slice(0);this.i = a.i.slice(0);this.e = a.e;
    } else this.reset();
};sjcl.hash.sha256.hash = function (a) {
    return new sjcl.hash.sha256().update(a).finalize();
};
sjcl.hash.sha256.prototype = { blockSize: 512, reset: function reset() {
        this.n = this.N.slice(0);this.i = [];this.e = 0;return this;
    }, update: function update(a) {
        if (typeof a === "string") a = sjcl.codec.utf8String.toBits(a);var b,
            c = this.i = sjcl.bitArray.concat(this.i, a);b = this.e;a = this.e = b + sjcl.bitArray.bitLength(a);for (b = 512 + b & -512; b <= a; b += 512) {
            this.C(c.splice(0, 16));
        }return this;
    }, finalize: function finalize() {
        var a,
            b = this.i,
            c = this.n;b = sjcl.bitArray.concat(b, [sjcl.bitArray.partial(1, 1)]);for (a = b.length + 2; a & 15; a++) {
            b.push(0);
        }b.push(Math.floor(this.e / 4294967296));for (b.push(this.e | 0); b.length;) {
            this.C(b.splice(0, 16));
        }this.reset();return c;
    }, N: [], a: [], w: function w() {
        function a(e) {
            return (e - Math.floor(e)) * 0x100000000 | 0;
        }var b = 0,
            c = 2,
            d;a: for (; b < 64; c++) {
            for (d = 2; d * d <= c; d++) {
                if (c % d === 0) continue a;
            }if (b < 8) this.N[b] = a(Math.pow(c, 0.5));this.a[b] = a(Math.pow(c, 1 / 3));b++;
        }
    }, C: function C(a) {
        var b,
            c,
            d = a.slice(0),
            e = this.n,
            f = this.a,
            g = e[0],
            h = e[1],
            i = e[2],
            k = e[3],
            j = e[4],
            l = e[5],
            m = e[6],
            n = e[7];for (a = 0; a < 64; a++) {
            if (a < 16) b = d[a];else {
                b = d[a + 1 & 15];c = d[a + 14 & 15];b = d[a & 15] = (b >>> 7 ^ b >>> 18 ^ b >>> 3 ^ b << 25 ^ b << 14) + (c >>> 17 ^ c >>> 19 ^ c >>> 10 ^ c << 15 ^ c << 13) + d[a & 15] + d[a + 9 & 15] | 0;
            }b = b + n + (j >>> 6 ^ j >>> 11 ^ j >>> 25 ^ j << 26 ^ j << 21 ^ j << 7) + (m ^ j & (l ^ m)) + f[a];n = m;m = l;l = j;j = k + b | 0;k = i;i = h;h = g;g = b + (h & i ^ k & (h ^ i)) + (h >>> 2 ^ h >>> 13 ^ h >>> 22 ^ h << 30 ^ h << 19 ^ h << 10) | 0;
        }e[0] = e[0] + g | 0;e[1] = e[1] + h | 0;e[2] = e[2] + i | 0;e[3] = e[3] + k | 0;e[4] = e[4] + j | 0;e[5] = e[5] + l | 0;e[6] = e[6] + m | 0;e[7] = e[7] + n | 0;
    } };
sjcl.mode.ccm = { name: "ccm", encrypt: function encrypt(a, b, c, d, e) {
        var f,
            g = b.slice(0),
            h = sjcl.bitArray,
            i = h.bitLength(c) / 8,
            k = h.bitLength(g) / 8;e = e || 64;d = d || [];if (i < 7) throw new sjcl.exception.invalid("ccm: iv must be at least 7 bytes");for (f = 2; f < 4 && k >>> 8 * f; f++) {}if (f < 15 - i) f = 15 - i;c = h.clamp(c, 8 * (15 - f));b = sjcl.mode.ccm.G(a, b, c, d, e, f);g = sjcl.mode.ccm.I(a, g, c, b, e, f);return h.concat(g.data, g.tag);
    }, decrypt: function decrypt(a, b, c, d, e) {
        e = e || 64;d = d || [];var f = sjcl.bitArray,
            g = f.bitLength(c) / 8,
            h = f.bitLength(b),
            i = f.clamp(b, h - e),
            k = f.bitSlice(b, h - e);h = (h - e) / 8;if (g < 7) throw new sjcl.exception.invalid("ccm: iv must be at least 7 bytes");for (b = 2; b < 4 && h >>> 8 * b; b++) {}if (b < 15 - g) b = 15 - g;c = f.clamp(c, 8 * (15 - b));i = sjcl.mode.ccm.I(a, i, c, k, e, b);a = sjcl.mode.ccm.G(a, i.data, c, d, e, b);if (!f.equal(i.tag, a)) throw new sjcl.exception.corrupt("ccm: tag doesn't match");return i.data;
    }, G: function G(a, b, c, d, e, f) {
        var g = [],
            h = sjcl.bitArray,
            i = h.k;e /= 8;if (e % 2 || e < 4 || e > 16) throw new sjcl.exception.invalid("ccm: invalid tag length");if (d.length > 0xffffffff || b.length > 0xffffffff) throw new sjcl.exception.bug("ccm: can't deal with 4GiB or more data");
        f = [h.partial(8, (d.length ? 64 : 0) | e - 2 << 2 | f - 1)];f = h.concat(f, c);f[3] |= h.bitLength(b) / 8;f = a.encrypt(f);if (d.length) {
            c = h.bitLength(d) / 8;if (c <= 65279) g = [h.partial(16, c)];else if (c <= 0xffffffff) g = h.concat([h.partial(16, 65534)], [c]);g = h.concat(g, d);for (d = 0; d < g.length; d += 4) {
                f = a.encrypt(i(f, g.slice(d, d + 4).concat([0, 0, 0])));
            }
        }for (d = 0; d < b.length; d += 4) {
            f = a.encrypt(i(f, b.slice(d, d + 4).concat([0, 0, 0])));
        }return h.clamp(f, e * 8);
    }, I: function I(a, b, c, d, e, f) {
        var g,
            h = sjcl.bitArray;g = h.k;var i = b.length,
            k = h.bitLength(b);c = h.concat([h.partial(8, f - 1)], c).concat([0, 0, 0]).slice(0, 4);d = h.bitSlice(g(d, a.encrypt(c)), 0, e);if (!i) return { tag: d, data: [] };for (g = 0; g < i; g += 4) {
            c[3]++;e = a.encrypt(c);b[g] ^= e[0];b[g + 1] ^= e[1];b[g + 2] ^= e[2];b[g + 3] ^= e[3];
        }return { tag: d, data: h.clamp(b, k) };
    } };
sjcl.mode.ocb2 = { name: "ocb2", encrypt: function encrypt(a, b, c, d, e, f) {
        if (sjcl.bitArray.bitLength(c) !== 128) throw new sjcl.exception.invalid("ocb iv must be 128 bits");var g,
            h = sjcl.mode.ocb2.A,
            i = sjcl.bitArray,
            k = i.k,
            j = [0, 0, 0, 0];c = h(a.encrypt(c));var l,
            m = [];d = d || [];e = e || 64;for (g = 0; g + 4 < b.length; g += 4) {
            l = b.slice(g, g + 4);j = k(j, l);m = m.concat(k(c, a.encrypt(k(c, l))));c = h(c);
        }l = b.slice(g);b = i.bitLength(l);g = a.encrypt(k(c, [0, 0, 0, b]));l = i.clamp(k(l.concat([0, 0, 0]), g), b);j = k(j, k(l.concat([0, 0, 0]), g));j = a.encrypt(k(j, k(c, h(c))));
        if (d.length) j = k(j, f ? d : sjcl.mode.ocb2.pmac(a, d));return m.concat(i.concat(l, i.clamp(j, e)));
    }, decrypt: function decrypt(a, b, c, d, e, f) {
        if (sjcl.bitArray.bitLength(c) !== 128) throw new sjcl.exception.invalid("ocb iv must be 128 bits");e = e || 64;var g = sjcl.mode.ocb2.A,
            h = sjcl.bitArray,
            i = h.k,
            k = [0, 0, 0, 0],
            j = g(a.encrypt(c)),
            l,
            m,
            n = sjcl.bitArray.bitLength(b) - e,
            o = [];d = d || [];for (c = 0; c + 4 < n / 32; c += 4) {
            l = i(j, a.decrypt(i(j, b.slice(c, c + 4))));k = i(k, l);o = o.concat(l);j = g(j);
        }m = n - c * 32;l = a.encrypt(i(j, [0, 0, 0, m]));l = i(l, h.clamp(b.slice(c), m).concat([0, 0, 0]));k = i(k, l);k = a.encrypt(i(k, i(j, g(j))));if (d.length) k = i(k, f ? d : sjcl.mode.ocb2.pmac(a, d));if (!h.equal(h.clamp(k, e), h.bitSlice(b, n))) throw new sjcl.exception.corrupt("ocb: tag doesn't match");return o.concat(h.clamp(l, m));
    }, pmac: function pmac(a, b) {
        var c,
            d = sjcl.mode.ocb2.A,
            e = sjcl.bitArray,
            f = e.k,
            g = [0, 0, 0, 0],
            h = a.encrypt([0, 0, 0, 0]);h = f(h, d(d(h)));for (c = 0; c + 4 < b.length; c += 4) {
            h = d(h);g = f(g, a.encrypt(f(h, b.slice(c, c + 4))));
        }b = b.slice(c);if (e.bitLength(b) < 128) {
            h = f(h, d(h));b = e.concat(b, [2147483648 | 0, 0, 0, 0]);
        }g = f(g, b);return a.encrypt(f(d(f(h, d(h))), g));
    }, A: function A(a) {
        return [a[0] << 1 ^ a[1] >>> 31, a[1] << 1 ^ a[2] >>> 31, a[2] << 1 ^ a[3] >>> 31, a[3] << 1 ^ (a[0] >>> 31) * 135];
    } };sjcl.misc.hmac = function (a, b) {
    this.M = b = b || sjcl.hash.sha256;var c = [[], []],
        d = b.prototype.blockSize / 32;this.l = [new b(), new b()];if (a.length > d) a = b.hash(a);for (b = 0; b < d; b++) {
        c[0][b] = a[b] ^ 909522486;c[1][b] = a[b] ^ 1549556828;
    }this.l[0].update(c[0]);this.l[1].update(c[1]);
};
sjcl.misc.hmac.prototype.encrypt = sjcl.misc.hmac.prototype.mac = function (a, b) {
    a = new this.M(this.l[0]).update(a, b).finalize();return new this.M(this.l[1]).update(a).finalize();
};
sjcl.misc.pbkdf2 = function (a, b, c, d, e) {
    c = c || 1E3;if (d < 0 || c < 0) throw sjcl.exception.invalid("invalid params to pbkdf2");if (typeof a === "string") a = sjcl.codec.utf8String.toBits(a);e = e || sjcl.misc.hmac;a = new e(a);var f,
        g,
        h,
        i,
        k = [],
        j = sjcl.bitArray;for (i = 1; 32 * k.length < (d || 1); i++) {
        e = f = a.encrypt(j.concat(b, [i]));for (g = 1; g < c; g++) {
            f = a.encrypt(f);for (h = 0; h < f.length; h++) {
                e[h] ^= f[h];
            }
        }k = k.concat(e);
    }if (d) k = j.clamp(k, d);return k;
};
sjcl.random = { randomWords: function randomWords(a, b) {
        var c = [];b = this.isReady(b);var d;if (b === 0) throw new sjcl.exception.notReady("generator isn't seeded");else b & 2 && this.U(!(b & 1));for (b = 0; b < a; b += 4) {
            (b + 1) % 0x10000 === 0 && this.L();d = this.u();c.push(d[0], d[1], d[2], d[3]);
        }this.L();return c.slice(0, a);
    }, setDefaultParanoia: function setDefaultParanoia(a) {
        this.t = a;
    }, addEntropy: function addEntropy(a, b, c) {
        c = c || "user";var d,
            e,
            f = new Date().valueOf(),
            g = this.q[c],
            h = this.isReady();d = this.F[c];if (d === undefined) d = this.F[c] = this.R++;if (g === undefined) g = this.q[c] = 0;this.q[c] = (this.q[c] + 1) % this.b.length;switch (typeof a === "undefined" ? "undefined" : _typeof(a)) {case "number":
                break;case "object":
                if (b === undefined) for (c = b = 0; c < a.length; c++) {
                    for (e = a[c]; e > 0;) {
                        b++;e >>>= 1;
                    }
                }this.b[g].update([d, this.J++, 2, b, f, a.length].concat(a));break;case "string":
                if (b === undefined) b = a.length;this.b[g].update([d, this.J++, 3, b, f, a.length]);this.b[g].update(a);break;default:
                throw new sjcl.exception.bug("random: addEntropy only supports number, array or string");}this.j[g] += b;this.f += b;if (h === 0) {
            this.isReady() !== 0 && this.K("seeded", Math.max(this.g, this.f));this.K("progress", this.getProgress());
        }
    }, isReady: function isReady(a) {
        a = this.B[a !== undefined ? a : this.t];return this.g && this.g >= a ? this.j[0] > 80 && new Date().valueOf() > this.O ? 3 : 1 : this.f >= a ? 2 : 0;
    }, getProgress: function getProgress(a) {
        a = this.B[a ? a : this.t];return this.g >= a ? 1 : this.f > a ? 1 : this.f / a;
    }, startCollectors: function startCollectors() {
        if (!this.m) {
            if (window.addEventListener) {
                window.addEventListener("load", this.o, false);window.addEventListener("mousemove", this.p, false);
            } else if (document.attachEvent) {
                document.attachEvent("onload", this.o);
                document.attachEvent("onmousemove", this.p);
            } else throw new sjcl.exception.bug("can't attach event");this.m = true;
        }
    }, stopCollectors: function stopCollectors() {
        if (this.m) {
            if (window.removeEventListener) {
                window.removeEventListener("load", this.o, false);window.removeEventListener("mousemove", this.p, false);
            } else if (window.detachEvent) {
                window.detachEvent("onload", this.o);window.detachEvent("onmousemove", this.p);
            }this.m = false;
        }
    }, addEventListener: function addEventListener(a, b) {
        this.r[a][this.Q++] = b;
    }, removeEventListener: function removeEventListener(a, b) {
        var c;a = this.r[a];
        var d = [];for (c in a) {
            a.hasOwnProperty(c) && a[c] === b && d.push(c);
        }for (b = 0; b < d.length; b++) {
            c = d[b];delete a[c];
        }
    }, b: [new sjcl.hash.sha256()], j: [0], z: 0, q: {}, J: 0, F: {}, R: 0, g: 0, f: 0, O: 0, a: [0, 0, 0, 0, 0, 0, 0, 0], d: [0, 0, 0, 0], s: undefined, t: 6, m: false, r: { progress: {}, seeded: {} }, Q: 0, B: [0, 48, 64, 96, 128, 192, 0x100, 384, 512, 768, 1024], u: function u() {
        for (var a = 0; a < 4; a++) {
            this.d[a] = this.d[a] + 1 | 0;if (this.d[a]) break;
        }return this.s.encrypt(this.d);
    }, L: function L() {
        this.a = this.u().concat(this.u());this.s = new sjcl.cipher.aes(this.a);
    }, T: function T(a) {
        this.a = sjcl.hash.sha256.hash(this.a.concat(a));this.s = new sjcl.cipher.aes(this.a);for (a = 0; a < 4; a++) {
            this.d[a] = this.d[a] + 1 | 0;if (this.d[a]) break;
        }
    }, U: function U(a) {
        var b = [],
            c = 0,
            d;this.O = b[0] = new Date().valueOf() + 3E4;for (d = 0; d < 16; d++) {
            b.push(Math.random() * 0x100000000 | 0);
        }for (d = 0; d < this.b.length; d++) {
            b = b.concat(this.b[d].finalize());c += this.j[d];this.j[d] = 0;if (!a && this.z & 1 << d) break;
        }if (this.z >= 1 << this.b.length) {
            this.b.push(new sjcl.hash.sha256());this.j.push(0);
        }this.f -= c;if (c > this.g) this.g = c;this.z++;this.T(b);
    }, p: function p(a) {
        sjcl.random.addEntropy([a.x || a.clientX || a.offsetX, a.y || a.clientY || a.offsetY], 2, "mouse");
    }, o: function o() {
        sjcl.random.addEntropy(new Date(), 2, "loadtime");
    }, K: function K(a, b) {
        var c;a = sjcl.random.r[a];var d = [];for (c in a) {
            a.hasOwnProperty(c) && d.push(a[c]);
        }for (c = 0; c < d.length; c++) {
            d[c](b);
        }
    } };try {
    var s = new Uint32Array(32);crypto.getRandomValues(s);sjcl.random.addEntropy(s, 1024, "crypto['getRandomValues']");
} catch (t) {}
sjcl.json = { defaults: { v: 1, iter: 1E3, ks: 128, ts: 64, mode: "ccm", adata: "", cipher: "aes" }, encrypt: function encrypt(a, b, c, d) {
        c = c || {};d = d || {};var e = sjcl.json,
            f = e.c({ iv: sjcl.random.randomWords(4, 0) }, e.defaults),
            g;e.c(f, c);c = f.adata;if (typeof f.salt === "string") f.salt = sjcl.codec.base64.toBits(f.salt);if (typeof f.iv === "string") f.iv = sjcl.codec.base64.toBits(f.iv);if (!sjcl.mode[f.mode] || !sjcl.cipher[f.cipher] || typeof a === "string" && f.iter <= 100 || f.ts !== 64 && f.ts !== 96 && f.ts !== 128 || f.ks !== 128 && f.ks !== 192 && f.ks !== 0x100 || f.iv.length < 2 || f.iv.length > 4) throw new sjcl.exception.invalid("json encrypt: invalid parameters");if (typeof a === "string") {
            g = sjcl.misc.cachedPbkdf2(a, f);a = g.key.slice(0, f.ks / 32);f.salt = g.salt;
        }if (typeof b === "string") b = sjcl.codec.utf8String.toBits(b);if (typeof c === "string") c = sjcl.codec.utf8String.toBits(c);g = new sjcl.cipher[f.cipher](a);e.c(d, f);d.key = a;f.ct = sjcl.mode[f.mode].encrypt(g, b, f.iv, c, f.ts);return e.encode(f);
    }, decrypt: function decrypt(a, b, c, d) {
        c = c || {};d = d || {};var e = sjcl.json;b = e.c(e.c(e.c({}, e.defaults), e.decode(b)), c, true);var f;c = b.adata;if (typeof b.salt === "string") b.salt = sjcl.codec.base64.toBits(b.salt);if (typeof b.iv === "string") b.iv = sjcl.codec.base64.toBits(b.iv);if (!sjcl.mode[b.mode] || !sjcl.cipher[b.cipher] || typeof a === "string" && b.iter <= 100 || b.ts !== 64 && b.ts !== 96 && b.ts !== 128 || b.ks !== 128 && b.ks !== 192 && b.ks !== 0x100 || !b.iv || b.iv.length < 2 || b.iv.length > 4) throw new sjcl.exception.invalid("json decrypt: invalid parameters");if (typeof a === "string") {
            f = sjcl.misc.cachedPbkdf2(a, b);a = f.key.slice(0, b.ks / 32);b.salt = f.salt;
        }if (typeof c === "string") c = sjcl.codec.utf8String.toBits(c);f = new sjcl.cipher[b.cipher](a);c = sjcl.mode[b.mode].decrypt(f, b.ct, b.iv, c, b.ts);e.c(d, b);d.key = a;return sjcl.codec.utf8String.fromBits(c);
    }, encode: function encode(a) {
        var b,
            c = "{",
            d = "";for (b in a) {
            if (a.hasOwnProperty(b)) {
                if (!b.match(/^[a-z0-9]+$/i)) throw new sjcl.exception.invalid("json encode: invalid property name");c += d + '"' + b + '":';d = ",";switch (_typeof(a[b])) {case "number":case "boolean":
                        c += a[b];break;case "string":
                        c += '"' + escape(a[b]) + '"';break;case "object":
                        c += '"' + sjcl.codec.base64.fromBits(a[b], 1) + '"';break;default:
                        throw new sjcl.exception.bug("json encode: unsupported type");}
            }
        }return c + "}";
    }, decode: function decode(a) {
        a = a.replace(/\s/g, "");if (!a.match(/^\{.*\}$/)) throw new sjcl.exception.invalid("json decode: this isn't json!");a = a.replace(/^\{|\}$/g, "").split(/,/);var b = {},
            c,
            d;for (c = 0; c < a.length; c++) {
            if (!(d = a[c].match(/^(?:(["']?)([a-z][a-z0-9]*)\1):(?:(\d+)|"([a-z0-9+\/%*_.@=\-]*)")$/i))) throw new sjcl.exception.invalid("json decode: this isn't json!");b[d[2]] = d[3] ? parseInt(d[3], 10) : d[2].match(/^(ct|salt|iv)$/) ? sjcl.codec.base64.toBits(d[4]) : unescape(d[4]);
        }return b;
    }, c: function c(a, b, _c) {
        if (a === undefined) a = {};if (b === undefined) return a;var d;for (d in b) {
            if (b.hasOwnProperty(d)) {
                if (_c && a[d] !== undefined && a[d] !== b[d]) throw new sjcl.exception.invalid("required parameter overridden");a[d] = b[d];
            }
        }return a;
    }, W: function W(a, b) {
        var c = {},
            d;for (d in a) {
            if (a.hasOwnProperty(d) && a[d] !== b[d]) c[d] = a[d];
        }return c;
    }, V: function V(a, b) {
        var c = {},
            d;for (d = 0; d < b.length; d++) {
            if (a[b[d]] !== undefined) c[b[d]] = a[b[d]];
        }return c;
    } };sjcl.encrypt = sjcl.json.encrypt;sjcl.decrypt = sjcl.json.decrypt;sjcl.misc.S = {};sjcl.misc.cachedPbkdf2 = function (a, b) {
    var c = sjcl.misc.S,
        d;b = b || {};d = b.iter || 1E3;c = c[a] = c[a] || {};d = c[d] = c[d] || { firstSalt: b.salt && b.salt.length ? b.salt.slice(0) : sjcl.random.randomWords(2, 0) };c = b.salt === undefined ? d.firstSalt : b.salt;d[c] = d[c] || sjcl.misc.pbkdf2(a, c, b.iter);return { key: d[c].slice(0), salt: c.slice(0) };
};
},{}],4:[function(require,module,exports) {
// 引入sjcl加密库
var sjcl = require('./sjcl');

// 初始化
window.onload = function () {
  // 注册图片输入事件
  var input = document.getElementById('file');
  input.addEventListener('change', importImage);

  // 注册加密事件
  var encodeButton = document.getElementById('encode');
  encodeButton.addEventListener('click', encode);

  // 注册解密事件
  var decodeButton = document.getElementById('decode');
  decodeButton.addEventListener('click', decode);
};

// 限制文本大小
var maxMessageSize = 1000;

// 把图片放入canvas画布
var importImage = function importImage(e) {

  var reader = new FileReader();

  reader.onload = function (_ref) {
    var target = _ref.target;


    // 图片预览
    document.getElementById('preview').style.display = 'block';
    document.getElementById('preview').src = target.result;

    // 清空所有输入
    document.getElementById('message').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password2').value = '';
    document.getElementById('messageDecoded').innerHTML = '';

    // 把图片信息读取到canvas
    var img = new Image();
    img.onload = function () {
      var ctx = document.getElementById('canvas').getContext('2d');
      ctx.canvas.width = img.width;
      ctx.canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      decode();
    };
    img.src = target.result;
  };

  reader.readAsDataURL(e.target.files[0]);
};

// 编码图像并保存
var encode = function encode() {
  var message = document.getElementById('message').value;
  var password = document.getElementById('password').value;
  var output = document.getElementById('output');
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');

  // 如果有密码则加密信息
  if (password.length > 0) {
    message = sjcl.encrypt(password, message);
  } else {
    message = JSON.stringify({ 'text': message });
  }

  // 如果加密信息后图像过大则终止
  var pixelCount = ctx.canvas.width * ctx.canvas.height;
  if ((message.length + 1) * 16 > pixelCount * 4 * 0.75) {
    alert('加密后图像过大！');
    return;
  }

  // 如果加密信息超过最大限制则终止
  if (message.length > maxMessageSize) {
    alert('Message is too big.');
    return;
  }

  // 用输入的密码加密信息
  var imgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
  encodeMessage(imgData.data, sjcl.hash.sha256.hash(password), message);
  ctx.putImageData(imgData, 0, 0);

  output.src = canvas.toDataURL();

  // 加密成功
  alert('信息加密成功！右键另存为加密后的图像');
};

// 如果有信息的话解密信息并展示
var decode = function decode() {
  var password = document.getElementById('password2').value;
  var passwordFail = '密码不正确或没有加密的信息';

  // 用提供的密码解码消息
  var ctx = document.getElementById('canvas').getContext('2d');
  var imgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
  var message = decodeMessage(imgData.data, sjcl.hash.sha256.hash(password));

  // try to parse the JSON
  var obj = null;
  try {
    obj = JSON.parse(message);
  } catch (e) {

    // display the "choose" view
    document.getElementById('choose').style.display = 'block';
    document.getElementById('reveal').style.display = 'none';

    if (password.length > 0) {
      alert(passwordFail);
    }
  }

  // 显示解密按钮
  if (obj) {
    document.getElementById('choose').style.display = 'none';
    document.getElementById('reveal').style.display = 'block';

    // 必要时解密
    if (obj.ct) {
      try {
        obj.text = sjcl.decrypt(password, message);
      } catch (e) {
        alert(passwordFail);
      }
    }

    // 转义特殊字符
    var escChars = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      '\'': '&#39;',
      '/': '&#x2F;',
      '\n': '<br/>'
    };
    var escHtml = function escHtml(string) {
      return String(string).replace(/[&<>"'\/\n]/g, function (c) {
        return escChars[c];
      });
    };
    document.getElementById('messageDecoded').innerHTML = escHtml(obj.text);
  }
};

// 返回位置中的二进制 0或1
var getBit = function getBit(number, location) {
  return number >> location & 1;
};

// 设置位置中的二进制 0或1
var setBit = function setBit(number, location, bit) {
  return number & ~(1 << location) | bit << location;
};

// 为一个2个字节的数字返回一个1和0的数组
var getBitsFromNumber = function getBitsFromNumber(number) {
  var bits = [];
  for (var i = 0; i < 16; i++) {
    bits.push(getBit(number, i));
  }
  return bits;
};

// 返回下一个2个字节的数字
var getNumberFromBits = function getNumberFromBits(bytes, history, hash) {
  var number = 0,
      pos = 0;
  while (pos < 16) {
    var loc = getNextLocation(history, hash, bytes.length);
    var bit = getBit(bytes[loc], 0);
    number = setBit(number, pos, bit);
    pos++;
  }
  return number;
};

// 为需要加密的信息返回一个1和0的数组
var getMessageBits = function getMessageBits(message) {
  var messageBits = [];
  for (var i = 0; i < message.length; i++) {
    var code = message.charCodeAt(i);
    messageBits = messageBits.concat(getBitsFromNumber(code));
  }
  return messageBits;
};

// 获取下一个位置以存储一个bit
var getNextLocation = function getNextLocation(history, hash, total) {
  var pos = history.length;
  var loc = Math.abs(hash[pos % hash.length] * (pos + 1)) % total;
  while (true) {
    if (loc >= total) {
      loc = 0;
    } else if (history.indexOf(loc) >= 0) {
      loc++;
    } else if ((loc + 1) % 4 === 0) {
      loc++;
    } else {
      history.push(loc);
      return loc;
    }
  }
};

/**
 * 接受要隐藏的数据以及隐藏的颜色通道，然后对原图进行操作，修改图片该通道分量的最低位，如果有文字信息，则最低位置为1，否则为0。
 * 从最文章开头的结论知道，RGB的三个通道可以分别隐藏不同信息。
 */
var encodeMessage = function encodeMessage(colors, hash, message) {
  // 根据信息创建二进制信息
  var messageBits = getBitsFromNumber(message.length);
  messageBits = messageBits.concat(getMessageBits(message));

  // 存储我们已经修改的颜色值
  var history = [];

  // 将这些bit编码成像素
  var pos = 0;
  while (pos < messageBits.length) {
    // set the next color value to the next bit
    var loc = getNextLocation(history, hash, colors.length);
    colors[loc] = setBit(colors[loc], 0, messageBits[pos]);

    // 将此像素中的Alpha值设置为255, 因为浏览器会预乘alpha
    // example: http://stackoverflow.com/q/4309364
    while ((loc + 1) % 4 !== 0) {
      loc++;
    }
    colors[loc] = 255;

    pos++;
  }
};

// 返回在 CanvasPixel Array 'colors' 中编码的消息
var decodeMessage = function decodeMessage(colors, hash) {
  // 存储我们已经读取的颜色值
  var history = [];

  // 获取消息大小
  var messageSize = getNumberFromBits(colors, history, hash);

  if ((messageSize + 1) * 16 > colors.length * 0.75) {
    return '';
  }

  if (messageSize === 0 || messageSize > maxMessageSize) {
    return '';
  }

  // 把每个字符放入一个数组中
  var message = [];
  for (var i = 0; i < messageSize; i++) {
    var code = getNumberFromBits(colors, history, hash);
    message.push(String.fromCharCode(code));
  }

  return message.join('');
};
},{"./sjcl":20}],29:[function(require,module,exports) {

var OVERLAY_ID = '__parcel__error__overlay__';

var global = (1, eval)('this');
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '57592' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},[29,4])
//# sourceMappingURL=/Steganography.a0d194bb.map