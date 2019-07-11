
const { exec } = require('promisify-child-process');

const cloneRepo = async(cloneCommand, folderPath) => {
  return await exec(`${processedInfo.gitClone} && cd "${folderPath}"`);
}

const installNodeDependencies = async() => {
  return await exec('npm install');
}

const installComposerDependencies = async() => {
  return await exec('composer install --ignore-platform-reqs');
}

const updateComposerAutoloader = async() => {
  return await exec('composer -o dump-autoload');
}

const buildAssets = async() => {
  return await exec('npm run build');
}

const wpCoreDownload = async() => {
  return await exec('wp core download');
}

module.exports = {
  cloneRepo,
  installNodeDependencies,
  installComposerDependencies,
  updateComposerAutoloader,
  buildAssets,
  wpCoreDownload,
}