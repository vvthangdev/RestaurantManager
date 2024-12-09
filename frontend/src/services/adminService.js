import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
export const getAllAdmins = async () => {
    const res = await axios.get('/api/admins').catch(error => {
    if (error.response && error.response.status === 401) {
        alert("Bạn không có đủ quyền để truy nhập trang này!");
        window.location.href = '/menu';
        localStorage.removeItem('admin');
    }
  });
    console.log(res.data.admins);
    return res.data.admins
};

export const getAdminById = async (adminId) => {
    const {data} = await axios.get(`/api/admins/account/${adminId}`).catch(error => {
    if (error.response && error.response.status === 401) {
        alert("Bạn không có đủ quyền để truy nhập trang này!");
        window.location.href = '/menu';
        localStorage.removeItem('admin');
    }
  });
    console.log(data);
    return data;
};

export const searchAdmin = async (searchTerm) => {
    const {data} = await axios.get(`/api/admins/search/${searchTerm}`).catch(error => {
    if (error.response && error.response.status === 401) {
        alert("Bạn không có đủ quyền để truy nhập trang này!");
        window.location.href = '/menu';
        localStorage.removeItem('admin');
    }
  });
    return data;
};
export const updateAdmin = async (adminId, admin) => {
    await axios.put(`/api/admins/updateaccount/${adminId}`, admin).catch(error => {
    if (error.response && error.response.status === 401) {
        alert("Bạn không có đủ quyền để truy nhập trang này!");
        window.location.href = '/menu';
        localStorage.removeItem('admin');
    }
  });
};

export const addAdmin = async (admin) => {
    const {data} = await axios.post("/api/admins/createaccount", admin).catch(error => {
    if (error.response && error.response.status === 401) {
        alert("Bạn không có đủ quyền để truy nhập trang này!");
        window.location.href = '/menu';
        localStorage.removeItem('admin');
    }
  });
    return data;
};

export const deleteAdminById = async (adminId) => {
    const {data} = await axios.delete(`/api/admins/deleteaccount/${adminId}`).catch(error => {
    if (error.response && error.response.status === 401) {
        alert("Bạn không có đủ quyền để truy nhập trang này!");
        window.location.href = '/menu';
        localStorage.removeItem('admin');
    }
  });
    return data;
};

export const login = async (email, password) => {
    console.log(email, password);
    try{
        const response = await axios.post('/api/admins/login', {email, password});
        const {data} = response;
        if(data.id) localStorage.setItem('admin', JSON.stringify(data));
        return data; 
    }catch(e){
        console.log(e);
        console.log(e.errorMessage);
        console.log(1);
        return {
            errorMessage: e.response.data.errorMessage,
            errorId: e.response.data.errorId
        };
    };
};

export const logout = () => {
  localStorage.removeItem('admin');
};

export const getAdmin = () =>
    localStorage.getItem('admin')
    ? JSON.parse(localStorage.getItem('admin'))
    : null;