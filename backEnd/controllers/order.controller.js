const OrderDetail = require("../models/order_detail.model");
const orderService = require("../services/order.service");
const userService = require("../services/user.service");
const sequelize = require("../config/db.config"); // Đảm bảo import sequelize để sử dụng transaction
const { createOrderUserInfo } = require("../services/order_user_info.service");
const OrderUserInfo = require("../models/order_user_info.model");
const ReserTable = require("../models/reservation_table.model");
const ItemOrders = require("../models/item_order.model");
const emailService = require("../services/sendmail.service");

const { Sequelize } = require("sequelize");

const getAllOrders = async (req, res) => {
  try {
    const orderDetail = await OrderDetail
      .findAll
      // {
      //   include: [{
      //     model: OrderUserInfo,
      //     foreignKey: 'order_detail_id', // Đặt rõ ràng khóa ngoại trong truy vấn
      //     attributes: ['name'],  // Chỉ lấy trường 'name' từ bảng OrderUserInfo
      //   }]
      // }
      ();
    res.json(orderDetail);
  } catch (error) {
    res.status(500).json({ error: "Error fetching orders" });
  }
};

const getAllOrdersNew = async (req, res) => {
  try {
    const orderDetail = await sequelize.query(
      `
            SELECT 
                od.id AS id,
                od.time,
                od.type,
                od.status,
                od.num_people,
                oui.name AS name,
                oui.phone AS phone,
                oui.email AS email
            FROM 
                order_detail AS od
            JOIN 
                order_user_info AS oui ON od.id = oui.order_detail_id
        `,
      {
        type: Sequelize.QueryTypes.SELECT,
      }
    );
    res.json(orderDetail);
  } catch (error) {
    res.status(500).json({ error: "Error fetching orders" });
  }
};

const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const orderDetail = await OrderDetail.findOne({
      where: { id: orderId },
    });
    res.json(orderDetail);
  } catch (error) {}
};

const deleteOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const orderDetail = await OrderDetail.findOne({
      where: { id: orderId },
    });
    await OrderDetail.destroy({
      where: { id: orderId },
    });
    res.json(orderDetail);
  } catch (error) {
    console.log("Error deleting order: ", error);
    throw new Error("An error occurred while deleting the order.");
  }
};

