const express = require("express");
const userMiddleware = require("../middlewares/user.middleware.js");
const orderController = require("../controllers/order.controller.js");
const orderUserInfo = require("../controllers/order_user_info.controller.js");
const authMiddware = require("../middlewares/auth.middleware.js");
const { route } = require("./user.routes.js");
const OrderUserInfo = require("../models/order_user_info.model.js");
// const userUtil = require("../utils/user.util.js");
// const authMiddware = require("../middlewares/auth.middleware.js");

const router = express.Router();

router.post("/create-order", orderController.createOrder);

// router.use(authMiddware.authenticateToken);

// router.get("/", authMiddware.adminRoleAuth,orderController.getAllOrders);
router.get("/", orderController.getAllOrders);

router.get('/get-all-orders',  orderController.getAllOrdersOfCustomer);
router.get('/get_all_orders',  orderUserInfo.getAllOrders);
router.get('/get-order-byId/:orderId',  orderController.getOrderById);
router.delete('/delete-order-byId/:orderId',  orderController.deleteOrderById);

router.put("/update-evaluate/:id", orderController.updateOrderNew);


module.exports = router;
