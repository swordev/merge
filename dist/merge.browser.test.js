/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = __webpack_require__(1);
var index_1 = __webpack_require__(2);
describe('merge', function () {
    it('basic', function () {
        chai_1.assert.deepEqual(index_1.default({ a: 1 }, { b: 2 }), { a: 1, b: 2 });
        chai_1.assert.deepEqual(index_1.default({ a: 1 }, { b: { c: { d: 2 } } }), { a: 1, b: { c: { d: 2 } } });
    });
    it('clone', function () {
        var input = {
            a: 1,
            b: {
                c: {
                    d: 2,
                    e: ['x', 'y', { z: { w: ['k'] } }]
                }
            },
            f: null,
            g: undefined,
            h: true
        };
        var original = {
            a: 1,
            b: {
                c: {
                    d: 2,
                    e: ['x', 'y', { z: { w: ['k'] } }]
                }
            },
            f: null,
            g: undefined,
            h: true
        };
        var output = index_1.default(true, input);
        input.b.c.d++;
        input.b.c.e[2].z.w = null;
        input.h = null;
        chai_1.assert.deepEqual(original, output);
        input = original;
        output = index_1.default(true, input, { a: 2 });
        chai_1.assert.deepEqual(output.a, 2);
        chai_1.assert.deepEqual(input.a, 1);
    });
    it('invalid input', function () {
        chai_1.assert.deepEqual(index_1.default(), {});
        chai_1.assert.deepEqual(index_1.default(undefined), {});
        chai_1.assert.deepEqual(index_1.default([]), {});
        chai_1.assert.deepEqual(index_1.default(true), {});
        chai_1.assert.deepEqual(index_1.default(null, true, [0, 1, 2], 3, { a: 1 }, function () { }, undefined, { b: 2 }), { a: 1, b: 2 });
    });
    it('prototype pollution attack', function () {
        chai_1.assert.deepEqual(index_1.default({}, JSON.parse('{"__proto__": {"a": true}}')), {});
    });
});
describe('merge.clone', function () {
    it('object', function () {
        var object1 = { a: 1, b: { c: 2 } };
        var object2 = index_1.default.clone(object1);
        chai_1.assert.deepEqual(object1, object2);
        chai_1.assert.deepEqual(object1 === object2, false);
        chai_1.assert.deepEqual(object1.b === object2.b, false);
    });
    it('array', function () {
        var object1 = [{ a: 1, b: { c: 2 } }];
        var object2 = index_1.default.clone(object1);
        chai_1.assert.deepEqual(object1, object2);
        chai_1.assert.deepEqual(object1 === object2, false);
        chai_1.assert.deepEqual(object1[0] === object2[0], false);
        chai_1.assert.deepEqual(object1[0].b === object2[0].b, false);
    });
    it('invalid input', function () {
        chai_1.assert.deepEqual(index_1.default.clone(null), null);
        chai_1.assert.deepEqual(index_1.default.clone(undefined), undefined);
        chai_1.assert.deepEqual(index_1.default.clone(1), 1);
        chai_1.assert.deepEqual(index_1.default.clone('str'), 'str');
    });
});
describe('merge.recursive', function () {
    it('basic', function () {
        chai_1.assert.deepEqual(index_1.default.recursive({ a: { b: 1 } }, { a: { c: 1 } }), { a: { b: 1, c: 1 } });
        chai_1.assert.deepEqual(index_1.default.recursive({ a: { b: 1, c: 1 } }, { a: { b: 2 } }), { a: { b: 2, c: 1 } });
        chai_1.assert.deepEqual(index_1.default.recursive({ a: { b: [1, 2, 3], c: 1 } }, { a: { b: ['a'] } }), { a: { b: ['a'], c: 1 } });
        chai_1.assert.deepEqual(index_1.default.recursive({ a: { b: { b: 2 }, c: 1 } }, { a: { b: 2 } }), { a: { b: 2, c: 1 } });
    });
    it('clone', function () {
        var test1 = { a: { b: 1 } };
        chai_1.assert.deepEqual(index_1.default.recursive(true, test1, { a: { c: 1 } }), { a: { b: 1, c: 1 } });
        chai_1.assert.deepEqual({ a: { b: 1 } }, test1);
        var test2 = { a: { b: 1, c: 1 } };
        chai_1.assert.deepEqual(index_1.default.recursive(true, test2, { a: { b: 2 } }), { a: { b: 2, c: 1 } });
        chai_1.assert.deepEqual({ a: { b: 1, c: 1 } }, test2);
        var test3 = { a: { b: [1, 2, 3], c: 1 } };
        chai_1.assert.deepEqual(index_1.default.recursive(true, test3, { a: { b: ['a'] } }), { a: { b: ['a'], c: 1 } });
        chai_1.assert.deepEqual({ a: { b: [1, 2, 3], c: 1 } }, test3);
        var test4 = { a: { b: { b: 2 }, c: 1 } };
        chai_1.assert.deepEqual(index_1.default.recursive(true, test4, { a: { b: 2 } }), { a: { b: 2, c: 1 } });
        chai_1.assert.deepEqual({ a: { b: { b: 2 }, c: 1 } }, test4);
    });
    it('prototype pollution attack', function () {
        chai_1.assert.deepEqual(index_1.default.recursive({}, JSON.parse('{"__proto__": {"a": true}}')), {});
    });
});


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = chai;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
module.exports = exports = main;
function main() {
    var items = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        items[_i] = arguments[_i];
    }
    return merge.apply(void 0, items);
}
exports.default = main;
main.clone = clone;
main.isPlainObject = isPlainObject;
main.recursive = recursive;
function merge() {
    var items = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        items[_i] = arguments[_i];
    }
    return _merge(items[0] === true, false, items);
}
exports.merge = merge;
function recursive() {
    var items = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        items[_i] = arguments[_i];
    }
    return _merge(items[0] === true, true, items);
}
exports.recursive = recursive;
function clone(input) {
    if (Array.isArray(input)) {
        var output = [];
        for (var index = 0; index < input.length; ++index)
            output.push(clone(input[index]));
        return output;
    }
    else if (isPlainObject(input)) {
        var output = {};
        for (var index in input)
            output[index] = clone(input[index]);
        return output;
    }
    else {
        return input;
    }
}
exports.clone = clone;
function isPlainObject(input) {
    return input && typeof input === 'object' && !Array.isArray(input);
}
exports.isPlainObject = isPlainObject;
function _recursiveMerge(base, extend) {
    if (!isPlainObject(base))
        return extend;
    for (var key in extend)
        base[key] = (isPlainObject(base[key]) && isPlainObject(extend[key])) ?
            _recursiveMerge(base[key], extend[key]) :
            extend[key];
    return base;
}
function _merge(isClone, isRecursive, items) {
    var result;
    if (isClone || !isPlainObject(result = items.shift()))
        result = {};
    for (var index = 0; index < items.length; ++index) {
        var item = items[index];
        if (!isPlainObject(item))
            continue;
        for (var key in item) {
            if (key === '__proto__')
                continue;
            var value = isClone ? clone(item[key]) : item[key];
            result[key] = isRecursive ? _recursiveMerge(result[key], value) : value;
        }
    }
    return result;
}


/***/ })
/******/ ]);