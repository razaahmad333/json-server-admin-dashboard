import { readDatabase as readExternalDatabase } from "../db.js";
import { __writeDatabase, __readDatabase } from "./index.js";

export async function getSchema(tableName) {
  const data = await __readDatabase();
  return data[tableName] || [];
}

export async function saveSchema(tableName, schema) {
  const data = await __readDatabase();
  data[tableName] = schema;
  await __writeDatabase(data);
}

export async function deleteSchema(tableName) {
  const data = await __readDatabase();
  delete data[tableName];
  await __writeDatabase(data);
}

export async function saveSchemaInBulk(schemas, initial = false) {
  let data = await __readDatabase();

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
  if (tableNames.length === 0) {
    return;
  } 

  const schemas = tableNames.map((tableName) => {
    const table = jsonFileData[tableName];
    const tableSchema = table.length > 0 ? Object.keys(jsonFileData[tableName][0]) : [];
    return { tableName, schema: tableSchema };
  });

  await saveSchemaInBulk(schemas, true);
}

function hasSchemaChanged(oldSchema, newSchema) {
  if(!oldSchema) {
    return true;
  }
  if(oldSchema.length !== newSchema.length) {
    return true;
  }
  const oldSchemaSet = new Set(oldSchema);
  const newSchemaSet = new Set(newSchema);
  const diff = new Set([...oldSchemaSet].filter(x => !newSchemaSet.has(x)));
  return diff.size > 0;
}

export async function updateSchema(tableName, schema) {
  const data = await __readDatabase();
  if(hasSchemaChanged(data[tableName], schema)) {
    data[tableName] = schema;
    await __writeDatabase(data);
  }
}