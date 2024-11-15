import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import Contact from "./pages/Contact/Contact";
import Order from "./pages/Order/Order";

import Navbar from "./components/Navbar/Navbar";
import FoodPage from "./pages/Food/FoodPage";
import MenuPage from "./pages/Menu/MenuPage";
export default function AppRoutes(){
    return(
       
        <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/menu" element={<MenuPage/>} />
            <Route path="/menu/food/:id" element={<FoodPage/>} />
            <Route path="/menu/search/:searchTerm" element={<MenuPage/>} />
            <Route path="/contact" element={<Contact/>} />
            <Route path="/order" element={<Order/>} />
            
        </Routes>
        
        
    )
}