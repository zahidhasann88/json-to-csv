import { parse, Options } from 'json2csv';
import yaml from 'js-yaml';

export const jsonToCsv = (json: object[], options: Options<{}>): string => {
  const csv = parse(json, options);
  return csv;
};

export const yamlToJson = (yamlString: string): object[] => {
  const json = yaml.load(yamlString);
  return json as object[];
};
