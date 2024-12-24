import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import classes from './accountsEditPage.module.css'
import Title from "../../components/Title/Title";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { addAdmin, getAdminById, updateAdmin } from "../../services/adminService";
import HeaderAdmin from "../../components/HeaderFoodsAdmin/HeaderAdmin";
const AccountsEditPage = () => {
    const {adminId} = useParams();
    //const [image, setImage] = useState();
    const isEditMode = !!adminId;

    const navigate = useNavigate();

    const {
        handleSubmit,
        register,
        formState : {errors},
        reset,
    } = useForm();

    useEffect(() => {
        if(!isEditMode) return;
        getAdminById(adminId).then(admin => {
            if(!admin) return;
            reset(admin);
            //setImage(food.image);
        });
    }, [adminId]);

    const submit = async adminData => {
        
        console.log(adminData);
        if(isEditMode){
            const confirmed = window.confirm("Bạn có chắc muốn thay đổi không?");
            if(!confirmed) return;
            console.log(adminData);
            await updateAdmin(adminId, adminData);
            toast.success(`"${adminData.name}" Thay đổi thành công!`);
            navigate('/admin/accounts', {replace : true});
            console.log("vui ve")
            return;
        }
        console.log(adminData);
        const newAdmin = await addAdmin(adminData);
        if(!newAdmin.status && newAdmin.status === 0){
            alert(newAdmin.message);
            return;
        }
        toast.success(`"${adminData.name}" Thêm thành công!`);
        navigate('/admin/accounts', {replace : true});
        console.log("vui ve")
    };

    // const upload = async event => {
    //     setImage(null);
    //     const imageUrl = await uploadImage(event);
    //     setImage(imageUrl);
    // };

    return (
        <>
            <HeaderAdmin/>
            <div className={classes.container}>
                <div className={classes.content}>
                    <Title title={isEditMode ? 'Sửa thông tin' : 'Thêm Account'} color = {"black"} margin={"1rem 0 0 0"}/>
                    <form
                        className = {classes.form}
                        onSubmit={handleSubmit(submit)}
                        noValidate
                        accept-charset="UTF-8"
                    >

                        <Input
                            type="text"
                            label="Tên"
                            {...register('name', { required: true, minLength: 1 })}
                            error={errors.name}
                        />

                        {!isEditMode &&
                            <Input
                            type="email"
                            label="Email"
                            {...register('email', { required: true })}
                            error={errors.email}
                        />
                        }
                        {!isEditMode &&
                            <Input
                            type="password"
                            label="Mật khẩu"
                            {...register('password', { required: true })}
                            error={errors.password}
                        />
                        }
                        {/* <Input
                            type="text"
                            label="Vai trò"
                            {...register('role',)}
                            error={errors.role}
                        /> */}
                        <Input label="Admin" type="checkbox" {...register('isAdmin')} />


                        <Input
                            type="text"
                            label="Avatar"
                            {...register('avatar')}
                            error={errors.avatar}
                        />
                        <Input
                            type="text"
                            label="Số điện thoại"
                            {...register('phone', { required: true })}
                            error={errors.phone}
                        />
                        
                        <Button type="submit" text={isEditMode ? 'Cập nhật' : 'Thêm mới'} />
                    </form>
                </div>
            </div>
            <Footer/>
        </>
        
    )
}

export default AccountsEditPage;
