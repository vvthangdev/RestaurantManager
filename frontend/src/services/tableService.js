import axios from "axios";

export const getAllTables = async () => {
    const res = await axios.get('/tables').catch(error => {
    if (error.response && error.response.status === 401) {
        alert("Bạn không có đủ quyền để truy nhập trang này!");
        window.location.href = '/menu';
        localStorage.removeItem('admin');
    }
  });
    return res.data;
};
export const getTableByTableNumber = async (table_number) => {
    const {data} = await axios.get(`/tables/get-table-by-number/${table_number}`).catch(error => {
    if (error.response && error.response.status === 401) {
        alert("Bạn không có đủ quyền để truy nhập trang này!");
        window.location.href = '/menu';
        localStorage.removeItem('admin');
    }
  });
    console.log(data);
    return data;
};export const updateTable = async (table_number, table) => {
    await axios.put(`/tables/update-table/${table_number}`, table).catch(error => {
    if (error.response && error.response.status === 401) {
        alert("Bạn không có đủ quyền để truy nhập trang này!");
        window.location.href = '/menu';
        localStorage.removeItem('admin');
    }
  });
};

export const addTable = async (table) => {
    const {data} = await axios.post("/tables/create-table", table).catch(error => {
    if (error.response && error.response.status === 401) {
        alert("Bạn không có đủ quyền để truy nhập trang này!");
        window.location.href = '/menu';
        localStorage.removeItem('admin');
    }
  });
    return data;
};

export const deleteTableByTableNumber = async (table_number) => {
    const {data} = await axios.delete(`/tables/delete-table/${table_number}`).catch(error => {
    if (error.response && error.response.status === 401) {
        alert("Bạn không có đủ quyền để truy nhập trang này!");
        window.location.href = '/menu';
        localStorage.removeItem('admin');
    }
  });
    return data;
};

