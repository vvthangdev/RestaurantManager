const express = require("express");
const app = express();
require("dotenv").config();
const userRoutes = require("./routes/user.routes"); // Import route user
const sequelize = require("./config/db.config.js");
const foodRoutes = require("./routes/food.routes.js")
const cors = require('cors');


app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000']
}));

app.use(express.json()); // Parse các request có nội dung dạng JSON
app.use(express.urlencoded({ extended: true })); // Parse các request có nội dung dạng URL-encoded
app.use("/", userRoutes);
app.use("/api", foodRoutes)
// Kết nối database và chạy server
const PORT = process.env.PORT || 5000;



sequelize
  .sync()
  .then(() => {
    console.log("Database & tables created!");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}/`);
    });
  })
  .catch((err) => console.error("Unable to connect to the database:", err));
