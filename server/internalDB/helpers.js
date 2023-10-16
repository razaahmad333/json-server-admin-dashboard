import { readDatabase as readExternalDatabase } from "../db.js";
import { __writeDatabase, __readDatabase } from "./index.js";

export async function getSchema(tableName) {
  const data = await __readDatabase();
  return data[tableName];
}

export async function saveSchema(tableName, schema) {
  const data = await __readDatabase();
  data[tableName] = schema;
  await __writeDatabase(data);
}

export async function saveSchemaInBulk(schemas, initial = false) {
  let data = await __readDatabase();

  if (!data) {
    data = {};
  }
  schemas.forEach(({ tableName, schema }) => {
    if (initial && data[tableName]) {
      return;
    }
    if (!initial && data[tableName]) {
      schema = [...new Set([...data[tableName], ...schema])];
      return;
    }
    data[tableName] = schema;
  });
  await __writeDatabase(data);
}

export async function populateInternalDBWithTableSchema() {
  const jsonFileData = await readExternalDatabase();
  const tableNames = Object.keys(jsonFileData);
  const schemas = tableNames.map((tableName) => {
    const table = jsonFileData[tableName];
    const tableSchema = table.length > 0 ? Object.keys(jsonFileData[tableName][0]) : [];
    return { tableName, schema: tableSchema };
  });
  await saveSchemaInBulk(schemas, true);
}
