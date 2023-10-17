import * as InternalDBUtils from "../internalDB/helpers.js";
import  { readDatabase, writeDatabase } from "../db.js";

export async function getDatabaseSummary() {
  const data = await readDatabase();
  const allTableSummary = Object.keys(data).reduce((acc, tableName) => {
    acc.push({ tableName: tableName, entries: data[tableName].length });
    return acc;
  }, []);
  return allTableSummary;
}

export async function getTableSchema(tableName) {
  const schema = await InternalDBUtils.getSchema(tableName);
  return schema;
}

export async function getTableData(tableName) {
  const data = await readDatabase();
  return data[tableName];
}

export async function createTable(tableName) {
  const data = await readDatabase();
  data[tableName] = [];
  await writeDatabase(data);
}

export async function deleteTable(tableName) {
    const data = await readDatabase();
    delete data[tableName];
    await writeDatabase(data);
    await InternalDBUtils.deleteSchema(tableName);
}

export async function addRow(tableName, row) {
  const data = await readDatabase();
  data[tableName].push(row);
  await writeDatabase(data);
  await InternalDBUtils.updateSchema(tableName, Object.keys(row));
}