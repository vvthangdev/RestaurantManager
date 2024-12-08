
const express = require("express");
const authMiddelware = require("../middlewares/auth.middleware");
const router = express.Router();
const contactController = require("../controllers/contact.controller.js");

router.post('/create', contactController.createContact);

router.get('/getAll', contactController.getAllContacts);
router.get('/getContactById/:contactId', contactController.getContactById);
router.get('/deleteContactById/:contactId', contactController.deleteContactById);
// router.post('/create', authMiddelware.authenticateToken, contactController.createContact);

// router.get('/getAll', authMiddelware.authenticateToken, authMiddelware.adminRoleAuth, contactController.getAllContacts);

module.exports = router;