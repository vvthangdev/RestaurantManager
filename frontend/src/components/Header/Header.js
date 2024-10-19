import React from 'react'
import {Link} from 'react-router-dom'
import classes from './header.module.css'

export default function Header(){
    const user = {
        name: 'John',
    };
    const cart = {
        totalCount: 10,
    };
    const logout = () => {

    }
    return <header className= {classes.header}>
        <div className={classes.container}>
            <Link to = '/' className = {classes.logo}>
                <img src = {`${process.env.PUBLIC_URL}icons/logo-hust.png`}/>
                <span>Quán nhậu Bách Khoa</span>
                
            </Link>
            <nav>
                <ul>
                    
                    <li className={classes.contact}>
                        <Link to = "/contact">CONTACT</Link>    
                    </li>                    
                    <li className={classes.infor}>
                        <Link to = "/infor">INFORMATION</Link>
                    </li>
                    <li className={classes.order}>
                        <Link to = "/preorder">ORDER</Link>
                    </li> 
                </ul>
            </nav>
        </div>
    </header>    
}