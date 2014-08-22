/*!
 * @name JavaScript/NodeJS Merge v1.1.3
 * @author yeikos
 * @repository https://github.com/yeikos/js.merge

 * Copyright 2014 yeikos - MIT license
 * https://raw.github.com/yeikos/js.merge/master/LICENSE
 */

;(function(isNode) {

	function merge() {

		var result = arguments[0],
			deep = (result === true),
			size = arguments.length,
			item, index, key;

		if (deep || typeOf(result) !== 'object')

			result = {};

		for (index=1;index<size;++index)

			if (typeOf(item = arguments[index]) === 'object')

				for (key in item) {

					if (!item.hasOwnProperty(key))

						continue;

					result[key] = deep ? clone(item[key]) : item[key];
				}

		return result;

	}

	function clone(input) {

		var output = input,
			type = typeOf(input),
			index, size;

		if (type === 'array') {

			output = [];
			size = input.length;

			for (index=0;index<size;++index)

				output[index] = clone(input[index]);

		} else if (type === 'object') {

			output = {};

			for (index in input)

				output[index] = clone(input[index]);

		}

		return output;

	}

	function typeOf(input) {

		if (Array.isArray(input))

			return 'array';

		if (input !== null && input instanceof Object)

			return 'object';

	}

	if (isNode) {

		module.exports = merge;

	} else {

		window.merge = merge;

	}

})(typeof module === 'object' && module && typeof module.exports === 'object' && module.exports);