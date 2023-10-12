exports.getDB = async () => {
  const { __db } = await import("./index.mjs");
  return __db;
};

exports.readDatabase = async () => {
  const __db = await this.getDB();
  await __db.read();
  return __db.data;
};

exports.getSchema = async (tableName) => {
  const data = await this.readDatabase();
  return data[tableName];
};

exports.saveSchema = async (tableName, schema) => {
  const __db = await this.getDB();
  await __db.read();
  __db.data[tableName] = schema;
  await __db.write();
};

exports.saveSchemaInBulk = async (schemas, initial = false) => {
  const __db = await this.getDB();
  await __db.read();

  if (!__db.data) {
    __db.data = {};
  }
  schemas.forEach(({ tableName, schema }) => {
    if (initial && __db.data[tableName]) {
      return;
    }
    if (!initial && __db.data[tableName]) {
      schema = [...new Set([...__db.data[tableName], ...schema])];
      return;
    }
    __db.data[tableName] = schema;
  });
  await __db.write();
};
