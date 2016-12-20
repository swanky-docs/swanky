'use strict';

const path = require('path');
const chalk = require('chalk');

function swankyGreet() {
  // Great the user
  let generatorVersion = require('fs-extra').readJsonSync(path.join(__dirname, '/../../../../package.json')).version;

  let swanky =
    chalk.red.bold('\n ╓╣╣╣╣╣╣╣╗ ╣╣╣╣       ╣╣╣╣ ╓╣╣╣╣╣╣╣╗ ╞╣╣╣  ╣╣╣ ╞╣╣╣  ╓╣╣╣ ╚╣╣╣╗     ╣╣╣╝') +
    chalk.blue.bold('\n ╣╣╣╣ ╠╣╣╣ ╣╣╣╣       ╣╣╣╣ ╣╣╣╣ ╠╣╣╣ ╞╣╣╣╣ ╣╣╣ ╞╣╣╣ ╓╣╣╣    ╚╣╣╣╗╓╞╣╣╝') +
    chalk.white.bold('\n ╣╣╣╣      ╣╣╣╣       ╣╣╣╣ ╣╣╣╣ ╠╣╣╣ ╞╣╣╣╣╗╣╣╣ ╞╣╣╣╓╣╣╣       ╚╣╣╣╣╝') +
    chalk.white.bold('\n └╝╣╣╣╣╣╣╗ ╣╣╣╣       ╣╣╣╣ ╣╣╣╣╣╣╣╣╣ ╞╣╣╣╣╣╣╣╣ ╞╣╣╣╣╣╣╗        ╞╣╣╣') +
    chalk.white.bold('\n      ╠╣╣╣ ╣╣╣╣  ╣╣╣  ╣╣╣╣ ╣╣╣╣ ╠╣╣╣ ╞╣╣╣╚╣╣╣╣ ╞╣╣╣╚╣╣╣╗       ╞╣╣╣') +
    chalk.blue.bold('\n ╣╣╣╣ ╠╣╣╣ ╣╣╣╣  ╣╣╣  ╣╣╣╣ ╣╣╣╣ ╠╣╣╣ ╞╣╣╣ ╣╣╣╣ ╞╣╣╣ ╚╣╣╣╗      ╞╣╣╣') +
    chalk.red.bold('\n └╝╣╣╣╣╣╝  └╝╣╣╣╣╣╝└╣╣╣╣╣╝ ╣╣╣╣ ╠╣╣╣ ╞╣╣╣ ╘╣╣╣ ╞╣╣╣  ╚╣╣╣╗     ╞╣╣╣');

  let docs =
    chalk.red.bold('\n ╣╣╣╣╣╣╣╣╗ ╓╣╣╣╣╣╣╣╗ ╓╣╣╣╣╣╣╣╗ ╓╣╣╣╣╣╣╣╗') + chalk.white.bold(' swanky v' + generatorVersion) +
    chalk.blue.bold('\n ╣╣╣╣ ╠╣╣╣ ╣╣╣╣ ╠╣╣╣ ╣╣╣╣ ╠╣╣╣ ╣╣╣╣ ╠╣╣╣') +
    chalk.white.bold('\n ╣╣╣╣ ╠╣╣╣ ╣╣╣╣ ╠╣╣╣ ╣╣╣╣ ╠╣╣╣ ╣╣╣╣') +
    chalk.white.bold('\n ╣╣╣╣ ╣╣╣╣ ╣╣╣╣ ╣╣╣╣ ╣╣╣╣      └╝╣╣╣╣╣╣╗') +
    chalk.white.bold('\n ╣╣╣╣ ╣╣╣╣ ╣╣╣╣ ╣╣╣╣ ╣╣╣╣ ╠╣╣╣      ╠╣╣╣') +
    chalk.blue.bold('\n ╣╣╣╣ ╠╣╣╣ ╣╣╣╣ ╣╣╣╣ ╣╣╣╣ ╠╣╣╣ ╣╣╣╣ ╠╣╣╣') +
    chalk.red.bold('\n ╣╣╣╣╣╣╣╣╝ └╝╣╣╣╣╣╝  └╝╣╣╣╣╣╝   ╝╣╣╣╣╣╝ ') +
    '\n';

  console.log(swanky);
  console.log(docs);
}

module.exports = swankyGreet;