const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config"); 
const OrderDetail = require("./order_detail.model");

const OrderUserInfo = sequelize.define (
    'OrderUserInfo',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        order_detail_id: {
            type: DataTypes.INTEGER,
            unique: true,
            references: {
                model: OrderDetail,
                key: 'id'
            },
            onDelete: "CASCADE"
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING(15),
            allowNull: false,
        },
        
    },
    {
        charset: 'utf8mb4', // Mã hóa UTF-8 cho bảng
        collate: 'utf8mb4_unicode_ci', // Chỉ định phương pháp so sánh chuỗi
        tableName: 'order_user_info', // Tên bảng trong cơ sở dữ liệu
        timestamps: false, // Nếu không muốn sử dụng `createdAt` và `updatedAt`
    }
);


module.exports = OrderUserInfo;