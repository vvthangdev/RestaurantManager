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
import Dashboard from "./pages/Dashboard/Dashboard";
import AuthRoute from "./components/AuthRoute/AuthRoute";
import AdminRouteExport from "./components/AdminRoute/AdminRoute";
import ChangePassword from "./pages/ChangePasswordPage/ChangePasswordPage";
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
            <Route path="/admin/foods" element={
                <AuthRoute>
                    <FoodAdminPage/>
                </AuthRoute>} />
            <Route path="/admin/foods/:searchTerm" element={
                <AuthRoute>
                    <FoodAdminPage/>
                </AuthRoute>} />
            {/* <Route path="/admin/foods" element={<FoodEditPage/>} /> */}
            <Route path="/admin/addfood" element={
                <AuthRoute>
                    <FoodEditPage/>
                </AuthRoute>} />
            <Route path="/admin/editfood/:foodId" element={
                <AuthRoute>
                    <FoodEditPage/>
                </AuthRoute>} />
            <Route path="/admin/accounts" element={
                <AdminRouteExport>
                    <AccountsAdmin/>
                </AdminRouteExport>
                } />
            <Route path="/admin/accounts/:searchTerm" element={ 
                <AdminRouteExport>
                    <AccountsAdmin/>
                </AdminRouteExport>} />
            <Route path="/admin/addaccount" element={ 
                <AdminRouteExport>
                    <AccountsEditPage/>
                </AdminRouteExport>} />
            <Route path="/admin/editaccount/:adminId" element={
                <AdminRouteExport>
                    <AccountsEditPage/>
                </AdminRouteExport>} />
            <Route path="/admin/tablemanagement" element={
                <AuthRoute>
                    <TableManagementPage/>
                </AuthRoute>
                } />
            <Route path="/admin/addtable" element={
                <AuthRoute>
                    <TableEditPage/>
                </AuthRoute>} />
            <Route path="/admin/edittable/:table_number" element={
                <AuthRoute>
                    <TableEditPage/>
                </AuthRoute>
            } />
            <Route path="/admin/ordersmanagement" element={
                <AuthRoute>
                    <OrdersManagementPage/>
                </AuthRoute>
                } />
            <Route path="/admin/editorder/:orderId" element={
                <AuthRoute>
                    <OrderEditPage/>
                </AuthRoute>} />
            <Route path="/admin/contactsmanagement" element={
                <AuthRoute>
                    <ContactManagementPage/>
                </AuthRoute>
                } />
            <Route path="/admin/dashboard" element={
                <AuthRoute>
                    <Dashboard/>
                </AuthRoute>
                } />
            <Route path="/admin/changepassword" element={
                <ChangePassword/>
                } />
        </Routes>
        
        
    )
}