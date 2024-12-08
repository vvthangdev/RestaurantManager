import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { addFood, getById, updateFood } from "../../services/foodService";
import { toast } from "react-toastify";
import classes from './orderEditPage.module.css'
import Title from "../../components/Title/Title";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import HeaderFoodsAdminPage from "../../components/HeaderFoodsAdmin/HeaderFoodsAdmin";
import { addTable, getTableByTableNumber, updateTable } from "../../services/tableService";
import { getOrderById, updateOrder } from "../../services/orderService";

const OrderEditPage = () => {
    const {orderId} = useParams();
    //const [image, setImage] = useState();
    const isEditMode = !!orderId;

    const navigate = useNavigate();

    const {
        handleSubmit,
        register,
        formState : {errors},
        reset,
    } = useForm();

    useEffect(() => {
        if(!isEditMode) return;
        getOrderById(orderId).then(orderId => {
            if(!orderId) return;
            reset(orderId);
            //setImage(food.image);
        });
    }, [orderId]);

    const submit = async orderData => {
        

        if(isEditMode){
            const confirmed = window.confirm("Bạn có chắc muốn thay đổi không?");
            if(!confirmed) return;
            await updateOrder(orderId, orderData);
            toast.success(`"Bàn ${orderId}" Thay đổi thành công!`);
            navigate('/admin/ordersmanagement', {replace : true});
            console.log("vui ve")
            return;
        }
        
    };

    // const upload = async event => {
    //     setImage(null);
    //     const imageUrl = await uploadImage(event);
    //     setImage(imageUrl);
    // };
    
    return (
        <>
            <HeaderFoodsAdminPage/>
            <div className={classes.container}>
                <div className={classes.content}>
                    <Title title={isEditMode ? 'Sửa đặt bàn' : 'Thêm bàn'} color = {"black"} margin={"1rem 0 0 0"}/>
                    <form
                        className = {classes.form}
                        onSubmit={handleSubmit(submit)}
                        noValidate
                        accept-charset="UTF-8"
                    >

                        
                        {/* {!isEditMode &&
                            <Input
                            type="text"
                            label="Mã đơn hàng"
                            {...register('table_number', { required: true })}
                            error={errors.table_number}
                        />} */}
                        {isEditMode &&
                            <div className={classes.table}>Mã đơn hàng {orderId}</div>    
                        }
                    
                        <Input
                            type="status"
                            label="Trạng thái"
                            {...register('status', { required: true })}
                            error={errors.status}
                        />

                        <Button type="submit" text={isEditMode ? 'Cập nhật' : 'Thêm mới'} />
                    </form>
                </div>
            </div>
            <Footer/>
        </>
        
    )
}

export default OrderEditPage;
