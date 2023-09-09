# merge

[![workflow-badge]](https://github.com/swordev/merge/actions/workflows/ci.yaml) [![license-badge]](https://github.com/swordev/merge#license)

[workflow-badge]: https://img.shields.io/github/actions/workflow/status/swordev/merge/ci.yaml?branch=main
[license-badge]: https://img.shields.io/github/license/swordev/merge

> (recursive)? merging of (cloned)? objects.

## Installation

```sh
npm install merge
```

## Usage

### API

```ts
merge(clone: boolean, ...items: Object[])
merge(...items: Object[])
merge.recursive(clone: boolean, ...items: Object[])
merge.recursive(...items: Object[])
```

### Examples

```js
const objectA = {};

merge(objectA, { value: 1 }, { str: "hello world" });

const objectB = merge(true, objectA, { value: 2 });

objectA; // { value: 1, str: 'hello world' }
objectB; // { value: 2, str: 'hello world' }
```

```js
const objectA = {};

merge.recursive(
  objectA,
  { level: { value: 1 } },
  { level: { str: "hello world" } },
);
const objectB = merge.recursive(true, objectA, { level: { value: 2 } });

objectA.level; // { value: 1, str: 'hello world' }
objectB.level; // { value: 2, str: 'hello world' }
```

## Development

### Requirements

- [Node.js v18](https://nodejs.org)
- [pnpm v8](https://pnpm.io)

### Build

```sh
pnpm build
```

### Test

```sh
pnpm test
```

## License

Distributed under the MIT License. See LICENSE file in each package for more information.
