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
  misc: { log }
} = require('eightshift-scripts');

const run = async () => {

  await clearConsole();

  const promptedInfo = await maybePrompt( scriptArguments );
  const projectPath = path.join(fullPath, promptedInfo.package);

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
    thisHappens: copyBlocksFolder(projectPath),
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

  log('----------------');
  log('Success!!!');
  log('');
  log('Please visit your local site url to finalize WordPress installation. After you\'ve installed WordPress, please activate your new theme and you\'re good to go!');
  log('----------------');

  // await installSuccess({
  //   describe: 'title',
  //   details: () => {
  //     log('Please visit your local site to finalize WordPress installation. After you\'ve installed WordPress, please activate your new theme and you\'re good to go!');
  //   },
  // });
}

run();