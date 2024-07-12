# JSON to CSV Converter

A command-line utility tool to convert JSON files to CSV format.

## Installation

1. Clone the repository.
2. Run `npm install` to install dependencies.

## Usage

To convert a JSON file to CSV, run:

```bash
npx ts-node src/index.ts -i <input-file> -o <output-file>
```
Example
```bash
npx ts-node src/index.ts -i data.json -o data.csv
```
Run linting and formatting:

```bash
npm run lint
npm run format
