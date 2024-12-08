import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classes from './headerFoodsAdmin.module.css';
import { logout } from '../../services/userService';
import { useAuth } from '../../hooks/useAuth';
//import { useAuth } from '../../hooks/useAuth';

export default function HeaderFoodsAdminPage() {
    const navigate = useNavigate();

    const { admin, logout } = useAuth();
    useEffect (() => {
        if(!admin) navigate('/menu');
    })
    //const admin = JSON.parse(localStorage.getItem('admin')); //Do tra ve string
    
    return (
        <>
            {admin
                &&
            <header className={classes.header}>
                <div className={classes.container}>
                    <Link to = '/' className = {classes.logo}>
                        <img src = {`${process.env.PUBLIC_URL}/icons/logo-hust.png`} alt = "HUST"/>
                        <span>Quán nhậu Bách Khoa</span>
                    
                    </Link> 
                    <ul>
                        <li className={classes.menu_container}>
                            <div className={classes.menu}>
                                <span className={classes.name}>{admin.name}</span>
                                <button className={classes.logout} onClick={logout}>SIGN OUT</button>
                            </div>  
                        </li>
                    </ul>
                </div>
            </header>
            }
            {/* {!admin
                &&
            <header className={classes.header}>
                <div className={classes.container}>
                    <Link to = '/' className = {classes.logo}>
                        <img src = {`${process.env.PUBLIC_URL}/icons/logo-hust.png`} alt = "HUST"/>
                        <span>Quán nhậu Bách Khoa</span>
                    
                    </Link> 
                    <ul>
                        <li className={classes.menu_container}>
                            <div className={classes.menu}>
                                <span className={classes.name}>NO NAMES</span>
                                <button className={classes.logout} onClick={logout}>SIGN OUT</button>
                            </div>  
                        </li>
                    </ul>
                </div>
            </header>
            } */}
        </>
    );
}

