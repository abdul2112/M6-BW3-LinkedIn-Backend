import { Parser } from "json2csv";

export const generateCSV = (fields, data) => {
  const opts = { fields };
  try {
    const parser = new Parser(opts);
    const csv = parser.parse(data);
    const buffer = Buffer.from(csv);
    return buffer;
  } catch (err) {
    throw err;
  }
};
