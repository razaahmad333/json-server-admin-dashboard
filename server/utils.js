import { readFileSync } from "fs";
import chalk from "chalk";

export function isJSONFile(filePath) {
  try {
    const fileContent = readFileSync(filePath);
    JSON.parse(fileContent);
    return true;
  } catch (error) {
    return false;
  }
}

export function suggestionsForValidJSONFile(dbFile) {
  console.log(chalk.red(`Error: The database file ${dbFile} is not a valid JSON file.`));
  console.log();
  console.log(chalk.yellow(`Possible issues to check:`));
  console.log(chalk.yellow(`1. The file should have a .json extension.`));
  console.log(chalk.yellow(`2. The file should be a valid JSON file, with proper JSON syntax.`));
  console.log(chalk.yellow(`3. The file should contain a valid JSON object (not an array or other data).`));
  console.log(chalk.yellow(`4. The file should not contain a trailing comma in the JSON data.`));
  console.log(chalk.yellow(`5. Ensure the file is not empty.`));
  console.log(chalk.yellow(`6. Check file permissions and file location.`));
  console.log();
  console.log(chalk.blue(`Hint: You can create or fix the JSON file with a text editor or JSON validation tool.`));
  console.log(chalk.blue(`      Ensure it matches the expected format for your application.`));
  console.log();
}

export function decodeCompositeKey(compositeKey, schema) {
  const idColumn = schema.find((column) => ["id", "_id"].includes(column.toLowerCase())) || "index";
  schema = schema.filter((column) => column !== idColumn);
  const [id, nextField] = compositeKey.split("-");
  const nextFieldExists = schema.length > 0 && nextField;
  const decoded = [{ key: idColumn, value: id }];
  if (nextFieldExists) {
    decoded.push({ key: schema[0], value: nextField });
  }
  return decoded;
}

export function filterWithCompositeKey(data, compositeKey, schema, not = false) {
  const decoded = decodeCompositeKey(compositeKey, schema);
  console.log(decoded);
  const filter = (row, index) => {
    return decoded.every(({ key, value }) => {
      const f = key === "index" ? index === parseInt(value) : String(row[key]) === value;
      return not ? !f : f;
    });
  };

  

  return data.filter(filter);
}
