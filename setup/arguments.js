const chalk = require('chalk'); // eslint-disable-line import/no-extraneous-dependencies
const inquirer = require('inquirer');
const { log, label } = require('./misc');

/**
 * Output a summary for all user-provided answers and ask for a confirmation.
 *
 * @param {array} answers Array of user-provided answers.
 */
const summary = async( answers ) => {
  log('');
  log(label('Summary: '));
  for (answerKey in answers) {
    log(`- ${answerKey}: ${chalk.cyan(answers[answerKey])}`);
  }

  const { confirmSummary } = await inquirer.prompt({
    name: 'confirmSummary',
    type: 'confirm',
    message: 'Looks good?'
  });

  return confirmSummary;
}

/**
 * Should prompt the user for all scriptArguments.
 *
 * TODO: Only prompt for things not provided as arguments on command line.
 *
 * @param {array} scriptArguments Array of defined script arguments.
 */
const maybePrompt = async ( scriptArguments ) => {
  let answers = {};
  let confirm = false;
  do {
    for (argument of scriptArguments) {
      if (argument.buildFrom) {
        const { how, name } = argument.buildFrom;
        answers = { ...answers, [argument.name]: how(answers[name]) };
      } else {
        const promptAnswer = await inquirer.prompt(argument);
        answers = { ...answers, ...promptAnswer };
      }
    }

    confirm = await summary(answers);
    log('');
  } while (confirm !== true);

  return answers;
}

module.exports = {
  maybePrompt
}