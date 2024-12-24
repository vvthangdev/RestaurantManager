const nodemailer = require("nodemailer");

// Cấu hình Nodemailer sử dụng SMTP của Gmail
const transporter = nodemailer.createTransport({
  service: "gmail", // Dịch vụ Gmail
  host: "smtp.gmail.com", // SMTP server của Gmail
  port: 465, // Cổng SMTP SSL của Gmail
  secure: true, // Dùng kết nối an toàn (SSL)
  auth: {
    user: process.env.EMAIL_USER, // Email người gửi (được lưu trong .env)
    pass: process.env.EMAIL_PASS, // Mật khẩu email người gửi hoặc App Password (được lưu trong .env)
  },
});

// Hàm gửi email xác nhận đơn hàng
const sendOrderConfirmationEmail = async (email, name, order) => {
  // Cấu trúc email
  const mailOptions = {
    from: process.env.EMAIL_USER, // Email người gửi
    to: email, // Email người nhận
    subject: "Order Confirmation",
    html: `
      <h2>Hello ${name},</h2>
      <p>Your order has been successfully created!</p>
      <h3>Order Details:</h3>
      <ul>
        <li><strong>Order ID:</strong> ${order.id}</li>
        <li><strong>Number of people:</strong> ${order.num_people}</li>
        <li><strong>Time:</strong> ${order.time}</li>
      </ul>
      <p>Thank you for choosing us!</p>
    `, // Sử dụng HTML để tạo email đẹp hơn
  };

  // Gửi email
  try {
    await transporter.sendMail(mailOptions);
    console.log("Order confirmation email sent successfully.");
  } catch (error) {
    console.error("Error sending confirmation email:", error);
    throw error; // Throw error nếu gửi email thất bại
  }
};

module.exports = {
  sendOrderConfirmationEmail,
};
