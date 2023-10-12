const fs = require("fs");
const chalk = require("chalk");

const {
  isJSONFile,
  suggestionsForValidJSONFile,
} = require("./server/utils.js");

require("dotenv").config();
const dbFile = process.env.DB_FILE_ABS_PATH;

if (!fs.existsSync(dbFile)) {
  console.log(
    chalk.red(`Database file ${dbFile} does not exist. Please create it.`)
  );
  console.log();
  process.exit();
}

if (!isJSONFile(dbFile)) {
  suggestionsForValidJSONFile(dbFile);
  process.exit(1); // Use a non-zero exit code to indicate an error
}

const { startApp } = require("./server/server.js");

startApp();
