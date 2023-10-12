const helpers = require("../helpers");

exports.databaseSummary = async (req, res) => {
  try {
    const summary = await helpers.getDatabaseSummary();
    res.json(summary);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
};

exports.getTableSchema = async (req, res) => {
  try {
    const tableName = req.params.tableName;
    const tableSchema = await helpers.getTableSchema(tableName);
    res.json(tableSchema);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
}

exports.getTable = async (req, res) => {

  try {
    const tableName = req.params.tableName;
    const tableData = await helpers.getTableData(tableName);
    res.json(tableData);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }

}

exports.createTable = async (req, res) => { 
  try {
    const tableName = req.params.tableName;
    await helpers.createTable(tableName);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
}

exports.deleteTable = async (req, res) => {
  try {
    const tableName = req.params.tableName;
    await helpers.deleteTable(tableName);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
}