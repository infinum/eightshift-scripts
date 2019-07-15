#!/usr/bin/env node


const path = require('path');
const { scriptArguments } = require('./src/arguments');
const { searchReplace } = require('./src/search-replace')
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

  const promptedInfo = await maybePrompt( scriptArguments );
  const newPath = path.join(fullPath, promptedInfo.folderName);

  await installStep({
    describe: '1. Cloning theme repo',
    thisHappens: cloneRepoTo(newPath),
    isFatal: true,
  });

  await installStep({
    describe: '2. Installing Node dependencies',
    thisHappens: installNodeDependencies(newPath),
    isFatal: true,
  });

  await installStep({
    describe: '3. Installing Composer dependencies',
    thisHappens: installComposerDependencies(newPath),
    isFatal: true,
  });

  await installStep({
    describe: '4. Replacing theme info',
    thisHappens: searchReplace(promptedInfo),
    isFatal: true,
  });

  await installStep({
    describe: '5. Updating composer autoloader',
    thisHappens: updateComposerAutoloader(newPath),
    isFatal: true,
  });

  await installStep({
    describe: '6. Building assets',
    thisHappens: buildAssets(newPath),
    isFatal: true,
  });

  await installStep({
    describe: '7. Installing WordPress core',
    thisHappens: wpCoreDownload(newPath),
    isFatal: true,
  });

  // await installStep({
  //   describe: '8. Cleaning up',
  //   thisHappens: cleanup(),
  //   isFatal: true,
  // });

  // await installSuccess({
  //   describe: 'title',
  //   details: () => {
  //     log('Please visit your local site to finalize WordPress installation.');
  //   },
  // });
}

run();