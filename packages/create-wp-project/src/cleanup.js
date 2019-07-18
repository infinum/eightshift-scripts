const del = require('del'); // eslint-disable-line
const { join } = require('path');

const cleanup = async (projectPath) => {

  // Delete .git folder
  const gitFolderPath = join(projectPath, '.git');
  const githubFolderPath = join(projectPath, '.github');
  await del(gitFolderPath);
  await del(githubFolderPath);
};

module.exports = {
  cleanup,
};
