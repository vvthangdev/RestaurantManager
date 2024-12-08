// const express = require("express");
// const userMiddleware = require("../middlewares/user.middleware.js");
// const userController = require("../controllers/user.controller.js");
// const userUtil = require("../utils/user.util.js");
// const authMiddware = require("../middlewares/auth.middleware.js");

// const router = express.Router();

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


// //for data_samples
// const genarateTokenResponse = user => {
//     const token = jwt.sign({
//             id: user.id,
//             email: user.email,
//         },
//         'Hello World',
//         {
//             expiresIn: '30d'
//         }
//     );

//     return{
//         id: user.id,
//         email: user.email,
//         name: user.name,
//         address: user.address,
//         token,
//         errorId: 0,
//     };
// };

// // router.post('/login', (req, res) => {
// //     console.log(req.body);
// //     const {email, password} = req.body;
// //     const user = sample_users.find(
// //         user => user.email === email && user.password === password
// //     );

// //     if(user){
// //         res.send(genarateTokenResponse(user));
// //         return;
// //     }

// //     res.status(BAD_REQUEST).send({ errorMessage: 'Username or password is invalid',
// //                                     errorId: 1,
// //                                 });
// // });

// // router.get('/dashboard', authMiddleware, (req, res) => {
// //     res.json({
// //         message: "HELLO WORLD",
// //         user: req.user
// //     });
// // });
// module.exports = router;
