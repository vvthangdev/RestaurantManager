import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { deleteFoodById, getAll, search } from "../../services/foodService";
import NotFound from "../../components/NotFound/NotFound";
import { toast, ToastContainer } from "react-toastify";
import classes from "./tableManagementPage.module.css";
import Title from "../../components/Title/Title";
import Search from "../../components/Search/Search";
import Price from "../../components/Price/Price";
import { FaTrash, FaEdit } from 'react-icons/fa';
import HeaderFoodsAdminPage from "../../components/HeaderFoodsAdmin/HeaderAdmin";
import { deleteAdminById, getAllAdmins, searchAdmin } from "../../services/adminService";
import { deleteTableByTableNumber, getAllTables } from "../../services/tableService";
import { tab } from "@testing-library/user-event/dist/tab";

const TableManagementPage = () => {
    const [tables, setTables] = useState([]);
    const {searchTerm} = useParams();
    useEffect(() => {
        const loadTables = getAllTables();
        loadTables.then(tables => {
            setTables(tables);
        });
    }, [searchTerm]);
    // const NotFound = () => {
    //     if(admins && admins.length > 0) return;
    //     return (<NotFound linkRoute="/admin/accounts" linkText="Show All" />)
    //     // ) : (
    //     //     <NotFound linkRoute="/dashboard" linkText="Back to dashboard!" />
    //     // );
    // };
    const deleteTable= async table => {
        const confirmed = window.confirm(`Bạn có muốn xóa bàn số ${table.table_number}?`);
        if(!confirmed) return;

        const data = await deleteTableByTableNumber(table.table_number);
        toast.success(`"${table.table_number}" Đã Được Xóa!`);
        setTables(tables.filter(t => t.table_number !== table.table_number));
    };

    return (
        <>
            <HeaderFoodsAdminPage />
            <div className={classes.container}>
                <div className={classes.list}>

                    <Title title = "Quản lý bàn" margin = "1rem auto" />
                    {/* <Search 
                        searchRoute="/admin/accounts/"
                        defaultRoute="/admin/accounts"
                        margin="1rem 0"
                        placeholder="Tìm kiếm nhân sự!"
                    />
                    <AdminsNotFound /> */}
                    <Link to="/admin/addtable" className={classes.add_food}>
                        Thêm Bàn +
                    </Link>
                    <div className={classes.list_item_title}>
                        <div>Số bàn</div>
                        <div>Sức chứa</div>
                        <div>Sửa/Xóa</div>
                    </div>
                    {tables &&
                        tables.map(table => (
                            <div key={table.table_number} className={classes.list_item}>
                                <div>{table.table_number}</div>
                                <div>{table.capacity}</div>
                                <div className={classes.actions}>
                                    <Link to={'/admin/edittable/' + table.table_number} ><FaEdit className={classes.edit}/></Link>
                                    <Link onClick={() => deleteTable(table)} ><FaTrash className={classes.delete}/></Link>
                                </div>
                            </div>
                        ))
                        
                    }
                </div>
            </div>
            
        </>
    )
}

export default TableManagementPage;