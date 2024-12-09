import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import classes from './header.module.css'
export default function Header(){

    return <header className= {classes.header}>
        <div className={classes.container}>
            <Link to = '/menu' className = {classes.logo}>
                <img src = {`${process.env.PUBLIC_URL}/icons/logo-hust.png`} alt = "HUST"/>
                <span>Quán nhậu Bách Khoa</span>
                
            </Link>

            <nav>
                <NavLink
                    to="/menu"
                    className={({ isActive }) => (isActive ? classes.active : "")}
                >
                    Thực đơn   
                </NavLink>
                <NavLink
                    to="/contact"
                    className={({ isActive }) => (isActive ? classes.active : "")}
                >
                    Liên hệ
                </NavLink>
                <NavLink
                    to="/infor"
                    className={({ isActive }) => (isActive ? classes.active : "")}
                >
                    Thông tin
                </NavLink>
                <NavLink
                    to="/order"
                    className={({ isActive }) => (isActive ? classes.active : "")}
                >
                    Đặt bàn
                </NavLink>
            </nav>
        </div>
    </header>    
}