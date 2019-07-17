#!/usr/bin/env node


const path = require('path');
const { scriptArguments } = require('./src/arguments');
const { searchReplace } = require('./src/search-replace');
const { copyBlocksFolder } = require('./src/copy-blocks')
const {
  console: {
    installStep,
    clearConsole
  },
  commandLine: {
    cloneRepoTo,
    installNodeDependencies,
    installComposerDependencies,
    updateComposerAutoloader,
    buildAssets,
    wpCoreDownload,
  },
  arguments: { maybePrompt },
  files: { fullPath },
// } = require('eightshift-scripts');
} = require('../../index.js');

const run = async () => {

  // await installStep({
  //   describe: 'Running some checks to see if we can proceed...',
  //   thisHappens: preflightChecklist(),
  //   isFatal: true,
  // });

  await clearConsole();

  // const promptedInfo = await maybePrompt( scriptArguments );

  const promptedInfo = {
    projectName: 'Public',
    devUrl: 'eightshift-internal-boilerplate.loca',
    description: 'JSdjasdasdjahd jashdajsdhajdhj',
    package: 'public',
    namespace: 'Public_Namespace',
    prefix: 'PUB',
    env: 'PUB_ENV',
    assetManifest: 'PUB_ASSETS_MANIFEST'
  }

  const projectPath = path.join(fullPath, promptedInfo.package);
  const themePath = path.join(projectPath, 'wp-content', 'themes', promptedInfo.package);

  await installStep({
    describe: '1. Cloning theme repo',
    thisHappens: cloneRepoTo(projectPath),
    isFatal: true,
  });

  await installStep({
    describe: '2. Installing Composer dependencies',
    thisHappens: installComposerDependencies(projectPath),
    isFatal: true,
  });

  await installStep({
    describe: '3. Installing blocks',
    thisHappens: copyBlocksFolder(projectPath, themePath),
    isFatal: true,
  });

  await installStep({
    describe: '4. Replacing theme info',
    thisHappens: searchReplace(promptedInfo),
    isFatal: true,
  });

  await installStep({
    describe: '5. Updating composer autoloader',
    thisHappens: updateComposerAutoloader(projectPath),
    isFatal: true,
  });

  await installStep({
    describe: '6. Installing Node dependencies',
    thisHappens: installNodeDependencies(projectPath),
    isFatal: true,
  });

  await installStep({
    describe: '7. Building assets',
    thisHappens: buildAssets(projectPath),
    isFatal: true,
  });

  await installStep({
    describe: '8. Installing WordPress core',
    thisHappens: wpCoreDownload(projectPath),
    isFatal: true,
  });

  // await installStep({
  //   describe: '9. Cleaning up',
  //   thisHappens: cleanup(),
  //   isFatal: true,
  // });

  // await installSuccess({
  //   describe: 'title',
  //   details: () => {
  //     log('Please visit your local site to finalize WordPress installation. After you\'ve installed WordPress, please activate your new theme and you\'re good to go!);
  //   },
  // });
}

run();