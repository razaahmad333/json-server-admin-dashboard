import * as DatabaseUtils from "../databaseUtils/index.js";

export async function databaseSummary(req, res) {
  try {
    const summary = await DatabaseUtils.getDatabaseSummary();
    res.json(summary);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
}

export async function getTableSchema(req, res) {
  try {
    const tableName = req.params.tableName;
    const tableSchema = await DatabaseUtils.getTableSchema(tableName);
    res.json(tableSchema);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
}

export async function getTable(req, res) {

  try {
    const tableName = req.params.tableName;
    const tableData = await DatabaseUtils.getTableData(tableName);
    res.json(tableData);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }

}

export async function createTable(req, res) { 
  try {
    const tableName = req.params.tableName;
    await DatabaseUtils.createTable(tableName);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
}

export async function deleteTable(req, res) {
  try {
    const tableName = req.params.tableName;
    await deleteTable(tableName);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
}