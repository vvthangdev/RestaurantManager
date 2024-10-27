import React from "react";
import { NavLink } from "react-router-dom";
import classes from './active.module.css'
export default function Navbar() {
    return (
        <nav>
            <NavLink
                to="/"
                className={({ isActive }) => (isActive ? classes.active : "")}
            >
                HOME
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
                to="/preorder"
                className={({ isActive }) => (isActive ? classes.active : "")}
            >
                ORDER
            </NavLink>
        </nav>
    );
}
