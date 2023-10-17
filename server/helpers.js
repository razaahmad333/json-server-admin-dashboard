import { getSchema } from "./internalDB/helpers.js";
import  db  from "./db.js";


export async function readDatabase() {
  await db.read();
  return db.data;
}

export async function getDatabaseSummary() {
  const data = await readDatabase();
  const allTableSummary = Object.keys(data).reduce((acc, tableName) => {
    acc.push({ tableName: tableName, entries: data[tableName].length });
    return acc;
  }, []);
  return allTableSummary;
}

export async function getTableSchema(tableName) {
  const schema = await getSchema(tableName);
  return schema;
}

export async function getTableData(tableName) {
  const data = await readDatabase();
  return data[tableName];
}

export async function createTable(tableName) {
  await db.read();
  db.data[tableName] = [];
  await db.write();
}

export async function deleteTable(tableName) {
  await db.read();
  delete db.data[tableName];
  await db.write();
}
