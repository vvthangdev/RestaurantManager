import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { deleteFoodById, getAll, search } from "../../services/foodService";
import NotFound from "../../components/NotFound/NotFound";
import { toast, ToastContainer } from "react-toastify";
import classes from "./contactMangement.module.css";
import Title from "../../components/Title/Title";
import Search from "../../components/Search/Search";
import Price from "../../components/Price/Price";
import { FaTrash, FaEdit } from 'react-icons/fa';
import HeaderFoodsAdminPage from "../../components/HeaderFoodsAdmin/HeaderFoodsAdmin";
import { deleteAdminById, getAllAdmins, searchAdmin } from "../../services/adminService";
import { deleteTableByTableNumber, getAllTables } from "../../services/tableService";
import { tab } from "@testing-library/user-event/dist/tab";
import { deleteContactById, getAllContacts } from "../../services/contactService";

const ContactManagementPage = () => {
    const [contacts, setContacts] = useState([]);
    const {searchTerm} = useParams();
    useEffect(() => {
        const loadContacts = getAllContacts();
        loadContacts.then(contacts => {
            setContacts(contacts);
        });
    }, [searchTerm]);
    // const NotFound = () => {
    //     if(admins && admins.length > 0) return;
    //     return (<NotFound linkRoute="/admin/accounts" linkText="Show All" />)
    //     // ) : (
    //     //     <NotFound linkRoute="/dashboard" linkText="Back to dashboard!" />
    //     // );
    // };
    const deleteContact= async contact => {
        const confirmed = window.confirm(`Bạn có muốn xóa phản hồi ${contact.id}?`);
        if(!confirmed) return;

        const data = await deleteContactById(contact.id);
        toast.success(`"${contact.idr}" Đã Được Xóa!`);
        setContacts(contacts.filter(c => c.id !== contact.id));
    };

    return (
        <>
            <HeaderFoodsAdminPage />
            <div className={classes.container}>
                <div className={classes.list}>

                    <Title title = "Quản lý liên hệ" margin = "1rem auto" />
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
                        <div>Tên</div>
                        <div>Email</div>
                        <div>Số điện thoại</div>
                        <div>Phản hồi</div>
                        <div>Xóa</div>
                    </div>
                    {contacts &&
                        contacts.map(contact => (
                            <div key={contact.id} className={classes.list_item}>
                                <div>{contact.name}</div>
                                <div>{contact.email}</div>
                                <div>{contact.phone}</div>
                                <div>{contact.message}</div>
                                <div className={classes.actions}>
                                    {/* <Link to={'/admin/edittable/' + contact.table_number} ><FaEdit className={classes.edit}/></Link> */}
                                    <Link onClick={() => deleteContact(contact)} ><FaTrash className={classes.delete}/></Link>
                                </div>
                            </div>
                        ))
                        
                    }
                </div>
            </div>
            
        </>
    )
}

export default ContactManagementPage;