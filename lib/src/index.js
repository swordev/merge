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
