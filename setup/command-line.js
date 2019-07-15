
const { exec } = require('promisify-child-process');

const cloneRepoTo = async(folderName) => {
  return await exec(
    `git clone git@github.com:infinum/eightshift-boilerplate-internal.git ${folderName} && cd ${folderName}
  `);
}

const installNodeDependencies = async(folderName) => {
  return await exec(`cd ${folderName} && npm install`);
}

const installComposerDependencies = async(folderName) => {
  return await exec(`cd ${folderName} && composer install --ignore-platform-reqs`);
}

const updateComposerAutoloader = async(folderName) => {
  return await exec(`cd ${folderName} && composer -o dump-autoload`);
}

const buildAssets = async(folderName) => {
  return await exec(`cd ${folderName} && npm run build`);
}

const wpCoreDownload = async(folderName) => {
  return await exec(`cd ${folderName} && wp core download`);
}

module.exports = {
  cloneRepoTo,
  installNodeDependencies,
  installComposerDependencies,
  updateComposerAutoloader,
  buildAssets,
  wpCoreDownload,
}