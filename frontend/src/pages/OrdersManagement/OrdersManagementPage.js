import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { deleteFoodById, getAll, search } from "../../services/foodService";
import NotFound from "../../components/NotFound/NotFound";
import { toast, ToastContainer } from "react-toastify";
import classes from "./ordersManagementPage.module.css";
import Title from "../../components/Title/Title";
import Search from "../../components/Search/Search";
import Price from "../../components/Price/Price";
import { FaTrash, FaEdit, FaSearch } from 'react-icons/fa';
import HeaderFoodsAdminPage from "../../components/HeaderFoodsAdmin/HeaderAdmin";
import { deleteAdminById, getAllAdmins, searchAdmin } from "../../services/adminService";
import { deleteTableByTableNumber, getAllTables } from "../../services/tableService";
import { tab } from "@testing-library/user-event/dist/tab";
import { deleteOrderById, getAllOrders } from "../../services/orderService";

const OrdersManagementPage = () => {
    const [orders, setOrders] = useState([]);
    const {searchTerm} = useParams();
    useEffect(() => {
        const loadOrders = getAllOrders();
        loadOrders.then(orders => {
            setOrders(orders);
        });
    }, [searchTerm]);

    const deleteOrder = async order => {
        const confirmed = window.confirm(`Bạn có muốn xóa đơn đặt bàn số ${order.id}?`);
        if(!confirmed) return;

        const data = await deleteOrderById(order.id);
        toast.success(`"${order.id}" Đã Được Xóa!`);
        setOrders(orders.filter(o => o.id !== order.id));
    };
    const formattedDate = (isoString) => {
        const date = new Date(isoString);
        const formattedDate =date.toLocaleString('vi-VN', {
            hour: '2-digit',
            minute: '2-digit',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        return formattedDate;
    }
    return (
        <>
            <HeaderFoodsAdminPage />
            <div className={classes.container}>
                <div className={classes.list}>

                    <Title title = "Quản lý bàn đặt" margin = "1rem auto" />
                    {/* <Search 
                        searchRoute="/admin/accounts/"
                        defaultRoute="/admin/accounts"
                        margin="1rem 0"
                        placeholder="Tìm kiếm nhân sự!"
                    />
                    <AdminsNotFound /> */}
                    {/* <Link to="/admin/addtable" className={classes.add_food}>
                        Thêm Bàn +
                    </Link> */}
                    <div className={classes.list_item_title}>
                        <div>Mã đơn hàng</div>
                        <div>Tên khách hàng</div>
                        <div>Số điện thoại</div>
                        <div>Email</div>
                        <di>Số lượng</di>
                        <div>Thời gian</div>
                        <div>Trạng thái</div>
                        <div>Sửa/Xóa</div>
                        <div>Chi tiết</div>
                    </div>
                    {orders &&
                        orders.map(order => (
                            <div key={order.id} className={classes.list_item}>
                                <div>{order.id}</div>
                                <div>{order.name}</div>
                                <div>{order.phone}</div>
                                <div>{order.email}</div>
                                <div>{order.num_people}</div>
                                <div>{formattedDate(order.time)}</div>
                                <div>{order.status}</div>
                                <div className={classes.actions}>
                                    <Link to={'/admin/editorder/' + order.id} ><FaEdit className={classes.edit}/></Link>
                                    <Link onClick={() => deleteOrder(order)} ><FaTrash className={classes.delete}/></Link>
                                </div>
                                <div className={classes.actions}>
                                    <Link to={'/admin/orderinfordetail/' + order.id} ><FaSearch className={classes.detail}/></Link>
                                </div>
                            </div>
                        ))
                        
                    }
                </div>
            </div>
            
        </>
    )
}

export default OrdersManagementPage;