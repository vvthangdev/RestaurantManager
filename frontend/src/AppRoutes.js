import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import Contact from "./pages/Contact/Contact";
import Order from "./pages/Order/Order";
import FoodPage from "./pages/Food/FoodPage";
import MenuPage from "./pages/Menu/MenuPage";
import LoginPage from "./pages/Login/LoginPage";
import Infor from "./pages/Infor/Infor";
import FoodsAdminPage from "./pages/FoodsAdmin/FoodsAdminPage";
import FoodEditPage from "./pages/FoodEditPage/FoodEditPage";
export default function AppRoutes(){
    return(
       
        <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/menu" element={<MenuPage/>} />
            <Route path="/menu/food/:id" element={<FoodPage/>} />
            <Route path="/menu/search/:searchTerm" element={<MenuPage/>} />
            <Route path="/contact" element={<Contact/>} />
            <Route path="/order" element={<Order/>} />
            <Route path="/infor" element={<Infor/>} />
            <Route path="/login" element={<LoginPage/>} />
            {/* <Route path="/login/foodadminpage" element={<FoodsAdminPage/>} /> */}
            {/* <Route path="/foodsadminpage" element={<FoodsAdminPage/>} />
            <Route path="/foodsadminpage/search/:searchTerm" element={<FoodsAdminPage/>} /> */}
            <Route path="/admin/foods" element={<FoodsAdminPage/>} />
            <Route path="/admin/foods/:searchTerm" element={<FoodsAdminPage/>} />
            <Route path="/admin/addfood" element={<FoodEditPage/>} />
            <Route path="/admin/editfood/:foodId" element={<FoodEditPage/>} />
        </Routes>
        
        
    )
}