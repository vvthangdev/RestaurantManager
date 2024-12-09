import { useState, createContext, useContext, Children, useEffect } from "react";
import * as userService from "../services/userService";
import {toast} from 'react-toastify';
import * as adminService from "../services/adminService";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const navigate = useNavigate();
    const [admin, setAdmin] = useState(adminService.getAdmin());
    const [foods, setFoods] = useState(() => {
        // Lấy giỏ hàng từ localStorage nếu có
        const savedFoods = localStorage.getItem('foods');
        return savedFoods ? JSON.parse(savedFoods) : [];
    });
    useEffect(() => {
        // Lưu giỏ hàng vào localStorage khi giỏ hàng thay đổi
        localStorage.setItem('foods', JSON.stringify(foods));
    }, [foods]);
    const login = async (email, password) => {
        try{
            const admin = await adminService.login(email, password);
            setAdmin(admin);
            toast.success('Đăng nhập thành công');
            return admin;
        } catch(error){
            toast.error(error.response.data);
            return false;
        }
    };
    const addFoodToCart = (foodItem) => {
        setFoods((prevFoods) => [...prevFoods, foodItem]);
    };

    const removeFoodFromCart = (foodId) => {
        setFoods((prevFoods) => prevFoods.filter(food => food.id !== foodId));
    };

    const clearCart = () => {
        setFoods([]);
    };
    const logout = () => {
        navigate('/menu')
        adminService.logout();
        setAdmin(null);     
    }
    const getFoodsOder = () => {
        const foodsOrder = localStorage.getItem('foods');
        if (foodsOrder) {
            return foodsOrder;
        }
    };
    const changePassword = () => {

    }
    return (
        <AuthContext.Provider value = {{
            admin, 
            login, 
            logout,
            addFoodToCart,
            removeFoodFromCart,
            getFoodsOder,
            changePassword,
            clearCart}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);

