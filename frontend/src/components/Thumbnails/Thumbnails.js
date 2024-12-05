import React from "react";
import classes from './thumbnails.module.css'
import { Link } from "react-router-dom";
import Price from "../Price/Price";

export default function Thumbnails({foods}){
    return(
        
        <div>
            <div className={classes.classify}>
                <div className={classes.name_classify}>Món ăn</div>            
                <ul className={classes.list}>
                    {foods.map(food => (
            
                        <li key = {food.id}>
                            <Link to = {`/menu/food/${food.id}`}>
                                <img
                                    className={classes.image}
                                    src = {food.image}
                                    alt={food.name} 
                                />
                                <div className={classes.infor}>
                                    <div className={classes.content}>
                                        <div className = {classes.name}>
                                            {food.name}
                                        </div>
                                    </div>
                                    <div className={classes.price}>
                                        <Price price = {food.price} locale="vi-VN" currency="VND" />
                                    </div>

                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={classes.classify}>
                <div className={classes.name_classify}>Combo</div>            
                <ul className={classes.list}>
                    {foods.map(food => (
                        <li key = {food.id}>
                            <Link to = {`/menu/food/${food.id}`}>
                                <img
                                    className={classes.image}
                                    src = {`${process.env.PUBLIC_URL}${food.image}`}
                                    alt={food.name} 
                                />
                                <div className={classes.infor}>
                                    <div className={classes.content}>
                                        <div className = {classes.name}>
                                            {food.name}
                                        </div>
                                    </div>
                                    <div className={classes.price}>
                                        <Price price = {food.price} locale="vi-VN" currency="VND" />
                                    </div>

                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={classes.classify}>
                <div className={classes.name_classify}>Đồ uống</div>            
                <ul className={classes.list}>
                    {foods.map(food => (
                        <li key = {food.id}>
                            <Link to = {`/menu/food/${food.id}`}>
                                <img
                                    className={classes.image}
                                    src = {`${process.env.PUBLIC_URL}${food.image}`}
                                    alt={food.name} 
                                />
                                <div className={classes.infor}>
                                    <div className={classes.content}>
                                        <div className = {classes.name}>
                                            {food.name}
                                        </div>
                                    </div>
                                    <div className={classes.price}>
                                        <Price price = {food.price} locale="vi-VN" currency="VND" />
                                    </div>

                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}