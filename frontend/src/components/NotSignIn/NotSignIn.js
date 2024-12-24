import React from "react";
import classes from './notSignIn.module.css';
import { Link } from "react-router-dom";

export default function NotSignIn({message, linkRoute, linkText}){
    return (
        <div className={classes.container}>
            {message}
            <Link to = {linkRoute} >{linkText}</Link>
        </div>
    )
}

NotSignIn.defaultProps={
    message: 'You must sign in to have access to this page!',
    linkRoute: '/login',
    linkText: 'Go to Sign in'
}