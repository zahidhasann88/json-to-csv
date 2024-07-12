import { Command } from 'commander';
import { promises as fs } from 'fs';
import { jsonToCsv, yamlToJson } from './converter';

const program = new Command();

program
  .version('1.0.0')
  .description('Data to CSV Converter')
  .option('-i, --input <file>', 'Input file')
  .option('-o, --output <file>', 'Output CSV file')
  .option('-f, --format <format>', 'Input format (json, yaml)', 'json')
  .option('-d, --delimiter <char>', 'CSV delimiter', ',')
  .option('-q, --quote <char>', 'Quote character', '"')
  .parse(process.argv);

const options = program.opts();

if (!options.input || !options.output) {
  console.error('Please provide both input and output file paths.');
  process.exit(1);
}

const isError = (error: unknown): error is Error => {
  return error instanceof Error;
};

const run = async () => {
  try {
    const data = await fs.readFile(options.input, 'utf-8');
    let json: object[];
    if (options.format === 'yaml') {
      json = yamlToJson(data);
    } else {
      json = JSON.parse(data);
    }
    const csv = jsonToCsv(json, { delimiter: options.delimiter, quote: options.quote });
    await fs.writeFile(options.output, csv);
    console.log(`CSV file has been saved to ${options.output}`);
  } catch (error) {
    if (isError(error)) {
      console.error('Error:', error.message);
    } else if (error instanceof SyntaxError) {
      console.error('JSON Syntax Error:', error.message);
    } else if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
      console.error('File not found:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
  }
};

run();
