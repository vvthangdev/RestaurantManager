import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { deleteFoodById, getAll, getByIdAdmin, search } from "../../services/foodService";
import NotFound from "../../components/NotFound/NotFound";
import { toast, ToastContainer } from "react-toastify";
import classes from "./orderDetaiPage.module.css";
import Title from "../../components/Title/Title";
import Search from "../../components/Search/Search";
import Price from "../../components/Price/Price";
import { FaTrash, FaEdit } from 'react-icons/fa';
import HeaderFoodsAdminPage from "../../components/HeaderFoodsAdmin/HeaderAdmin";
import { deleteAdminById, getAllAdmins, searchAdmin } from "../../services/adminService";
import { deleteTableByTableNumber, getAllTables } from "../../services/tableService";
import { tab } from "@testing-library/user-event/dist/tab";
import { deleteOrderById, getAllOrderInfo, getAllOrders } from "../../services/orderService";


const OrderDetailPage = () => {
    const [orderInfor, setOrderInfor] = useState([]);
    const [reserTableInfo, setReserTableInfor] = useState([]);
    const [itemOrders, setItemOrders] = useState([]);
    const [foodNames, setFoodNames] = useState({}); // State để lưu tên món ăn
    const {searchTerm} = useParams();
    const getNameFood = async (itemId) => {
        const food = await getByIdAdmin(itemId);  // Giả sử getByIdAdmin trả về food object
        return food.name;
    }

    useEffect(() => {
        const loadOrders = async () => {
            const order = await getAllOrderInfo(searchTerm);
            setOrderInfor(order);
            setReserTableInfor(order["reserTableInfo"]);
            setItemOrders(order["itemOrders"]);

            // Lấy tên tất cả món ăn
            const names = {};
            for (const item of order["itemOrders"]) {
                names[item.item_id] = await getNameFood(item.item_id);
            }
            setFoodNames(names); // Cập nhật tên món ăn vào state
        };

        loadOrders();
    }, [searchTerm]);

    const formattedDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleString('vi-VN', {
            hour: '2-digit',
            minute: '2-digit',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    return (
        <>
            <HeaderFoodsAdminPage />
            <div className={classes.container}>
                <div className={classes.list}>
                    <Title title="Chi tiết đơn hàng" margin="1rem auto" />
                    <div>
                        <div className={classes.table}>
                            <div className={classes.title}>Bàn</div>
                            <div className={classes.list_item_title_table}>
                                <div>Mã đơn hàng</div>
                                <div>Bàn</div>
                                <div>Bắt đầu</div>
                                <div>Kết thúc</div>
                            </div>
                            {reserTableInfo &&
                                reserTableInfo.map(reser => (
                                    <div key={reser.id} className={classes.list_item_table}>
                                        <div>{reser.reservation_id}</div>
                                        <div>{reser.table_id}</div>
                                        <div>{formattedDate(reser.start_time)}</div>
                                        <div>{formattedDate(reser.end_time)}</div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className={classes.items}>
                            <div className={classes.title}>Món ăn</div>
                            <div className={classes.list_item_title_items}>
                                <div>Mã đơn hàng</div>
                                <div>Mã món ăn</div>
                                <div>Tên món ăn</div>
                                <div>Số lượng</div>
                            </div>
                            {itemOrders &&
                                itemOrders.map(item => (
                                    <div key={item.id} className={classes.list_item_items}>
                                        <div>{item.order_id}</div>
                                        <div>{item.item_id}</div>
                                        <div>{foodNames[item.item_id]}</div> {/* Render tên món ăn từ state */}
                                        <div>{item.quantity}</div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default OrderDetailPage;
