test('merge', function() {

	deepEqual(

		merge({ a: 1 }, { b: 2 }),

		{ a: 1, b: 2 }

	);

	deepEqual(

		merge({ a: 1 }, { b: { c: { d: 2 } } }),

		{ a: 1, b: { c: { d: 2 } } }

	);

	deepEqual(

		merge(), {}

	);

	deepEqual(

		merge(undefined), {}

	);

	deepEqual(

		merge([]), {}

	);

	deepEqual(

		merge(true), {}

	);

	deepEqual(

		merge(null, true, [0, 1, 2], 3, { a: 1 }, function() {}, undefined, { b: 2 }),

		{ a: 1, b: 2 }

	);

});

test('merge (prototype pollution attack)', function() {

	deepEqual(

		merge({}, JSON.parse('{"__proto__": {"a": true}}')),
		{}

	);

	deepEqual(

		{}.a,

		undefined

	);

});

test('merge (clone)', function() {

	var input = {

		a: 1,
		b: {

			c: {

				d: 2,

				e: ['x', 'y', { z: { w: ['k'] }}]

			}

		},

		f: null,
		g: undefined,
		h: true

	}, original = {

		a: 1,
		b: {

			c: {

				d: 2,

				e: ['x', 'y', { z: { w: ['k'] }}]

			}

		},

		f: null,
		g: undefined,
		h: true

	}, output = merge(true, input);

	input.b.c.d++;
	input.b.c.e[2].z.w = null;
	input.h = null;

	deepEqual(original, output);

	input = original;

	output = merge(true, input, { a: 2 });

	deepEqual(output.a, 2);
	deepEqual(input.a, 1);

});

test('merge.recursive', function() {

	deepEqual(

		merge.recursive({ a: { b: 1 } }, { a : { c: 1 }}),

		{ a: { b: 1, c: 1 } }

	);

	deepEqual(

		merge.recursive({ a: { b: 1, c: 1 } }, { a : { b: 2 }}),

		{ a: { b: 2, c: 1 } }

	);

	deepEqual(

		merge.recursive({ a: { b: [1, 2, 3], c: 1 } }, { a : { b: ['a'] }}),

		{ a: { b: ['a'], c: 1 } }

	);

	deepEqual(

		merge.recursive({ a: { b: { b: 2 }, c: 1 } }, { a : { b: 2 }}),

		{ a: { b: 2, c: 1 } }

	);

});

test('merge.recursive (prototype pollution attack)', function() {

	deepEqual(

		merge.recursive({}, JSON.parse('{"__proto__": {"a": true}}')),
		{}

	);

	deepEqual(

		{}.a,

		undefined

	);

});

test('merge.recursive (clone)', function() {

	var input = { a: { b: 1 } };

	deepEqual(

		merge.recursive(true, input, { a : { c: 1 }}),

		{ a: { b: 1, c: 1 } }

	);

	deepEqual({ a: { b: 1 } }, input);

	input = { a: { b: 1, c: 1 } };

	deepEqual(

		merge.recursive(true, input, { a : { b: 2 }}),

		{ a: { b: 2, c: 1 } }

	);

	deepEqual({ a: { b: 1, c: 1 } }, input);

	input = { a: { b: [1, 2, 3], c: 1 } };

	deepEqual(

		merge.recursive(true, input, { a : { b: ['a'] }}),

		{ a: { b: ['a'], c: 1 } }

	);

	deepEqual({ a: { b: [1, 2, 3], c: 1 } }, input);

	input = { a: { b: { b: 2 }, c: 1 } };

	deepEqual(

		merge.recursive(true, input, { a : { b: 2 }}),

		{ a: { b: 2, c: 1 } }

	);

	deepEqual({ a: { b: { b: 2 }, c: 1 } }, input);

});