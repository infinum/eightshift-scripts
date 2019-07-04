const { copy } = require('fs-extra');
const { join } = require('path');
const { exec } = require('promisify-child-process');
const blockInstallPath = join('blocks/custom');
const { eightshiftBlocksModuleName, eightshiftBlocksPath } = require('../variables.js');

/**
 * Copy the block from the vendor folder to the user's folder
 */
const installBlock = async (block) => {

  if (block !== 'example') {
    throw new Error('Currently only the example hello-world block is supported.');
  }

  // Refactor when there's more than single example block
  const examplesBlockPath = join(`${eightshiftBlocksPath}/example`);
  const localBlocksPath = join(`${blockInstallPath}/example`);

  await copy(examplesBlockPath, localBlocksPath, err => {
    if (err) throw new Error(err);
  });

  return true;
}

/**
 * Copy the block from the vendor folder to the user's folder
 */
const installBlockDependencies = async () => {
  // throw new Error('asdad');
  return true;
}

module.exports = {
  blockInstallPath,
  installBlock,
  installBlockDependencies
}