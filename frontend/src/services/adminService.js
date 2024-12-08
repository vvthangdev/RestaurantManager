import axios from "axios";

export const getAllAdmins = async () => {
    const res = await axios.get('/api/admins');
    console.log(res.data.admins);
    return res.data.admins
};

export const getAdminById = async (adminId) => {
    const {data} = await axios.get(`/api/admins/account/${adminId}`);
    console.log(data);
    return data;
};

export const searchAdmin = async (searchTerm) => {
    const {data} = await axios.get(`/api/admins/search/${searchTerm}`);
    return data;
};
export const updateAdmin = async (adminId, admin) => {
    await axios.put(`/api/admins/updateaccount/${adminId}`, admin);
};

export const addAdmin = async (admin) => {
    const {data} = await axios.post("/api/admins/createaccount", admin);
    return data;
};

export const deleteAdminById = async (adminId) => {
    const {data} = await axios.delete(`/api/admins/deleteaccount/${adminId}`);
    return data;
};

export const login = async (email, password) => {
    console.log(email, password);
    try{
        const response = await axios.post('/api/admins/login', {email, password});
        const {data} = response;
        localStorage.setItem('admin', JSON.stringify(data));
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
  localStorage.removeItem('admin');
};

export const getAdmin = () =>
    localStorage.getItem('admin')
    ? JSON.parse(localStorage.getItem('admin'))
    : null;