import { Router } from "express";

import { databaseSummary, getTable, getTableSchema, createTable, deleteTable } from "../controllers/index.js";

const router = Router();

router.get("/databaseSummary", databaseSummary);
router.get("/getTable/:tableName", getTable);
router.get("/getTableSchema/:tableName", getTableSchema);
router.post("/createTable/:tableName", createTable);
router.delete("/deleteTable/:tableName", deleteTable);

export default router;