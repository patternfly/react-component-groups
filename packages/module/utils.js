/**
 * Cross-platform path utilities for build scripts.
 *
 * On Windows, Node's path.resolve and path.relative produce backslash-separated
 * paths. glob v10+ treats backslashes as escape characters (not path separators),
 * so a pattern like `C:\src\*\index.ts` silently matches nothing because \* is
 * interpreted as a literal asterisk. glob also returns backslash paths on Windows,
 * breaking downstream code that splits on '/' to extract path segments.
 *
 * These utilities normalize paths to POSIX forward slashes for glob input/output
 * and for any path strings written into generated package.json files.
 */

const { globSync } = require('glob');
const path = require('path');

/** Normalize a file path to use POSIX forward slashes. No-op on Linux/macOS. */
const toPosixPath = (filePath) => filePath.replace(/\\/g, '/');

/**
 * globSync wrapper that normalizes the pattern and results to POSIX paths.
 * Use in place of globSync wherever the pattern includes Node-resolved paths
 * (process.cwd(), path.resolve, __dirname, etc.) that may contain backslashes.
 */
const posixGlobSync = (pattern) =>
  globSync(toPosixPath(pattern)).map(toPosixPath);

/**
 * path.relative wrapper that returns a POSIX-style relative path.
 * Use when the result will be written into a generated file (e.g. package.json
 * "main"/"module" fields) where forward slashes are expected by consumers.
 */
const posixRelative = (from, to) =>
  toPosixPath(path.relative(from, to));

module.exports = { toPosixPath, posixGlobSync, posixRelative };
