import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import Contact from "./pages/Contact/Contact";
import Order from "./pages/Order/Order";

import Navbar from "./components/Navbar/Navbar";
import FoodPage from "./pages/Food/FoodPage";
import MenuPage from "./pages/Menu/MenuPage";
import LoginPage from "./pages/Login/LoginPage";
import FoodEditPage from "./pages/FoodEditPage/FoodEditPage";
import FoodAdminPage from "./pages/FoodsAdmin/FoodsAdminPage";
import Infor from "./pages/Infor/Infor";
import AccountsAdmin from "./pages/AccountsAdmin/AccountsAdmin";
import AccountsEditPage from "./pages/AccountsEditPage/AccountsEditPage";
import TableManagementPage from "./pages/TableManagement/TableManagementPage";
import TableEditPage from "./pages/TableEditPage/TableEditPage";
import OrdersManagementPage from "./pages/OrdersManagement/OrdersManagementPage";
import OrderEditPage from "./pages/OrderEditPage/OrderEditPage";
import ContactManagementPage from "./pages/ContactManagement/ContactManagement";
export default function AppRoutes(){
    return(
       
        <Routes>
            <Route path="/" element={<MenuPage/>} />
            <Route path="/menu" element={<MenuPage/>} />
            <Route path="/menu/food/:id" element={<FoodPage/>} />
            <Route path="/menu/search/:searchTerm" element={<MenuPage/>} />
            <Route path="/contact" element={<Contact/>} />
            <Route path="/order" element={<Order/>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/infor" element={<Infor/>} />
            <Route path="/admin/foods" element={<FoodAdminPage/>} />
            <Route path="/admin/foods/:searchTerm" element={<FoodAdminPage/>} />
            <Route path="/admin/foods" element={<FoodEditPage/>} />
            <Route path="/admin/addfood" element={<FoodEditPage/>} />
            <Route path="/admin/editfood/:foodId" element={<FoodEditPage/>} />
            <Route path="/admin/accounts" element={<AccountsAdmin/>} />
            <Route path="/admin/accounts/:searchTerm" element={<AccountsAdmin/>} />
            <Route path="/admin/addaccount" element={<AccountsEditPage/>} />
            <Route path="/admin/editaccount/:adminId" element={<AccountsEditPage/>} />
            <Route path="/admin/tablemanagement" element={<TableManagementPage/>} />
            <Route path="/admin/addtable" element={<TableEditPage/>} />
            <Route path="/admin/edittable/:table_number" element={<TableEditPage/>} />
            <Route path="/admin/ordersmanagement" element={<OrdersManagementPage/>} />
            <Route path="/admin/editorder/:orderId" element={<OrderEditPage/>} />
            <Route path="/admin/contactsmanagement" element={<ContactManagementPage/>} />
        </Routes>
        
        
    )
}