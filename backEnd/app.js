const express = require("express");
const cors = require("cors");
const app = express();
// const { Server } = require("socket.io");
// const io = new Server(server);
const { createServer } = require("node:http");
const server = createServer(app);

// const Message = require("./models/message.js");
// const conversationService = require("./services/conversation.service.js");
require("dotenv").config();
const sequelize = require("./config/db.config.js");
const foodRoutes = require("./routes/food.routes.js");
const adminRoutes = require("./routes/admin.routes.js");

// const userRoutes = require("./routes/user.routes"); // Import route user

const tableRouter = require("./routes/table.routes.js");
const orderRouter = require("./routes/order.routes.js");
const contactRouter = require("./routes/contact.routes.js");
// const itemRouter = require("./routes/item.routes.js");
const itemOrdRouter = require("./routes/item_order.routes.js");
// const itemCategoryRouter = require("./routes/item_category.routes.js");
// const adminRouter = require("./routes/admin.routes.js")

const orderUserInfo = require("./models/order_user_info.model.js");
app.use(cors());
app.use(express.json()); // Parse các request có nội dung dạng JSON
app.use(express.urlencoded({ extended: true })); // Parse các request có nội dung dạng URL-encoded
// app.use("/", userRoutes);
app.use("/api", foodRoutes);
app.use("/api", adminRoutes);

// app.use("/api/auth", userRoutes);

app.use("/tables", tableRouter);
app.use("/orders", orderRouter);
// app.use("/item", itemRouter);
app.use("/item-order", itemOrdRouter);
app.use("/contacts", contactRouter);
// app.use("/item-category", itemCategoryRouter);
// app.use("/admin", adminRouter)

const PORT = process.env.PORT || 5000;
sequelize
  .sync()
  // nếu muốn đồng bộ lại db bỏ comment dòng này
  // .sync({ alter: true })
  .then(() => {
    console.log("Database & tables created!");
    server.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}/`);
    });
  })
  .catch((err) => console.error("Unable to connect to the database:", err));
