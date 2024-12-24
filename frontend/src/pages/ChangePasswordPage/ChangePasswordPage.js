import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth';
import Title from '../../components/Title/Title';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import classes from './changePasswordPage.module.css'
import HeaderAdmin from '../../components/HeaderFoodsAdmin/HeaderAdmin';
import { useNavigate, useParams } from 'react-router-dom';
import { changePasswordById, getAdminById } from '../../services/adminService';
import { toast } from 'react-toastify';
export default function ChangePassword() {
    // const {admin} = useAuth();
    const [admin, setAdmin] = useState([]);
    const navigate = useNavigate();
    const {
        handleSubmit,
        register,
        getValues,
        formState: { errors },
        
    } = useForm();
    const {adminId} = useParams();
    useEffect(() => {
        
        getAdminById(adminId).then(admin => {
            setAdmin(admin);
            
            //setImage(food.image);
        });
    }, [adminId]);
    const { changePassword } = useAuth();
    const submit = async passwords => {
        console.log(passwords);
        try{

            await changePasswordById(adminId, passwords);
            toast.success(`Thay đổi mật khẩu thành công!`);
            navigate('/admin/accounts', {replace : true});
        }catch(e){
            toast.error("Thay đổi mật khẩu thất bại!");
        }
    };
    
    
    return (
        <div>
        <HeaderAdmin/>  
        <div className={classes.container}>
                    <div className={classes.content}>
                        <Title title="Đổi mật khẩu" color = {"black"}/>
                        <form
                            className = {classes.form}
                            onSubmit={handleSubmit(submit)}
                            noValidate
                        >
                            {admin && admin.isAdmin && <Input
                                type="password"
                                label="Mật khẩu hiện tại"
                                {...register('currentPassword', {
                                    required: true,
                                })}
                                error={errors.currentPassword}
                                />}

                                <Input
                                type="password"
                                label="Mật khẩu mới"
                                {...register('newPassword', {
                                    required: true,
                                    minLength: 3,
                                })}
                                error={errors.newPassword}
                                />

                                <Input
                                type="password"
                                label="Xác nhận mật khẩu mới"
                                {...register('confirmNewPassword', {
                                    required: true,
                                    validate: value =>
                                    value !== getValues('newPassword')
                                        ? 'Không khớp'
                                        : true,
                                })}
                                error={errors.confirmNewPassword}
                                />
                            <Button type="submit" text="Gửi" onClick={submit}/>
                        </form>
                    </div>
                </div>
        </div>
  );
}