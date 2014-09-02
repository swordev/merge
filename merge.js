/*!
 * @name JavaScript/NodeJS Merge v1.1.3
 * @author yeikos
 * @repository https://github.com/yeikos/js.merge

 * Copyright 2014 yeikos - MIT license
 * https://raw.github.com/yeikos/js.merge/master/LICENSE
 */

;(function(isNode) {

	function merge() {

		var items = Array.prototype.slice.call(arguments),
			result = items.shift(),
			deep = (result === true),
			size = items.length,
			item, index, key;

		if (deep || typeOf(result) !== 'object')

			result = {};

		for (index=0;index<size;++index)

			if (typeOf(item = items[index]) === 'object')

				for (key in item)

					result[key] = deep ? mergeTwoInputs(result[key], item[key]) : item[key];

		return result;

	}

	// If both are objects, merge them
	// Else If both are arrays, merge them
	// Else If `input2` is not undefined, return `input2`
	// Else return `input1`
	// Always return new object
	function mergeTwoInputs(input1, input2) {
		if (typeOf(input1) === 'object' && typeOf(input2) === 'object') {
			return mergeTwoObjects(input1, input2);
		}

		if (typeOf(input2) !== 'undefined')
			return clone(input2);

		return clone(input1);
	}

	// Return a new object by merging both
	//
	// @param object1 [Object] won't be modified
	// @param object2 [Object] won't be modified
	//
	// @return [Object]
	function mergeTwoObjects(object1, object2) {
		var result = {},
			key;

		// Clone object1
		result = clone(object1);

		// Get all keys in object2, start copying
		for (key in object2) {

			result[key] = mergeTwoInputs(result[key], object2[key]);

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

		return ({}).toString.call(input).match(/\s([\w]+)/)[1].toLowerCase();

	}

	if (isNode) {

		module.exports = merge;

	} else {

		window.merge = merge;

	}

})(typeof module === 'object' && module && typeof module.exports === 'object' && module.exports);
