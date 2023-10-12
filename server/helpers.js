const InternalDB = require("./internalDB/helpers.js");

exports.readDatabase = async () => {
  const { db } = await import("./db.mjs");
  await db.read();
  return db.data;
};

exports.getDatabaseSummary = async () => {
  const data = await this.readDatabase();
  const allTableSummary = Object.keys(data).reduce((acc, tableName) => {
    acc.push({ tableName: tableName, entries: data[tableName].length });
    return acc;
  }, []);
  return allTableSummary;
};

exports.getTableSchema = async (tableName) => {
  const schema = await InternalDB.getSchema(tableName);
  return schema;
};

exports.getTableData = async (tableName) => {
  const data = await this.readDatabase();
  return data[tableName];
};

exports.createTable = async (tableName) => {
  const { db } = await import("./db.mjs");
  await db.read();
  db.data[tableName] = [];
  await db.write();
};

exports.deleteTable = async (tableName) => {
  const { db } = await import("./db.mjs");
  await db.read();
  delete db.data[tableName];
  await db.write();
};
