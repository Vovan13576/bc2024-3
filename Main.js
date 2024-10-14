const { program } = require('commander');
const fs = require('fs');

// Конфігурація командної строки
program
  .requiredOption('-i, --input <file>', 'Input JSON file')
  .option('-o, --output <file>', 'Output JSON file')
  .option('-d, --display', 'Display filtered data');

program.parse();
const options =program.opts();

// Перевірка наявності вхідного файлу
if (!fs.existsSync(options.input)) {
  console.error('Cannot find input file');
  process.exit(1);
}

// Читання вхідного JSON-файлу
const data = fs.readFileSync(options.input, 'utf8');
let jsonData;

try {
  jsonData = JSON.parse(data);
} catch (err) {
  console.error('Invalid JSON format');
  process.exit(1);
}

// Фільтрація об'єктів з ku=13 та value>5
const filteredData = jsonData.filter(element => element.ku == 13 && element.value > 5);

// Якщо вказано опцію --output, записуємо відфільтровані дані у файл
if (options.output) {
  fs.writeFileSync(options.output, JSON.stringify(filteredData, null, 2), 'utf8');
  console.log(`Filtered data written to ${options.output}`);
}

// Якщо вказано опцію --display, виводимо поле txt кожного відфільтрованого елемента
if (options.display) {
  if (filteredData.length > 0) {
    filteredData.forEach(element => console.log(element.txt));
  } else {
    console.log('No data found with ku=13 and value > 5');
  }
}
