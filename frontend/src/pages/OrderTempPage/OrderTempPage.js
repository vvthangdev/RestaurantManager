
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FaTrash, FaEdit, FaSave } from "react-icons/fa";
import Header from "../../components/Header/Header";
import Title from "../../components/Title/Title";
import classes from "./orderTempPage.module.css";
import NotFound from "../../components/NotFound/NotFound";
import Button from "../../components/Button/Button";

const OrderTempPage = () => {
    const navigate = useNavigate();
    const [foods, setFoods] = useState(() => {
        const foodsTemp = localStorage.getItem("foods");
        return foodsTemp ? JSON.parse(foodsTemp) : [];
    });

    const [editFoodId, setEditFoodId] = useState(null); // ID món đang chỉnh sửa
    const [newQuantity, setNewQuantity] = useState(""); // Số lượng mới

    // Hàm xóa món ăn
    const deleteFood = (foodToDelete) => {
        const updatedFoods = foods.filter(food => food.id !== foodToDelete.id);
        setFoods(updatedFoods);
        localStorage.setItem("foods", JSON.stringify(updatedFoods));
    };

    // Hàm bắt đầu chỉnh sửa
    const startEdit = (food) => {
        setEditFoodId(food.id);
        setNewQuantity(food.quantity); // Đặt số lượng hiện tại vào input
    };

    // Hàm lưu cập nhật
    const saveEdit = (food) => {
        const updatedFoods = foods.map(f => {
            if (f.id === food.id) {
                return { ...f, quantity: newQuantity }; // Cập nhật số lượng
            }
            return f;
        });

        setFoods(updatedFoods);
        localStorage.setItem("foods", JSON.stringify(updatedFoods));
        setEditFoodId(null); // Kết thúc chỉnh sửa
        setNewQuantity("");
    };

    return (
        <>
            <Header />
            <div className={classes.container}>
                <div className={classes.list}>
                    <Title title="Món bạn đã đặt" margin="1rem auto" />
                    <div className={classes.list_item_title}>
                        <div>Tên món</div>
                        <div>Số lượng</div>
                        <div>Sửa/Xóa</div>
                    </div>

                    {foods && foods.length > 0 ? (
                        foods.map(food => (
                            <div key={food.id} className={classes.list_item}>
                                <div>{food.name}</div>

                                {/* Hiển thị ô nhập liệu khi chỉnh sửa */}
                                <div>
                                    {editFoodId === food.id ? (
                                        <input
                                            type="number"
                                            value={newQuantity}
                                            onChange={(e) => setNewQuantity(e.target.value)}
                                            className={classes.input}
                                        />
                                    ) : (
                                        <span>{food.quantity}</span>
                                    )}
                                </div>

                                <div className={classes.actions}>
                                    {editFoodId === food.id ? (
                                        <Link onClick={() => saveEdit(food)}>
                                            <FaSave className={classes.save} />
                                        </Link>
                                    ) : (
                                        <Link onClick={() => startEdit(food)}>
                                            <FaEdit className={classes.edit} />
                                        </Link>
                                    )}
                                    <Link onClick={() => deleteFood(food)}>
                                        <FaTrash className={classes.delete} />
                                    </Link>
                                </div>
                                
                            </div>
                            
                        ))
                    ) : (
                        <NotFound
                            linkRoute="/menu"
                            linkText="Trở về trang Thực đơn"
                            message="Bạn chưa chọn món nào cả!"
                        />
                    )}
                    <div className={classes.btn}> 
                                    <Button text = "Đặt bàn" onClick={() => navigate("/order")}/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderTempPage;
