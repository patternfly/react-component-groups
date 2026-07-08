const fse = require('fs-extra');
const path = require('path');
const { default: getDynamicModuleMap } = require('../../scripts/parse-dynamic-modules.mjs');
const { toPosixPath, posixGlobSync, posixRelative } = require('./utils');

const root = toPosixPath(process.cwd());

const sourceFiles = posixGlobSync(`${root}/src/*/`)
  .map((name) => name.replace(/\/$/, ''));

const indexTypings = posixGlobSync(`${root}/src/index.d.ts`);

const ENV_AGNOSTIC_ROOT = `${root}/dist/dynamic`

async function copyTypings(files, dest) {
  const cmds = [];
  files.forEach((file) => {
    const fileName = file.split('/').pop();
    cmds.push(fse.copyFile(file, `${dest}/${fileName}`));
  });
  return Promise.all(cmds);
}

async function createPackage(file) {
  const fileName = file.split('/').pop();
  const esmSource = posixGlobSync(`${root}/dist/esm/${fileName}/**/index.js`)[0];
  const cjsSource = posixGlobSync(`${root}/dist/cjs/${fileName}/**/index.js`)[0];
  const typingsSource = posixGlobSync(`${root}/dist/esm/${fileName}/**/index.d.ts`)[0]
  /**
   * Prevent creating package.json for directories with no JS files (like CSS directories)
   */
  if (!esmSource) {
    return;
  }

  const destDir = path.resolve(`${ENV_AGNOSTIC_ROOT}`, fileName)
  const destFile = `${destDir}/package.json`;

  // ensure the directory exists
  fse.ensureDirSync(destDir)

  const esmRelative = posixRelative(file, esmSource).replace('/dist', '');
  const cjsRelative = posixRelative(file, cjsSource).replace('/dist', '');
  const tsRelative = posixRelative(file, typingsSource).replace('/dist', '')
  const content = {
    main: cjsRelative,
    module: esmRelative,
  };
  const typings = posixGlobSync(`${root}/src/${fileName}/*.d.ts`);
  const cmds = [];
  content.typings = tsRelative;
  cmds.push(copyTypings(typings, `${root}/dist/${fileName}`));
  cmds.push(fse.writeJSON(destFile, content));
  return Promise.all(cmds);
}

async function generatePackages(files) {
  // ensure the dynamic root exists
  fse.ensureDirSync(path.resolve(ENV_AGNOSTIC_ROOT))
  const cmds = files.map((file) => createPackage(file));
  return Promise.all(cmds);
}

async function generateDynamicModuleMap() {
  const moduleMap = getDynamicModuleMap(root);
  // eslint-disable-next-line no-console
  console.log('Generating dynamic module map for', Object.keys(moduleMap).length, 'modules');

  if (Object.keys(moduleMap).length === 0) {
    return Promise.resolve();
  }

  const moduleMapSorted = Object.keys(moduleMap)
    .sort()
    .reduce((acc, key) => ({ ...acc, [key]: moduleMap[key] }), {});

  return fse.writeJSON(path.resolve(root, 'dist/dynamic-modules.json'), moduleMapSorted, { spaces: 2 });
}

async function run(files) {
  try {
    await generatePackages(files);
    if (indexTypings.length === 1) {
      copyTypings(indexTypings, root);
    }
    await generateDynamicModuleMap()
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    process.exit(1);
  }
}

run(sourceFiles);