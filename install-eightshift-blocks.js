// -----------------------------------------
// Clone block to folder (which folder)
// -----------------------------------------

// 1. Pre-flight checklist
// 1.1. Make sure we're in folder containing 'package.json'
// 1.2. Make sure that package.json has 'eightshift-blocks' as dependency
// 1.3. Make sure it's installed in vendors folder and that the 'examples' folder exists
//
// 2. Copy block to 'custom' folder

const { installStep } = require('./setup/console.js');

// Steps
const { clearConsole, writeIntro } = require('./src/steps/step-intro.js');
const { preflightChecklist } = require('./src/steps/step-checklist.js');
const { promptForBlock } = require('./src/steps/step-prompt.js');
const { installBlock, installBlockDependencies } = require('./src/steps/step-install.js');
let blockName = '';

const run = async () => {

  await installStep({
    describe: 'Running some checks to see if we can proceed...',
    thisHappens: preflightChecklist(),
    isFatal: true,
  });

  await clearConsole();
  await writeIntro();

  const blockName = await promptForBlock();

  await installStep({
    describe: '1. Installing block',
    thisHappens: installBlock(blockName),
    isFatal: true,
  });

  await installStep({
    describe: '2. Installing block dependencies',
    thisHappens: installBlockDependencies(),
    isFatal: true,
  });
}

run();