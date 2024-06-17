const fse = require('fs-extra');
const { globSync } = require('glob');
const path = require('path');

const root = process.cwd();

const foldersBlackList = [ '__snapshots__', '__mocks__' ];
const sourceFiles = globSync(`${root}/src/*/`)
  .filter((item) => !foldersBlackList.some((name) => item.includes(name)))
  .map((name) => name.replace(/\/$/, ''));
const indexTypings = globSync(`${root}/src/index.d.ts`);

async function copyTypings(files, dest) {
  const cmds = [];
  files.forEach((file) => {
    const fileName = file.split('/').pop();
    cmds.push(fse.copyFile(file, `${dest}/${fileName}`));
  });
  return Promise.all(cmds);
}

async function createPackage(file, forceTypes) {
  const fileName = file.split('/').pop();
  const esmSource = globSync(`${root}/esm/${fileName}/**/index.js`)[0];
  /**
   * Prevent creating package.json for directories with no JS files (like CSS directories)
   */
  if (!esmSource) {
    return;
  }

  const destFile = `${path.resolve(root, file.split('/src/').pop())}/package.json`;

  const esmRelative = path.relative(file.replace('/src', ''), esmSource);
  const content = {
    main: 'index.js',
    module: esmRelative,
  };
  const typings = globSync(`${root}/src/${fileName}/*.d.ts`);
  const cmds = [];
  if (forceTypes) {
    content.typings = 'index.d.ts';
  } else if (typings.length > 0) {
    const hasIndex = globSync(`${root}/src/${fileName}/index.d.ts`).length > 0;
    if (hasIndex) {
      content.typings = 'index.d.ts';
    }

    cmds.push(copyTypings(typings, `${root}/${fileName}`));
  }

  cmds.push(fse.writeJSON(destFile, content));

  return Promise.all(cmds);
}

async function generatePackages(files, forceTypes) {
  const cmds = files.map((file) => createPackage(file, forceTypes));
  return Promise.all(cmds);
}

async function run(files, forceTypes) {
  try {
    await generatePackages(files, forceTypes);
    if (indexTypings.length === 1) {
      copyTypings(indexTypings, root);
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    process.exit(1);
  }
}

const forceTypes = !!process.argv.includes('--forceTypes');

run(sourceFiles, forceTypes);
