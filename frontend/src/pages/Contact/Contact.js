// import React, { useEffect, useReducer } from 'react'
// import { Link, useParams } from 'react-router-dom';
// import { getAll } from '../../services/orderService';
// import classes from './order.module.css';
// import Title from '../../components/Title/Title';
// import Datetime from '../../components/Datetime/Datetime';
// import Price from '../../components/Price/Price';

// import Footer from "../../components/Footer/Footer";
// import Header from "../../components/Header/Header";

// const initialState ={}
// const reducer = (state, action) => {
//   const { type, payload } = action;
//   switch (type){
//     case 'ORDER_LOADED':
//       return {...state, orders: payload};
//     default:
//       return state;
//   }
// }

// export default function Order() {
//   const [{allStatus, orders  }, dispatch] = useReducer ( reducer, initialState);
//   const { filter } = useParams();

//   useEffect(() =>{
//     getAll(filter).then(orders => {dispatch({type: 'ORDER_LOADED', payload: orders});})

//   }, [filter]);

  

//   return (
//   <div className={classes.containers}>
//     <Title title="ORDER" margin="1.5rem 0 0.2rem" fontSize="1.9rem" />
//     {
//       orders && orders.map(order =>(
//         <div key={order.id} className={classes.order_summary}>
//           <div className={classes.header}>
//             <span>
//               {order.id}
//             </span>
//             <span>
//               <Datetime date={order.createAt} />
//             </span>
//             <span>{order.status}</span>
//           </div>
//           <div className={classes.items}>
//             {order.items.map(item =>
//               <Link key={item.food.id} to={`/food/${item.food.id}`}>
//                 <img src={item.food.imageUrl} alt={item.food.name} />
//               </Link>
//             )}
//           </div>
//           <div>
//             <span className={classes.price}>
//               <Price price={order.TotalPrice} />
//             </span>
//           </div>

        
//         </div>
//       )
//       )
//     }

//   </div>
//   )
// }

// export default function Order(){
//   return <>
//     <Header/>
//     <Footer/>
  
//   </>
// }


import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { addFood, getById, updateFood } from "../../services/foodService";
import { toast } from "react-toastify";
import classes from './contact.module.css'
import Title from "../../components/Title/Title";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { createOrder } from "../../services/orderService";
import { useAuth } from "../../hooks/useAuth";
import { createContact } from "../../services/contactService";
const Contact = () => {
    const { getFoodsOrder, clearCart } = useAuth();

    const navigate = useNavigate();

    const {
        handleSubmit,
        register,
        formState : {errors},
        reset,
    } = useForm();

    
    
    const submit = async contactData => {
        //console.log(orderData);
        try {

            //console.log(orderDataTransform);
            const contact = await createContact(contactData);
            console.log(contact);
            toast.success(`"Đã gửi liên hệ thành công!`);
            navigate('/menu', {replace : true});
        }catch (error){
            if (error.errorMessage) {
                toast.error(error.errorMessage); // Hiển thị thông báo lỗi nếu có
            } else {
                toast.error("Có lỗi xảy ra khi gửi liên hệ.");
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
                    <Title title="Liên hệ" color = {"black"}/>
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
                        <Title title="Phản hồi" fontSize={"1.2rem"} color="black"/>
                        <textarea placeholder="Phản hồi" 
                                className={classes.textarea}
                                {...register('message',)}
                                error={errors.message}/>
                        </div>
                        <Button type="submit" text="Gửi" onClick={submit}/>
                    </form>
                </div>
            </div>
            <Footer/>
        </>

    )
}

export default Contact;
