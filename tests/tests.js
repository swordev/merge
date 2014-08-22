function Foo(){}

Foo.prototype.bar = 1;

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

    deepEqual(

        merge({}, new Foo()),

        {}

    );

});

test('merge (deep)', function() {

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