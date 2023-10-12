const InternalDB = require("./internalDB/helpers.js");

exports.populateInternalDBWithTableSchema = async (jsonFileData) => {
  const tableNames = Object.keys(jsonFileData);
  const schemas = tableNames.map((tableName) => {
    const tableSchema = Object.keys(jsonFileData[tableName][0]);
    return { tableName, schema: tableSchema };
  });
  await InternalDB.saveSchemaInBulk(schemas);
};
