import React from "react";
import classes from './thumbnails.module.css'
import { Link } from "react-router-dom";
import Price from "../Price/Price";

export default function Thumbnails({foods}){
    return(
        <ul className={classes.list}>
            {foods.map(food => (
                <li key = {food.id}>
                    <Link to = {`/food/${food.id}`}>
                        <img
                            className={classes.image}
                            src = {`${process.env.PUBLIC_URL}${food.imgUrl}`}
                            alt={food.name} 
                        />
                        <div className={classes.content}>
                            <div className = {classes.name}>
                                {food.name}
                            </div>
                        </div>
                        <div className={classes.price}>
                            <Price price = {food.price} locale="vi-VN" currency="VND" />
                        </div>
                    </Link>
                </li>
            ))}
        </ul>
    );
}