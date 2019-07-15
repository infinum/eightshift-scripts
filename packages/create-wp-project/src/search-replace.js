
const replace = require('replace-in-file');
const path = require('path');

const {
  files: {
    findReplace,
    fullPath,
  },
  // } = require('eightshift-scripts');
} = require('../../../index.js');

const defaultValues = {
  themeFolderName: 'eightshift-boilerplate',
  name: 'Eightshift Boilerplate Internal',
  package: 'eightshift_boilerplate',
  namespace: 'Eightshift_Boilerplate',
  env: 'ES_ENV',
  manifest: 'ES_ASSETS_MANIFEST',
};

const searchReplace = async (data) => {
  const projectPath = path.join(fullPath, data.folderName);
  const themePath = path.join(projectPath, 'wp-content', 'themes', defaultValues.themeFolderName);

  // Replace theme name

  // Folder name
  if (data.folderName) {
    await replace({
      files: path.join(projectPath, 'webpack', 'config.js'),
      from: defaultValues.folderName,
      to: projectPath,
    });
  }

  // Name
  if (data.name) {
    await replace({
      files: path.join(themePath, 'functions.php'),
      from: /^ \* Theme Name:.*$/m,
      to: ` * Theme Name: ${data.name}`,
    });
    await replace({
      files: path.join(themePath, 'style.css'),
      from: /^Theme Name: .*$/m,
      to: `Theme Name: ${data.name}`,
    });
  }

  // Description
  if (data.description) {
    await replace({
      files: path.join(themePath, 'functions.php'),
      from: /^ \* Description:.*$/m,
      to: ` * Description: ${data.description}`,
    });
    await replace({
      files: path.join(themePath, 'style.css'),
      from: /^Description: .*$/m,
      to: `Description: ${data.description}`,
    });
  }

  // Package
  if (data.package) {
    await findReplace(projectPath, defaultValues.package, data.package);
  }

  // Namespace
  if (data.namespace) {
    await findReplace(projectPath, defaultValues.namespace, data.namespace);
  }

  // env
  if (data.env) {
    await findReplace(projectPath, defaultValues.env, data.env);
  }

  // assetManifest
  if (data.manifest) {
    await findReplace(projectPath, defaultValues.manifest, data.manifest);
  }

  // BrowserSync proxy url.
  if (data.url) {
    await replace({
      files: path.join(projectPath, 'webpack', 'config.js'),
      from: /proxyUrl: .*$/m,
      to: `proxyUrl: '${data.url}',`,
    });
  }
};

module.exports = {
  searchReplace,
};