const getAllOrdersOfCustomer = async (req, res) => {
  try {
    const customer_id = 0;
    const orders = await OrderDetail.findAll({ customer_id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Error fetching orders" });
  }
};

const createOrder = async (req, res) => {
  console.log(3);
  console.log(req.body);
  const transaction = await sequelize.transaction(); // Khởi tạo transaction
  try {
    let { email, name, phone, start_time, num_people, foods, ...orderData } =
      req.body; // Số lượng khách và danh sách các món hàng

    // Tạo order mới trong transaction
    const newOrder = await orderService.createOrder(
      {
        customer_id: 0,
        time: start_time,
        num_people, // Lưu số lượng khách vào order
        ...orderData,
      },
      { transaction } // Pass transaction vào trong service
    );
    //await createOrderUserInfo({...userInfo, 'order_detail_id': customerId});
    // Lấy thời gian bắt đầu từ orderData
    const startTime = newOrder.time; // Giả sử thời gian bắt đầu là time trong orderData

    // Cộng thêm thời gian từ biến môi trường (mặc định là 120 phút nếu không có giá trị trong ENV)
    const offsetMinutes = parseInt(process.env.END_TIME_OFFSET_MINUTES) || 120;
    const endTime = new Date(startTime);
    endTime.setMinutes(endTime.getMinutes() + offsetMinutes);

    // Chuyển startTime và endTime thành dạng chuỗi ISO chuẩn
    const startTimeFormatted = startTime.toISOString();
    const endTimeFormatted = endTime.toISOString();

    // Kiểm tra bàn trống trong khoảng thời gian người dùng chọn và sử dụng lock
    const availableTables = await orderService.checkAvailableTables(
      startTimeFormatted,
      endTimeFormatted,
      { transaction }
    );

    if (availableTables && availableTables.length > 0) {
      // Tính toán số bàn cần thiết để phục vụ tất cả khách
      let remainingPeople = num_people;
      let reservedTables = [];
      let totalCapacity = 0;

      // Duyệt qua các bàn có sẵn và tính tổng sức chứa
      for (let table of availableTables) {
        totalCapacity += table.capacity;

        if (remainingPeople > 0) {
          const peopleAssignedToTable = Math.min(
            remainingPeople,
            table.capacity
          );
          remainingPeople -= peopleAssignedToTable;
          reservedTables.push({
            reservation_id: newOrder.id,
            table_id: table.table_number,
            people_assigned: peopleAssignedToTable,
            start_time: startTime,
            end_time: endTime,
          });
        }

        if (remainingPeople <= 0) {
          break;
        }
      }

      // Kiểm tra nếu tổng sức chứa không đủ cho tất cả khách
      if (remainingPeople > 0) {
        // Không đủ bàn
        await transaction.rollback(); // Rollback transaction nếu không đủ bàn
        res
          .status(400)
          .json({ error: "Not enough available tables to seat all guests." });
        return; // Không lưu vào DB
      }

      // Nếu đủ bàn, lưu thông tin reservation vào DB
      await orderService.createReservations(reservedTables, { transaction });

      // Nếu có món hàng, tạo item orders (mối quan hệ giữa món hàng và đơn hàng)
      if (foods && foods.length > 0) {
        let itemOrders = foods.map((food) => ({
          item_id: food.id,
          quantity: food.quantity,
          order_id: newOrder.id,
        }));

        // Lưu thông tin vào bảng item_order
        await orderService.createItemOrders(itemOrders, { transaction });
      }
      if (name) {
        let userOrderInfo = await createOrderUserInfo({
          order_detail_id: newOrder.id,
          name: name,
          email: email,
          phone: phone,
        });
      }
      console.log(email);

      await emailService.sendOrderConfirmationEmail(email, name, newOrder);
      // Commit transaction khi tất cả các thao tác thành công
      await transaction.commit();

      // Trả về kết quả order đã tạo
      res.status(201).json({
        name: name,
        phone: phone,
        newOrder,
      });
    } else {
      // Nếu không có bàn trống
      await transaction.rollback(); // Rollback transaction nếu không có bàn trống
      res
        .status(400)
        .json({ error: "No available tables for the selected time" });
    }
  } catch (error) {
    // Xử lý lỗi và rollback transaction
    console.error("Error creating order:", error);
    await transaction.rollback(); // Rollback transaction nếu có lỗi
    res.status(500).json({ error: "Error creating order" });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { id, ...otherFields } = req.body; // Adjust as needed to accept relevant fields
    const { status } = req.body;
    if (!id) {
      return res.status(400).send("Order number required.");
    }
    if (!otherFields || (Object.keys(otherFields).length === 0 && !status)) {
      return res.status(400).send("No fields to update.");
    }
    // Update the user information in the database
    const updatedOrder = await orderService.updateOrder(id, {
      ...otherFields, // Spread other fields if there are additional updates
    });

    if (!updatedOrder) {
      return res.status(404).send("Order not found!");
    }
    res.json({
      status: "SUCCESS",
      message: "Order updated successfully!",
      Order: updatedOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error updating order" });
  }
};

const updateOrderNew = async (req, res) => {
  try {
    const { id } = req.params; // Adjust as needed to accept relevant fields
    const data = req.body;
    if (!id) {
      return res.status(400).send("Order number required.");
    }
    // if (!otherFields || Object.keys(otherFields).length === 0 && !status) {
    //   return res.status(400).send("No fields to update.");
    // }
    // Update the user information in the database
    const updatedOrder = await orderService.updateOrderNew(id, data);

    if (!updatedOrder) {
      return res.status(404).send("Order not found!");
    }
    res.json({
      status: "SUCCESS",
      message: "Order updated successfully!",
      Order: updatedOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error updating order" });
  }
};

const updateEvaluate = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const { star, comment } = req.body;
    const updatedOrder = await orderService.updateOrder(orderId, {
      star,
      comment,
    });
    if (!updatedOrder) {
      return res.status(404).send("Order not found");
    }
    return res.status(200).json({
      status: "SUCCESS",
      updatedOrder,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Error when update evaluate" });
  }
};

const createShipOrder = async (req, res) => {
  try {
    const { userInfo, status, type, orderItems } = req.body;
    const customerId = req.user.id;
    // create order_detail for ship
    const newOrder = await orderService.createOrder({
      status,
      type,
      customer_id: customerId,
    });
    try {
      // create orderuserinfo
      await createOrderUserInfo({ ...userInfo, order_detail_id: customerId });
      //create itemOrders
      await orderService.createItemOrders(
        orderItems.map((item) => ({
          item_id: item.item_id,
          customer_id: customerId,
          quantity: item.quantity,
          order_id: newOrder.id,
        }))
      );
    } catch (error) {
      newOrder.destroy();
      res.status(500).json({ error: "Error happend when create ship order 1" });
    }
    res.json({
      status: "Success",
      message: "Create ship order successfully",
      data: newOrder,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Error happend when create ship order 2" });
  }
};

// const getAllOrderInfo = async (req, res) => {
//   try {
//     const { id } = req.body;  // Dữ liệu id lấy từ body của request

//     // Kiểm tra xem id có hợp lệ không
//     if (!id) {
//       return res.status(400).json({ error: "Order ID is required" });
//     }

//     // Tìm thông tin liên quan đến đặt bàn
//     const reserTableInfo = await ReserTable.findAll({
//       where: { reservation_id: id },
//     });

//     // Tìm các đơn hàng liên quan đến order_id
//     const itemOrders = await ItemOrders.findAll({
//       where: { order_id: id },
//     });

//     // Nếu không có dữ liệu trả về, trả lại thông báo không tìm thấy
//     if (!reserTableInfo.length && !itemOrders.length) {
//       return res.status(404).json({ error: "No data found for this order ID" });
//     }

//     // Trả về thông tin tìm được
//     return res.status(200).json({
//       reserTableInfo,
//       itemOrders
//     });

//   } catch (error) {
//     // Xử lý lỗi nếu có
//     console.error("Error fetching order info:", error);
//     return res.status(500).json({ error: "Error fetching all order info!" });
//   }
// };
const getAllOrderInfo = async (req, res) => {
  try {
    const { id } = req.params; // Dữ liệu id lấy từ body của request

    // Kiểm tra xem id có hợp lệ không
    if (!id) {
      return res.status(400).json({ error: "Order ID is required" });
    }

    // Tìm thông tin liên quan đến đặt bàn
    const reserTableInfo = await ReserTable.findAll({
      where: { reservation_id: id },
    });

    // Tìm các đơn hàng liên quan đến order_id
    const itemOrders = await ItemOrders.findAll({
      where: { order_id: id },
    });

    // Nếu không có dữ liệu trả về, trả lại thông báo không tìm thấy
    if (!reserTableInfo.length && !itemOrders.length) {
      return res.status(404).json({ error: "No data found for this order ID" });
    }

    // Trả về thông tin tìm được
    return res.status(200).json({
      reserTableInfo,
      itemOrders,
    });
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error("Error fetching order info:", error);
    return res.status(500).json({ error: "Error fetching all order info!" });
  }
};
module.exports = {
  getAllOrders,
  createOrder,
  updateOrder,
  createShipOrder,
  updateEvaluate,
  getAllOrdersOfCustomer,
  updateOrderNew,
  getOrderById,
  deleteOrderById,
  getAllOrdersNew,
  getAllOrderInfo,
};
