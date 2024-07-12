"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonToCsv = void 0;
const json2csv_1 = require("json2csv");
const jsonToCsv = (json) => {
    const csv = (0, json2csv_1.parse)(json);
    return csv;
};
exports.jsonToCsv = jsonToCsv;
