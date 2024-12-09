const express = require("express");
const userMiddleware = require("../middlewares/user.middleware.js");
const tableController = require("../controllers/table.controller.js");
// const userUtil = require("../utils/user.util.js");
const authMiddware = require("../middlewares/auth.middleware.js");
const admin = require("../middlewares/admin.mid.js");
const auth = require('../middlewares/auth.mid.js');
const router = express.Router();

router.get("/", auth, tableController.getAllTables);

// router.use(authMiddware.authenticateToken);

// router.use(authMiddware.adminRoleAuth);

router.post("/create-table", auth, tableController.createTable);

router.put("/update-table/:table_number", auth, tableController.updateTable);
router.get("/get-table-by-number/:table_number", auth, tableController.getTableByTableNumber);

router.delete("/delete-table/:table_number", auth, tableController.deleteTable);

module.exports = router;
