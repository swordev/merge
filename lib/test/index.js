"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var index_1 = require("../src/index");
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
        chai_1.assert.equal({}['a'], undefined);
        chai_1.assert.deepEqual(index_1.default.recursive({ deep: {} }, JSON.parse('{ "deep": { "__proto__": {"b": true} }}')), { deep: {} });
        chai_1.assert.equal({}['b'], undefined);
    });
});
