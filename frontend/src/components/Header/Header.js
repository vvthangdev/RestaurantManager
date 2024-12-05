import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import classes from './header.module.css'
export default function Header(){

    return <header className= {classes.header}>
        <div className={classes.container}>
            <Link to = '/' className = {classes.logo}>
                <img src = {`${process.env.PUBLIC_URL}/icons/logo-hust.png`} alt = "HUST"/>
                <span>Quán nhậu Bách Khoa</span>
                
            </Link>

            <nav>
                <NavLink
                    to="/menu"
                    className={({ isActive }) => (isActive ? classes.active : "")}
                >
                    MENU    
                </NavLink>
                <NavLink
                    to="/contact"
                    className={({ isActive }) => (isActive ? classes.active : "")}
                >
                    CONTACT
                </NavLink>
                <NavLink
                    to="/infor"
                    className={({ isActive }) => (isActive ? classes.active : "")}
                >
                    INFOR
                </NavLink>
                <NavLink
                    to="/order"
                    className={({ isActive }) => (isActive ? classes.active : "")}
                >
                    ORDER
                </NavLink>
            </nav>
        </div>
    </header>    
}