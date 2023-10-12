const express = require("express");

const controllers = require("../controllers");

const router = express.Router();

router.get("/databaseSummary", controllers.databaseSummary);
router.get("/getTable/:tableName", controllers.getTable);
router.get("/getTableSchema/:tableName", controllers.getTableSchema);
router.post("/createTable/:tableName", controllers.createTable);
router.delete("/deleteTable/:tableName", controllers.deleteTable);

module.exports = router;