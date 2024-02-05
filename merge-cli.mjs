#!/usr/bin/env node
import mri from 'mri';
import fs from 'fs';

import { merge, recursive } from "./lib/index.js";

const args = mri(process.argv.slice(2), {
  alias: {
    s: 'shallow',
    h: 'help',
  },
  boolean: ['shallow', 'help'],
});

const inputFiles = args._;

/*
Why to avoid `process.exit()`:
  see https://stackoverflow.com/a/37592669/521957
  or https://nodejs.org/api/process.html#processexitcode.
*/
if (args.help) {
  if (inputFiles.length) {
    process.exitCode = 1;
    console.error("You can't provide `--help` or `-h` flags and input files at the same time.")
  } else {
    const help = `\
npx merge
  [--shallow or -s] # If merge is shallow then recursion won't be used.
  [--help or -h]
  [file1.json file2.json ...]
`;
    process.stdout.write(help);
  }

} else if (!inputFiles.length) {

  console.log({});

} else {

  const objects = inputFiles.map(
    (path) => {
      const json = fs.readFileSync(path, 'utf-8');
      return JSON.parse(json);
    }
  );
  const ifToClone = false;
  let merged;
  if (args.shallow) {
    merged = merge(ifToClone, ...objects);
  } else {
    merged = recursive(ifToClone, ...objects);
  }
  console.log(merged);

}
