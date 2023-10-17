import { Router } from "express";

import * as Controllers from "../controllers/index.js";

const router = Router();

router.get("/databaseSummary", Controllers.databaseSummary);
router.get("/getTable/:tableName", Controllers.getTable);
router.get("/getTableSchema/:tableName", Controllers.getTableSchema);
router.post("/createTable/:tableName", Controllers.createTable);
router.delete("/deleteTable/:tableName", Controllers.deleteTable);
router.post("/addRow/:tableName", Controllers.addRow);

export default router;