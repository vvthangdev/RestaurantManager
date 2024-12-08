const express = require("express");
const userMiddleware = require("../middlewares/user.middleware.js");
const tableController = require("../controllers/table.controller.js");
// const userUtil = require("../utils/user.util.js");
const authMiddware = require("../middlewares/auth.middleware.js");

const router = express.Router();

router.get("/", tableController.getAllTables);

// router.use(authMiddware.authenticateToken);

// router.use(authMiddware.adminRoleAuth);

router.post("/create-table", tableController.createTable);

router.put("/update-table/:table_number", tableController.updateTable);
router.get("/get-table-by-number/:table_number", tableController.getTableByTableNumber);

router.delete("/delete-table/:table_number", tableController.deleteTable);

module.exports = router;
