import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import classes from './foodPage.module.css';
import { getById } from "../../services/foodService";
import Price from "../../components/Price/Price";
import NotFound from "../../components/NotFound/NotFound";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useAuth } from "../../hooks/useAuth";
import Input from "../../components/Input/Input";

export default function FoodPage(){
    const [food, setFood] = useState({});
    const { addFoodToCart } = useAuth();
    const [quantity, setQuantity] = useState(1);
    const {id} = useParams();
    const navigate = useNavigate();
    console.log(id)
    useEffect(() => {
        getById(id).then(setFood);
    }, [id]);
    const handleOrderFood = () => {
        console.log(id);
        console.log(quantity);
        if(quantity){
            addFoodToCart({
                id : id,
                name : food.name,
                quantity : quantity,
            });
        }else {
           addFoodToCart({
                id : id,
                name : food.name,
                quantity : 1,
            }); 
        }
        navigate('/menu');
    };
    return <>
        <Header/>
        {!food ? (<NotFound message="Food Not Found!" linkText="Back to Menu Page"></NotFound>) : 
        (
        <div className={classes.container}>
            <img
                className={classes.image}
                
                src = {`${process.env.PUBLIC_URL}${food.image}`}
                alt = {food.name}
            />
            <div className={classes.details}>
                <div className={classes.header}>
                    <span className={classes.name}>{food.name}</span>
                    <div className={classes.price}>
                        <Price price={food.price} locale="vi-VN" currency="VND"></Price>
                    </div>
                    <div className={classes.orderFood}>
                        <input 
                            placeholder="Số lượng"
                            type = "number"
                            onChange={(e) => setQuantity(e.target.value)
                            
                            }
                        />
                        <button onClick={handleOrderFood}>Đặt món</button>
                    </div>
                </div>
            </div>
        </div>)}
        <Footer/>
    </>
}