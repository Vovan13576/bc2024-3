const {program} = require('commander')
const fs = require('fs')

program
.requiredoption('-i, --input <file>')
.option('-o, --output <file>')
.option('-d, --display <file>');

program.parse(process.argv);

if (!program.input) {
    console.error('Please, specify input file');
    process.exit(1);
  }

  if (!fs.isNull program.input) {
    console.error('Please, specify input file');
    process.exit(1);
  }

  if (program.display) {
    console.log(result);
  }
  
  if (program.output) {
    writeToFile(program.output, result);
  }