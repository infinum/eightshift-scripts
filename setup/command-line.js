
const { exec } = require('promisify-child-process');

// Required because `npm run build` sometimes throws an error:
// RangeError [ERR_CHILD_PROCESS_STDIO_MAXBUFFER]: stderr maxBuffer length exceeded
const maxBuffer = 500 * 1024;

const cloneRepoTo = async (folderName) => {
  const command = `git clone https://github.com/infinum/eightshift-boilerplate-internal.git ${folderName} && cd ${folderName}`;
  return exec(command);
};
const installNodeDependencies = async folderName => exec(`cd ${folderName} && npm install`);
const installComposerDependencies = async folderName => exec(`cd ${folderName} && composer install --ignore-platform-reqs`);
const updateComposerAutoloader = async folderName => exec(`cd ${folderName} && composer -o dump-autoload`);
const buildAssets = async folderName => exec(`cd ${folderName} && npm run build`, { maxBuffer });
const wpCoreDownload = async folderName => exec(`cd ${folderName} && wp core download`);

module.exports = {
  cloneRepoTo,
  installNodeDependencies,
  installComposerDependencies,
  updateComposerAutoloader,
  buildAssets,
  wpCoreDownload,
};
