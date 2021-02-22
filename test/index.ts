import { assert } from 'chai';
import merge from '../src/index';

describe('merge', function () {

	it('basic', () => {

		assert.deepEqual(
			merge({ a: 1 }, { b: 2 }),
			{ a: 1, b: 2 }
		)

		assert.deepEqual(
			merge({ a: 1 }, { b: { c: { d: 2 } } }),
			{ a: 1, b: { c: { d: 2 } } }
		)

	})

	it('clone', () => {

		let input = {
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
		}

		let original = {
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
		}

		let output = merge(true, input);

		input.b.c.d++;
		(input.b.c.e[2] as any).z.w = null;
		(input as any).h = null;

		assert.deepEqual(original, output);

		input = original;

		output = merge(true, input, { a: 2 });

		assert.deepEqual(output.a, 2);
		assert.deepEqual(input.a, 1);

	})

	it('invalid input', () => {

		assert.deepEqual(
			merge(), {}
		)

		assert.deepEqual(
			merge(undefined), {}
		)

		assert.deepEqual(
			merge([]), {}
		)

		assert.deepEqual(
			merge(true), {}
		)

		assert.deepEqual(
			merge(null, true, [0, 1, 2], 3, { a: 1 }, function () { }, undefined, { b: 2 }),
			{ a: 1, b: 2 }
		)

	})

	it('prototype pollution attack', () => {

		assert.deepEqual(
			merge({}, JSON.parse('{"__proto__": {"a": true}}')),
			{}
		)

	})

})

describe('merge.clone', function () {

	it('object', () => {

		const object1 = { a: 1, b: { c: 2 } }
		const object2 = merge.clone(object1)

		assert.deepEqual(object1, object2)
		assert.deepEqual(object1 === object2, false)
		assert.deepEqual(object1.b === object2.b, false)

	})

	it('array', () => {

		const object1 = [{ a: 1, b: { c: 2 } }]
		const object2 = merge.clone(object1)

		assert.deepEqual(object1, object2)
		assert.deepEqual(object1 === object2, false)
		assert.deepEqual(object1[0] === object2[0], false)
		assert.deepEqual(object1[0].b === object2[0].b, false)

	})

	it('invalid input', () => {

		assert.deepEqual(merge.clone(null), null)
		assert.deepEqual(merge.clone(undefined), undefined)
		assert.deepEqual(merge.clone(1), 1)
		assert.deepEqual(merge.clone('str'), 'str')

	})

})

describe('merge.recursive', function () {

	it('basic', () => {

		assert.deepEqual(
			merge.recursive({ a: { b: 1 } }, { a: { c: 1 } }),
			{ a: { b: 1, c: 1 } }
		)

		assert.deepEqual(
			merge.recursive({ a: { b: 1, c: 1 } }, { a: { b: 2 } }),
			{ a: { b: 2, c: 1 } }
		)

		assert.deepEqual(
			merge.recursive({ a: { b: [1, 2, 3], c: 1 } }, { a: { b: ['a'] } }),
			{ a: { b: ['a'], c: 1 } }
		)

		assert.deepEqual(
			merge.recursive({ a: { b: { b: 2 }, c: 1 } }, { a: { b: 2 } }),
			{ a: { b: 2, c: 1 } }
		)

	})

	it('clone', function () {

		const test1 = { a: { b: 1 } }

		assert.deepEqual(
			merge.recursive(true, test1, { a: { c: 1 } }),
			{ a: { b: 1, c: 1 } }
		);

		assert.deepEqual(
			{ a: { b: 1 } },
			test1
		);

		const test2 = { a: { b: 1, c: 1 } };

		assert.deepEqual(
			merge.recursive(true, test2, { a: { b: 2 } }),
			{ a: { b: 2, c: 1 } }
		);

		assert.deepEqual(
			{ a: { b: 1, c: 1 } },
			test2
		)

		const test3 = { a: { b: [1, 2, 3], c: 1 } };

		assert.deepEqual(
			merge.recursive(true, test3, { a: { b: ['a'] } }),
			{ a: { b: ['a'], c: 1 } }
		)

		assert.deepEqual(
			{ a: { b: [1, 2, 3], c: 1 } },
			test3
		)

		const test4 = { a: { b: { b: 2 }, c: 1 } };

		assert.deepEqual(
			merge.recursive(true, test4, { a: { b: 2 } }),
			{ a: { b: 2, c: 1 } }
		)

		assert.deepEqual(
			{ a: { b: { b: 2 }, c: 1 } },
			test4
		)

	})

	it('prototype pollution attack', function () {

		assert.deepEqual(
			merge.recursive({}, JSON.parse('{"__proto__": {"a": true}}')),
			{}
		)

		assert.equal(({} as any)['a'], undefined)

		assert.deepEqual(
			merge.recursive({ deep: {} }, JSON.parse('{ "deep": { "__proto__": {"b": true} }}')),
			{ deep: {} }
		)

		assert.equal(({} as any)['b'], undefined)

	})

})