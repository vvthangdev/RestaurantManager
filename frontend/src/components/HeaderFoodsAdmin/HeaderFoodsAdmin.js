import React from 'react';
import { Link } from 'react-router-dom';
import classes from './headerFoodsAdmin.module.css';
import { logout } from '../../services/userService';
//import { useAuth } from '../../hooks/useAuth';

export default function HeaderFoodsAdminPage({handleLogout}) {
  //const { user, logout } = useAuth();
    const user = JSON.parse(localStorage.getItem('user')); //Do tra ve string

    return (
        <>
            {user
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
                                <span className={classes.name}>{user.name}</span>
                                <button className={classes.logout} onClick={handleLogout}>SIGN OUT</button>
                            </div>  
                        </li>
                    </ul>
                </div>
            </header>
            }
            {!user
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
                                <button className={classes.logout} onClick={handleLogout}>SIGN OUT</button>
                            </div>  
                        </li>
                    </ul>
                </div>
            </header>
            }
        </>
    );
}

