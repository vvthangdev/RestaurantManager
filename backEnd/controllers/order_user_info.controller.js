const OrderDetail = require("../models/order_detail.model");
const orderService = require("../services/order.service");
const userService = require("../services/user.service");
const sequelize = require("../config/db.config"); // Đảm bảo import sequelize để sử dụng transaction
const { createOrderUserInfo } = require("../services/order_user_info.service");
const OrderUserInfo = require("../models/order_user_info.model");
const getAllOrders = async (req, res) => {
  try {
    const orderDetail = await OrderUserInfo.findAll({
        include: [
            {
                model: OrderDetail,
                as: 'order_detail' // Phải khớp với alias đã định nghĩa
            }
        ]
    });
    console.log(orderDetail);
    res.json(orderDetail);
  } catch (error) {
    res.status(500).json({ error: "Error fetching orders" });
  }
};

module.exports = {
    getAllOrders,
}