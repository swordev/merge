test('merge', function() {

    var input, output;

    // Objects can be merged
    deepEqual(

        merge({ a: 1 }, { b: 2 }),

        { a: 1, b: 2 }

    );

    // Deep objects can be merged
    deepEqual(

        merge({ a: 1 }, { b: { c: { d: 2 } } }),

        { a: 1, b: { c: { d: 2 } } }

    );

    // Calling `merge` without arguments returns an empty object
    deepEqual(

        merge(), {}

    );

    // Calling `merge` with `undefined` returns an empty object
    deepEqual(

        merge(undefined), {}

    );

    // Calling `merge` with empty array returns an empty object
    deepEqual(

        merge([]), {}

    );

    // Calling `merge` with `true` only returns an empty object
    deepEqual(

        merge(true), {}

    );

    // `merge` ignores non object arguments
    deepEqual(

        merge(null, true, [0, 1, 2], 3, { a: 1 }, function() {}, undefined, { b: 2 }),

        { a: 1, b: 2 }

    );

    // `merge` returns `input` when called with only one object
    input = { a: { b: 1 } };
    output = merge(input);
    output.a.b++;
    deepEqual(output.a.b, 2);
    deepEqual(input.a.b, 2);

    // `merge` does change `input` when merging
    input = { a: 1 };
    output = merge(input, { a: 2 });
    deepEqual(output.a, 2);
    deepEqual(input.a, 2);
});

test('merge (deep)', function() {

    // `original` has the same content as `input`, but they are different objects
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

    // `merge(deep)` clones `input` when called without another object
    input.b.c.d++;
    input.b.c.e[2].z.w = null;
    input.h = null;

    deepEqual(original, output);


    // `merge(deep)` does not change `input`
    input = original;

    output = merge(true, input, { a: 2 });

    deepEqual(output.a, 2);
    deepEqual(input.a, 1);


    // `merge(deep)` does deep merge
    input = { a: { b: 1, c: 3 } };
    output = merge(true, input, { a: { b: 2 } });

    deepEqual(input, { a: { b: 1, c: 3 } });
    deepEqual(output, { a: { b: 2, c: 3 } });


    // `merge(deep)` does copy null, but not undefined
    input = { a: { b: 1, c: 3, d: 4 } };
    output = merge(true, input, { a: { b: 2, c: null, d: undefined } });

    deepEqual(input, { a: { b: 1, c: 3, d: 4 } });
    deepEqual(output, { a: { b: 2, c: null, d: 4 } });


    // `merge(deep)` does NOT merge Array
    input = { a: [ 1, 2, 3, 4 ] };
    output = merge(true, input, { a: [ 2, 3, 4 ] });

    deepEqual(input, { a: [ 1, 2, 3, 4 ] });
    deepEqual(output, { a: [ 2, 3, 4 ] });

});
