
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { addFood, getById, updateFood } from "../../services/foodService";
import { toast } from "react-toastify";
import classes from './order.module.css'
import Title from "../../components/Title/Title";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { createOrder } from "../../services/orderService";
import { useAuth } from "../../hooks/useAuth";
const Order = () => {
    const { getFoodsOrder, clearCart } = useAuth();

    const navigate = useNavigate();

    const {
        handleSubmit,
        register,
        formState : {errors},
        reset,
    } = useForm();

    
    const convertToPostData = (inputData) => {
        // Cắt ghép ngày và giờ thành một thời gian ISO
        const startDate = new Date(`${inputData.date}T${inputData.time}:00Z`);

        // Tạo danh sách món ăn mẫu (ở đây bạn có thể thay đổi theo cách bạn nhận dữ liệu từ người dùng)
        const foodsOrder = localStorage.getItem('foods');
        console.log(foodsOrder);
        let foods = []
        if(foodsOrder){
            const updatedFoods = JSON.parse(foodsOrder)
            foods = updatedFoods.map(item => ({
              id: parseInt(item.id),        // Chuyển id về kiểu số
              quantity: parseInt(item.quantity)  // Chuyển quantity về kiểu số
            }));
        }
        console.log(foods);
        return {
            start_time: startDate.toISOString(), // Chuyển đổi thành định dạng ISO chuẩn
            num_people: parseInt(inputData.number), // Đảm bảo số lượng người là số nguyên
            foods: foods, // Giả sử bạn có một cách để lấy danh sách món ăn này
            type: "reservation", // Loại đặt chỗ
            name: inputData.name, // Tên khách hàng
            phone: inputData.phone, // Số điện thoại
            email: inputData.email,
            comment : inputData.comment, // Email
        };
    };
    const submit = async orderData => {
        //console.log(orderData);
        const orderDataTransform = convertToPostData(orderData);
        console.log(orderDataTransform);
        try {

            //console.log(orderDataTransform);
            const order = await createOrder(orderDataTransform);
            clearCart();
            console.log(order);
            toast.success(`"Đặt thành công!`);
            navigate('/menu', {replace : true});
        }catch (error){
            if (error.errorMessage) {
                toast.error(error.errorMessage); // Hiển thị thông báo lỗi nếu có
            } else {
                toast.error("Có lỗi xảy ra khi tạo đơn hàng.");
            }
        }
    };

    // const upload = async event => {
    //     setImage(null);
    //     const imageUrl = await uploadImage(event);
    //     setImage(imageUrl);
    // };

    return (
        <>
            <Header/>
            <div className={classes.container}>
                <div className={classes.content}>
                    <Title title="Đặt bàn" color = {"black"}/>
                    <form
                        className = {classes.form}
                        onSubmit={handleSubmit(submit)}
                        noValidate
                    >
                        <div>
                        <Title title="Thông tin của bạn" fontSize={"1.2rem"} color="black"/>
                        <Input
                            type="text"
                            label="Tên"
                            {...register('name', { required: true, minLength: 1 })}
                            error={errors.name}
                        />
                        <Input
                            type="text"
                            label="Số điện thoại"
                            {...register('phone', { required: true, minLength: 1 })}
                            error={errors.phone}
                        />
                        <Input
                            type="email"
                            label="Email"
                            {...register('email', { required: true})}
                            error={errors.email}
                        />
                        </div>
                        <div>
                        <Title title="Thông tin đặt bàn" fontSize={"1.2rem"} color="black"/>
                        <div className={classes.date_and_time}>
                            <Input
                            type="number"
                            label="Số lượng"
                            {...register('number', { required: true, min : 1 })}
                            error={errors.number}
                            defaultValue = {1}
                            />

                            <Input
                                type="date"
                                label="Ngày đặt"
                                {...register('date', { required: true})}
                                error={errors.date}
                            />
                            <Input
                                type="time"
                                label="Thời gian đến"
                                {...register('time', { required: true})}
                                error={errors.time}
                            />
                        </div>
                        <textarea placeholder="Ghi chú" 
                                className={classes.textarea}
                                {...register('comment',)}
                                error={errors.comment}/>
                        </div>
                        <Button type="submit" text="Đặt bàn" onClick={submit}/>
                    </form>
                </div>
            </div>
            <Footer/>
        </>

    )
}

export default Order;
