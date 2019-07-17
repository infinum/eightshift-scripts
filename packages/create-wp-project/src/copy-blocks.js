const { join } = require('path');
const { copy } = require('fs-extra');

const copyBlocksFolder = async (projectPath, themePath) => {
  const sourcePath = join(projectPath, 'vendor', 'infinum', 'eightshift-blocks', 'blocks');
  const targetPath = join(themePath, 'src', 'blocks');

  // Copy folder
  await copy(sourcePath, targetPath, (err) => {
    if (err) throw new Error(err);
  });
};

module.exports = {
  copyBlocksFolder,
};
