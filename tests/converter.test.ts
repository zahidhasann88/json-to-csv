import { promises as fs } from 'fs';
import { jsonToCsv, yamlToJson } from '../src/converter';

describe('jsonToCsv', () => {
  it('should convert JSON array to CSV', () => {
    const json = [
      { name: 'John Doe', email: 'john@example.com', age: 30 },
      { name: 'Jane Doe', email: 'jane@example.com', age: 25 }
    ];
    const csv = jsonToCsv(json, {});
    const expectedCsv = `"name","email","age"\n"John Doe","john@example.com",30\n"Jane Doe","jane@example.com",25`;
    const normalizeNewlines = (str: string) => str.replace(/\r\n/g, '\n').trim();
    expect(normalizeNewlines(csv)).toBe(normalizeNewlines(expectedCsv));
  });
});

describe('yamlToJson', () => {
  it('should convert YAML string to JSON array', async () => {
    const yamlString = await fs.readFile('data.yml', 'utf-8');
    const expectedJson = [
      { name: 'John Doe', email: 'john@example.com', age: 30 },
      { name: 'Jane Doe', email: 'jane@example.com', age: 25 }
    ];
    const json = yamlToJson(yamlString);
    expect(json).toEqual(expectedJson);
  });
});
