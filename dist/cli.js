"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const fs_1 = require("fs");
const converter_1 = require("./converter");
const program = new commander_1.Command();
program
    .version('1.0.0')
    .description('JSON to CSV Converter')
    .option('-i, --input <file>', 'Input JSON file')
    .option('-o, --output <file>', 'Output CSV file')
    .parse(process.argv);
const options = program.opts();
if (!options.input || !options.output) {
    console.error('Please provide both input and output file paths.');
    process.exit(1);
}
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield fs_1.promises.readFile(options.input, 'utf-8');
        const json = JSON.parse(data);
        const csv = (0, converter_1.jsonToCsv)(json);
        yield fs_1.promises.writeFile(options.output, csv);
        console.log(`CSV file has been saved to ${options.output}`);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Error:', error.message);
        }
        else {
            console.error('Unexpected error:', error);
        }
    }
});
run();
