const { UNAUTHORIZED } = require('../constants/httpStatus.js');
const authMid = require('./auth.mid.js');  // Đã sửa từ 'requrie' thành 'require'

const adminMid = (req, res, next) => {
  // Kiểm tra xem req.user có tồn tại không, tránh lỗi nếu không có thông tin người dùng
  if (!req.user || !req.user.isAdmin) {
    return res.status(UNAUTHORIZED).send({ message: 'Bạn không có quyền truy cập' });
  }

  // Đây là nơi bạn có thể kiểm tra nếu cần
  return next();  // Chuyển sang middleware tiếp theo nếu mọi thứ ổn
};

module.exports = [authMid, adminMid];  // Export mảng middleware để sử dụng trong route
