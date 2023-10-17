import { existsSync } from "fs";
import chalk from "chalk";
import dotenv from "dotenv";
import { isJSONFile, suggestionsForValidJSONFile } from "./server/utils.js";
import { populateInternalDBWithTableSchema } from "./server/internalDB/helpers.js";
import { startApp } from "./server/server.js";

dotenv.config();

const dbFile = process.env.DB_FILE_ABS_PATH;

if (!existsSync(dbFile)) {
  console.log(chalk.red(`Database file ${dbFile} does not exist. Please create it.`));
  console.log();
  process.exit();
}

if (!isJSONFile(dbFile)) {
  suggestionsForValidJSONFile(dbFile);
  process.exit(1);
}

console.log();
console.log(chalk.bgBlue.white.bold(' Welcome to json-server admin dashboard! '));
console.log();
console.log(chalk.magenta("Database file: " + dbFile + " 📁"));

populateInternalDBWithTableSchema().then(() => {
  console.log();  
  console.log(chalk.blueBright("Internal DB populated with table schema" + " 🗄️"));
  console.log();
  startApp();
}).catch((error) => {
  console.log();
  console.log(chalk.red("Error populating internal DB with table schema" + " 🗄️"));
  console.log(error);
  console.log();
  process.exit(1);
});
