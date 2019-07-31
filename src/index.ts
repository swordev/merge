module.exports = exports = main

export default main

export function main(clone: boolean, ...items: any[]): any
export function main(...items: any[]): any
export function main(...items: any[]) {
	return merge(...items)
}

main.clone = clone
main.isPlainObject = isPlainObject
main.recursive = recursive

export function merge(clone: boolean, ...items: any[]): any
export function merge(...items: any[]): any
export function merge(...items: any[]) {
	return _merge(items[0] === true, false, items)
}

export function recursive(clone: boolean, ...items: any[]): any
export function recursive(...items: any[]): any
export function recursive(...items: any[]) {
	return _merge(items[0] === true, true, items)
}

export function clone<T>(input: T): T {

	if (Array.isArray(input)) {

		const output = []

		for (let index = 0; index < input.length; ++index)
			output.push(clone(input[index]))

		return output as any

	} else if (isPlainObject(input)) {

		const output: any = {}

		for (let index in input)
			output[index] = clone(input[index])

		return output as any

	} else {

		return input

	}

}

export function isPlainObject(input: any): input is Object {
	return input && typeof input === 'object' && !Array.isArray(input)
}

function _recursiveMerge(base: any, extend: any) {

	if (!isPlainObject(base))
		return extend

	for (const key in extend)
		base[key] = (isPlainObject(base[key]) && isPlainObject(extend[key])) ?
			_recursiveMerge(base[key], extend[key]) :
			extend[key]

	return base

}

function _merge(isClone: boolean, isRecursive: boolean, items: any[]) {

	let result

	if (isClone || !isPlainObject(result = items.shift()))
		result = {}

	for (let index = 0; index < items.length; ++index) {

		const item = items[index]

		if (!isPlainObject(item))
			continue

		for (const key in item) {
			if (key === '__proto__') continue
			const value = isClone ? clone(item[key]) : item[key]
			result[key] = isRecursive ? _recursiveMerge(result[key], value) : value
		}

	}

	return result

}
