import axios from "axios";
import { useNavigate } from "react-router-dom";

export const getUser = () =>
    localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null;

export const login = async (email, password) =>{
    console.log(email, password);
    try{
        const response = await axios.post('/api/admin/login', {email, password});
        const {data} = response;
        localStorage.setItem('user', JSON.stringify(data));
        return data; 
    }catch(e){
        console.log(e);
        console.log(e.errorMessage);
        return {
            errorMessage: e.response.data.errorMessage,
            errorId: e.response.data.errorId
        };
    };
    
};
export const logout = () => {
    localStorage.removeItem('user');
};


