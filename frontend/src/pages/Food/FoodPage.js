import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import classes from './foodPage.module.css';
import { getById } from "../../services/foodService";
import Price from "../../components/Price/Price";
import NotFound from "../../components/NotFound/NotFound";

export default function FoodPage(){
    const [food, setFood] = useState({});
    const {id} = useParams();
    console.log(id)
    useEffect(() => {
        getById(id).then(setFood);
    }, [id]);
    return <>
        {!food ? (<NotFound message="Food Not Found!" linkText="Back to Menu Page"></NotFound>) : 
        (<div className={classes.container}>
            <img
                className={classes.image}
                src = {`${process.env.PUBLIC_URL}${food.imgUrl}`}
                alt = {food.name}
            />
            <div className={classes.details}>
                <div className={classes.header}>
                    <span className={classes.name}>{food.name}</span>
                    <div className={classes.price}>
                        <Price price={food.price}></Price>
                    </div>
                    <div><button>Add to Cart</button></div>
                </div>
            </div>
        </div>)}
    </>
}