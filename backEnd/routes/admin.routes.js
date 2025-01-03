const express = require("express");
const userMiddleware = require("../middlewares/user.middleware.js");
const adminController = require("../controllers/admin.controller.js");
const userUtil = require("../utils/user.util.js");
const authMiddware = require("../middlewares/auth.middleware.js");
const admin = require("../middlewares/admin.mid.js");
const auth = require('../middlewares/auth.mid.js');
const router = express.Router();
router.get("/admins", admin, adminController.getAllAdmins);
router.get("/admins/account/:adminId", admin, adminController.getAdminById);
router.get("/admins/search/:words", admin, adminController.searchAdmins);
router.delete("/admins/deleteaccount/:adminId", admin, adminController.deleteAdminById);
router.post("/admins/createaccount", admin, adminController.createNewAdmin);
router.put("/admins/updateaccount/:adminId", admin, adminController.updateAdminById);
router.post("/admins/login", adminController.login)
router.put("/admins/changePassword/:adminId", admin, adminController.changePassword)
// router.use(authMiddware.authenticateToken);
// router.use(authMiddware.adminRoleAuth);

// router.delete("/delete-user", adminController.adminDeleteUser);

// router.patch("/update-user", adminController.adminUpdateUser);

// router.get("/all-users", userController.getAllUsers);

// router.get(
//   "/user-info",
//   authMiddware.authenticateToken,
//   userController.userInfo
// );

// router.post(
//   "/signup",
//   userUtil.validateSignUpSignUp,
//   userMiddleware.checkUserExistsSignUp,
//   userController.signUp
// );

// router.post("/login", userMiddleware.checkUserExistLogin, userController.login);

// router.post("/refresh-token", userController.refreshToken);

// router.post("/logout", authMiddware.authenticateToken, userController.logout);
// // Route to update user information (requires authentication)
// router.patch(
//   "/update-user",
//   authMiddware.authenticateToken,
//   userController.updateUser
// );

// // Route to delete user (requires authentication)
// router.delete(
//   "/delete",
//   authMiddware.authenticateToken,
//   userController.deleteUser
// );

// router.post(
//   "/sendOTP",
//   userController.sendOTP
// )

module.exports = router;
