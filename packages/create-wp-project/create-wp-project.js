#!/usr/bin/env node

const { clearConsole, writeIntro } = require('./src/steps/step-intro.js');
const { preflightChecklist } = require('./src/steps/step-checklist.js');
const { promptForBlock } = require('./src/steps/step-prompt.js');
const {
  console: { installStep },
  commandLine: {
    cloneRepo,
    installNodeDependencies,
    installComposerDependencies,
    updateComposerAutoloader,
    buildAssets,
    wpCoreDownload,
  },
} = require('eightshift-scripts');

const run = async () => {

  await installStep({
    describe: 'Running some checks to see if we can proceed...',
    thisHappens: preflightChecklist(),
    isFatal: true,
  });

  await clearConsole();
  await writeIntro();

  const proptedInfo = await promptAll();
  const processedInfo = await processedInfo(proptedInfo);

  await installStep({
    describe: '2. Cloning theme repo',
    thisHappens: cloneRepo( processedInfo.gitClone ),
    isFatal: true,
  });

  await installStep({
    describe: '3. Installing Node dependencies',
    thisHappens: installNodeDependencies(),
    isFatal: true,
  });

  await installStep({
    describe: '4. Installing Composer dependencies',
    thisHappens: installComposerDependencies(),
    isFatal: true,
  });

  await installStep({
    describe: '5. Replacing theme info',
    thisHappens: preflightChecklist(),
    isFatal: true,
  });

  await installStep({
    describe: '6. Updating composer autoloader',
    thisHappens: updateComposerAutoloader(),
    isFatal: true,
  });

  await installStep({
    describe: '7. Building assets',
    thisHappens: buildAssets(),
    isFatal: true,
  });

  await installStep({
    describe: '8. Installing WordPress core',
    thisHappens: wpCoreDownload(),
    isFatal: true,
  });

  await installStep({
    describe: '9. Cleaning up',
    thisHappens: cleanup(),
    isFatal: true,
  });

  await installSuccess({
    describe: 'title',
    details: () => {
      log('Please visit your local site to finalize WordPress installation.');
    },
  });
}

run();