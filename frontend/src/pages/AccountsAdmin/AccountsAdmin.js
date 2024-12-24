import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { deleteFoodById, getAll, search } from "../../services/foodService";
import NotFound from "../../components/NotFound/NotFound";
import { toast, ToastContainer } from "react-toastify";
import classes from "./accountsAdmin.module.css";
import Title from "../../components/Title/Title";
import Search from "../../components/Search/Search";
import Price from "../../components/Price/Price";
import { FaTrash, FaEdit, FaShieldAlt } from 'react-icons/fa';
import HeaderFoodsAdminPage from "../../components/HeaderFoodsAdmin/HeaderAdmin";
import { deleteAdminById, getAllAdmins, searchAdmin } from "../../services/adminService";

const AccountsAdmin = () => {
    const [admins, setAdmins] = useState([]);
    const {searchTerm} = useParams();
    useEffect(() => {
        const loadAdmins = searchTerm ? searchAdmin(searchTerm) : getAllAdmins();
        loadAdmins.then(admins => {
            setAdmins(admins);
        })
    }, [searchTerm]);
    const AdminsNotFound = () => {
        if(admins && admins.length > 0) return;
        return (<NotFound linkRoute="/admin/accounts" linkText="Show All" />)
        // ) : (
        //     <NotFound linkRoute="/dashboard" linkText="Back to dashboard!" />
        // );
    };

    const deleteAdmin= async admin => {
        const confirmed = window.confirm(`Bạn có muốn xóa tài khoản của ${admin.name}?`);
        if(!confirmed) return;

        const data = await deleteAdminById(admin.id);
        toast.success(`"${admin.name}" Đã Được Xóa!`);
        setAdmins(admins.filter(a => a.id !== admin.id));
    };

    return (
        <>
            <HeaderFoodsAdminPage />
            <div className={classes.container}>
                <div className={classes.list}>

                    <Title title = "Quản lý nhân sự" margin = "1rem auto" />
                    <Search 
                        searchRoute="/admin/accounts/"
                        defaultRoute="/admin/accounts"
                        margin="1rem 0"
                        placeholder="Tìm kiếm nhân sự!"
                    />
                    <AdminsNotFound />
                    <Link to="/admin/addaccount" className={classes.add_food}>
                        Thêm Account +
                    </Link>
                    <div className={classes.list_item_title}>
                        {/* <div>Ảnh</div> */}
                        <div>Tên</div>
                        <div>Vị trí</div>
                        <div>Email</div>
                        <div>Số điện thoại</div>
                        <div>Sửa/Xóa</div>
                        <div>Đổi mật khẩu</div>
                    </div>
                    {admins &&
                        admins.map(admin => (
                            <div key={admin.id} className={classes.list_item}>
                                        {/* <img src={admin.image} alt={admin.name} /> */}
                                        <div>{admin.name}</div>
                                        <div>{admin.isAdmin ? "ADMIN" : "STAFF"}</div>
                                        <div>{admin.email}</div>
                                        <div className={classes.phone}>{admin.phone}</div>
                                        <div className={classes.actions}>
                                            <Link to={'/admin/editaccount/' + admin.id} ><FaEdit className={classes.edit}/></Link>
                                            <Link onClick={() => deleteAdmin(admin)} ><FaTrash className={classes.delete}/></Link>
                                        </div>
                                        <div className={classes.actions}>
                                            <Link to={'/admin/changepassword/' + admin.id} ><FaShieldAlt className={classes.password}/></Link>
                                        </div>
                                    </div>
                        ))
                        
                    }
                </div>
            </div>
            
        </>
    )
}

export default AccountsAdmin;