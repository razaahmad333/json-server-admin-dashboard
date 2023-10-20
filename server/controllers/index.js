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
    res.status(200).json(tableSchema);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
}

export async function getTable(req, res) {
  try {
    const tableName = req.params.tableName;
    const tableData = await DatabaseUtils.getTableData(tableName);
    const tableSchema = await DatabaseUtils.getTableSchema(tableName);
    res.json({ tableData, tableSchema });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
}

export async function createTable(req, res) {
  try {
    // sleep for 5 seconds
    const tableName = req.params.tableName;
    await DatabaseUtils.createTable(tableName);
    res.status(200).json({ msg: "Table created successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
}

export async function deleteTable(req, res) {
  try {
    const tableName = req.params.tableName;
    await DatabaseUtils.deleteTable(tableName);
    res.status(200).json({ msg: "Table deleted successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
}

export async function addRow(req, res) {
  try {
    const tableName = req.params.tableName;
    const values = req.body;
    await DatabaseUtils.addRow(tableName, values);
    res.status(200).json({ msg: "Row added successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
}

export async function deleteRow(req, res) {
  try {
    const tableName = req.params.tableName;
    const id = req.params.id;
    await DatabaseUtils.deleteRow(tableName, id);
    res.status(200).json({ msg: "Row deleted successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
}

export async function editRow(req, res) {
  try {
    const tableName = req.params.tableName;
    const id = req.params.id;
    const values = req.body;
    await DatabaseUtils.editRow(tableName, id, values);
    res.status(200).json({ msg: "Row edited successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
}