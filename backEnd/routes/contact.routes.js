
const express = require("express");
const authMiddelware = require("../middlewares/auth.middleware");
const router = express.Router();
const contactController = require("../controllers/contact.controller.js");
const admin = require("../middlewares/admin.mid.js");
const auth = require('../middlewares/auth.mid.js');
router.post('/create', contactController.createContact);

router.get('/getAll', auth, contactController.getAllContacts);
router.get('/getContactById/:contactId', auth, contactController.getContactById);
router.delete("/deleteContactById/:contactId", auth, contactController.deleteContactById);
// router.post('/create', authMiddelware.authenticateToken, contactController.createContact);

// router.get('/getAll', authMiddelware.authenticateToken, authMiddelware.adminRoleAuth, contactController.getAllContacts);

module.exports = router;