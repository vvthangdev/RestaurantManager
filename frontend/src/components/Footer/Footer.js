import React from "react"
import {Link} from 'react-router-dom'
import classes from './footer.module.css'
export default function Footer(){
    return <footer className={classes.footer}>
        <div className={classes.container}>
            <Link to = '/' className = {classes.logo}>
                <img src = {`${process.env.PUBLIC_URL}icons/logo-hust.png`}/>
                <span>Quán nhậu Bách Khoa</span>
                
            </Link>
            <Link to = "/preorder" className = {classes.order}>ORDER</Link>
        </div>
        <div className={classes.infor_contact}>
            <div className={classes.infor_social_private}>
                <div className={classes.component}>
                    Phone Number:
                </div>
                <div className={classes.component}>
                    Email:
                </div>
                <div className={classes.component}>
                    Facebook:
                </div>
                <div className={classes.component}>
                    Instagram:
                </div>
            </div>
        </div>
        <div className={classes.infor_restaurant}>
            <div className={classes.infor_detail}>
                <Link to = '/infor' className = {classes.component_restaurant}>
                    Information     
                </Link>
                <Link to = "/contact" className = {classes.component_restaurant}>
                    Contact
                </Link>
            </div>
        </div>
    </footer>
}