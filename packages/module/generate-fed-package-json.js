const fse = require('fs-extra');
const glob = require('glob');
const path = require('path');

const root = process.cwd();

const sourceFiles = glob
  .sync(`${root}/src/*/`)
  .map((name) => name.replace(/\/$/, ''));
  
const indexTypings = glob.sync(`${root}/src/index.d.ts`);

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
  const esmSource = glob.sync(`${root}/dist/esm/${fileName}/**/index.js`)[0];
  const cjsSource = glob.sync(`${root}/dist/cjs/${fileName}/**/index.js`)[0];
  const typingsSource = glob.sync(`${root}/dist/esm/${fileName}/**/index.d.ts`)[0]
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

  const esmRelative = path.relative(file, esmSource).replace('/dist', '');
  const cjsRelative = path.relative(file, cjsSource).replace('/dist', '');
  const tsRelative = path.relative(file, typingsSource).replace('/dist', '')
  const content = {
    main: cjsRelative,
    module: esmRelative,
  };
  const typings = glob.sync(`${root}/src/${fileName}/*.d.ts`);
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

async function run(files) {
  try {
    await generatePackages(files);
    if (indexTypings.length === 1) {
      copyTypings(indexTypings, root);
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    process.exit(1);
  }
}

run(sourceFiles);